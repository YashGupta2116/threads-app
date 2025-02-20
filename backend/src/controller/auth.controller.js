import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const generateTokens = async (userId, res) => {
  try {
    const token = jwt.sign({ _id: userId }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("accessToken", token, {
      httpOnly: true,
      secure: true,
      maxAge: 1 * 24 * 60 * 60 * 1000,
    });
  } catch (error) {
    console.log("no tokens were generated");
    return null;
  }
};

export const signup = async (req, res) => {
  const { username, fullName, email, password } = req.body;

  if (!username) {
    return res
      .status(400)
      .json({ success: false, message: "username mandatory" });
  }
  if (!fullName) {
    return res
      .status(400)
      .json({ success: false, message: "fullname mandatory" });
  }
  if (!email) {
    return res.status(400).json({ success: false, message: "email mandatory" });
  }
  if (!password) {
    return res
      .status(400)
      .json({ success: false, message: "password mandatory" });
  }

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User with email already exist" });
    }

    const salt = bcrypt.genSaltSync(10);

    const hashedPass = bcrypt.hashSync(password, salt);

    if (!hashedPass) {
      return res
        .status(400)
        .json({ success: false, message: "Password didnt get hashed" });
    }

    const newUser = new User({
      username,
      fullName,
      email,
      password: hashedPass,
    });

    if (!newUser) {
      return res
        .status(400)
        .json({ success: false, message: "User was not created" });
    }

    await newUser.save();

    const userId = newUser._id;

    if (!userId)
      return res
        .status(400)
        .json({ success: false, message: "userid was not found" });

    await generateTokens(userId, res);

    const userResponse = newUser.toObject();

    delete userResponse.password;

    res.status(201).json({
      success: true,
      message: "User was created Successfully",
      user: userResponse,
    });
  } catch (error) {
    console.log("error in authController :: signup :: ", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res
      .status(400)
      .json({ success: false, message: "Email is required" });
  }
  if (!password) {
    return res
      .status(400)
      .json({ success: false, message: "password is required" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "user does not exist" });
    }

    const isPassCorrect = await bcrypt.compare(password, user.password);

    if (!isPassCorrect) {
      return res
        .status(400)
        .json({ success: false, message: "incorrect password" });
    }

    await generateTokens(user._id, res);

    const userRes = user.toObject();
    delete userRes.password;

    res.status(201).json({
      success: true,
      message: "User logged in successfully",
      user: userRes,
    });
  } catch (error) {
    console.log("error in authController :: login :: ", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getUser = async (req, res) => {
  const userId = req.user._id;

  try {
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(400).json({ succes: false, message: "user not found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "User fetched", user });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const updateProfile = async (req, res) => {
  const userId = req.user._id;

  try {
    const { email, password, fullName, username } = req.body;

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "UserId not found" });
    }
    const updates = {};

    if (password && password !== "") {
      const salt = await bcrypt.genSalt(10);
      updates.password = await bcrypt.hash(password, salt);
    }

    if (email && email !== "") updates.email = email;
    if (username && username !== "") updates.username = username;
    if (fullName && fullName !== "") updates.fullName = fullName;

    const updatedUser = await User.findByIdAndUpdate(userId, updates, {
      new: true,
    }).select("-password");

    if (!updatedUser) {
      return res
        .status(400)
        .json({ success: false, message: "Updated user null" });
    }

    res.status(200).json({
      success: true,
      message: "User updated Scucessfully",
      updatedUser,
    });
  } catch (error) {
    console.log("Internal server error");
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const logout = (req, res) => {
  // Accept both req and res
  try {
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    });
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Error in authController :: logout ::", error);
    return res.status(500).json({ success: false, message: "Couldn't logout" });
  }
};

export const followUnfollowUser = async (req, res) => {
  const userId = req.user._id;
  const followId = req.params.followId;

  if (userId.toString() === followId.toString()) {
    return res
      .status(400)
      .json({ success: false, message: "You cannot follow yourself." });
  }

  try {
    const toFollowUser = await User.findById(followId).select("-password");

    if (!toFollowUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    const isFollowed = toFollowUser.followers.includes(userId);

    await User.findByIdAndUpdate(
      followId,
      isFollowed
        ? { $pull: { followers: userId } }
        : { $addToSet: { followers: userId } },
      { new: true }
    );
    await User.findByIdAndUpdate(
      userId,
      isFollowed
        ? { $pull: { followings: followId } }
        : { $addToSet: { followings: followId } },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: isFollowed
        ? "User unfollowed successfully."
        : "User followed successfully.",
    });
  } catch (error) {
    console.error("Error in followUnfollowUser:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const checkAuth = async (req, res) => {
  try {
    res
      .status(200)
      .json({ success: true, message: "User authenticated", user: req.user });
  } catch (error) {
    console.log("Error in checkAuth controller ::  error :: ", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

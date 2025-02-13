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
  const { fullName, email, password } = req.body;

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

    if (!token) {
      return res
        .status(400)
        .json({ success: false, message: "no tokens were created" });
    }

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
  const user = req.user;
};

export const updateProfile = async (req, res) => {
  const userId = req.user._id;

  const { email, password, fullName } = req.body;

  if (!userId) {
    return res
      .status(400)
      .json({ success: false, message: "User not verified" });
  }

  const updatedUser = await User.findByIdAndUpdate(userId, {
    email,
    password,
    fullName,
  });

  if (!updatedUser) {
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

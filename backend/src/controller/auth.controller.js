import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const generateTokens = async (userId) => {
    try {
        const token = jwt.sign(
            { id: userId },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        )
    
        return token;
    } catch (error) {
        console.log("no tokens were generated");
        return null;
    }
}

export const signup = async (req , res) => {
    const { fullName , email , password } = req.body;

    if (!fullName) {
        return res.status(400).json({ success: false, message: "fullname mandatory" });
    }
    if (!email) {
        return res.status(400).json({ success: false, message: "email mandatory" });
    }
    if (!password) {
        return res.status(400).json({ success: false, message: "password mandatory" });
    }

    const existingUser = await User.findOne({email})

    if (existingUser) {
        return res.status(400).json({ success: false, message: "User with email already exist" });
    }

    const salt = bcrypt.genSaltSync(10);

    const hashedPass = bcrypt.hashSync(password , salt);

    if (!hashedPass) {
        return res.status(400).json({ success: false, message: "Password didnt get hashed" });
    }

    const newUser = new User({
        fullName,
        email,
        password: hashedPass
    });

    if (!newUser) {
        return res.status(400).json({ success: false, message: "User was not created" });
    }

    await newUser.save();

    const userId = newUser._id;

    if (!userId) return res.status(400).json({ success: false, message: "userid was not found" });

    const token = await generateTokens(userId);
    
    if (!token) {
        return res.status(400).json({ success: false, message: "no tokens were created" });
    }

    const userResponse = newUser.toObject();

    delete userResponse.password;

    res.cookie("accessToken", token, {
        httpOnly: true,
        maxAge: 1*24*60*60*1000
    })

    res.status(201).json({ success: true, message: "User was created Successfully" , user: userResponse});

}

export const login = async (req, res) => {
    
}
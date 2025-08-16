import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateToken.js";

export const signup=async(req,res)=>
{
    try
    {
        const {email,username,password}=req.body;
        if(!email || !username || !password)
        {
            return res.status(400).json({ success:false,message: "All fields are required" });
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email))
        {
            return res.status(400).json({ success:false,message: "Invalid email format" });
        }
        if(password.length<6)
        {
            return res.status(400).json({ success:false,message: "Password must be at least 6 characters long" });
        }
        const existingUserByEmail=await User.findOne({ email });
        if(existingUserByEmail)
        {
            return res.status(400).json({ success:false,message: "Email already exists" });
        }
        const existingUserByUsername=await User.findOne({ username });
        if(existingUserByUsername)
        {
            return res.status(400).json({ success:false,message: "Username already exists" });
        }

        const salt=await bcrypt.genSalt(10);

        const hashedPassword=await bcrypt.hash(password,salt);

        const PROFILE_PICS=["/avatar1.png","/avatar2.png","/avatar3.png"];

        const image=PROFILE_PICS[Math.floor(Math.random()*PROFILE_PICS.length)];

        const newUser=new User(
            {
                email,
                username,
                password:hashedPassword,
                image
            }
        );
        
        generateTokenAndSetCookie(newUser._id,res);
        await newUser.save();
        res.status(201).json({ success:true,user:{...newUser._doc,password:""} });
        
    }
    catch (error)
    {
        console.log(`\nError in signup controller : ${error.message}\n`);
        res.status(500).json({ message: "Server error" });
    }
}

export const login=async(req,res)=>
{
    try
    {
        const {email,password}=req.body;

        if(!email || !password)
        {
            return res.status(400).json({ success:false,message: "All fields are required" });
        }

        const user=await User.findOne({ email });

        if(!user)
        {
            return res.status(400).json({ success:false,message: "Invalid credentials" });
        }

        const isPasswordCorrect=await bcrypt.compare(password,user.password);

        if(!isPasswordCorrect)
        {
            return res.status(400).json({ success:false,message: "Invalid credentials" });
        }

        generateTokenAndSetCookie(user._id,res);

        res.status(200).json({ success:true,user:{...user._doc,password:""} });
    }
    catch (error)
    {
        console.log(`\nError in login controller : ${error.message}\n`);
        res.status(500).json({ message: "Server error" });
    }
}

export const logout=async(req,res)=>
{
    try
    {
        res.clearCookie("jwt-netflix");
        res.status(200).json({ success:true,message: "Logout successful" });
    }
    catch (error)
    {
        console.log(`\nError in logout controller : ${error.message}\n`);
        res.status(500).json({ message: "Server error" });
    }
}
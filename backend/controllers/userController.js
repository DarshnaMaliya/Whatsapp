import User from "../models/userSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";
import dotenv from "dotenv";
import nodemailer from "nodemailer"

dotenv.config();

export const register = async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
  if(req.body.password !== req.body.match)
  {
    return res.status(400).json({ message: 'Password and confirm password doesnt match' });
  }
    // Check if user with same email already exists
 const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      return res.status(400).json({ message: 'User with that email already exists' });
    }
  
    // Hash the password before saving to database
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const hashedPassword1 = await bcrypt.hash(req.body.password, salt);
    // Create new user object
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      match: hashedPassword1
    });
  
    // Save the user to database
    try {
      const savedUser = await user.save();
      res.status(201).json({ message: 'User registered successfully', user: savedUser });
    } catch (err) {
      res.status(500).json({ message: err });
    }
  };
  
  // Login a user
  export const login = async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
  
    // Check if user with email exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ message: 'User with that email does not exist' });
    }
  
    // Compare password with hashed password
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: 'Invalid password' });
    }
  
    // Create and assign a token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
   // console.log(token);
    res.header('authorization', token).json({ message: 'Logged In successfully', user: user });
  };
  
  export const forgotpwd = async(req,res) => {
    const {email} =req.body;
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ message: 'User with that email does not exist' });
    }
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {expiresIn: '15m'});
    console.log(token);
    const transporter = nodemailer.createTransport({
        service: "gmail",
        port: 465,
        auth: {
          user: process.env.MY_MAIL, // Enter your email here
          pass: process.env.MY_PASS , // Enter your password here
        },
      });
      const mailOptions = {
        from: "dbardiya13@gmail.com", // Enter your email here
        to: email,
        subject: "Reset Password",
        text: `<p>Please click the link below to reset your password:</p><br><a href=http://localhost:3000/reset_password?token=${token}>Reset Password</a>`
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: ", info.response);
        }
      });
    
  }
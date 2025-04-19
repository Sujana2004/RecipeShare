import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User';
import mongoose from 'mongoose';
import session from 'express-session';

// Register user
export const registerUser = async (req: Request, res: Response): Promise<void> => {
  console.log("DEBUG - Incoming register request body:", req.body);
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully', userId: newUser._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err });
  }
};

// Login user
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: 'Invalid credentials' });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: 'Invalid credentials' });
      return;
    }

    req.session.userId = (user._id as mongoose.Types.ObjectId).toString();
    res.status(200).json({ message: 'Login successful', userId: user._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err });
  }
};

export const checkAuth = async (req:Request, res:Response): Promise<void> =>{
  if(req.session.userId){
    res.status(200).json({loggedIn: true});
  }
  else{
    res.status(401).json({loggedIn: false});
  }
}

// Logout user
export const logoutUser = async (req: Request, res: Response): Promise<void> => {
  req.session.destroy((err) => {
    if (err) {
      res.status(500).json({ message: 'Logout failed' });
      return;
    }

    res.clearCookie('connect.sid');
    res.status(200).json({ message: 'Logged out successfully' });
  });
};




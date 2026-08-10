import dotenv from "dotenv";
dotenv.config();

import connectDB from "../config/db";
import bcrypt from "bcrypt";
import mongoose from "mongoose";

import User from "../models/userModel";

const email = process.argv[2] || process.env.ADMIN_EMAIL;
const password = process.argv[3] || process.env.ADMIN_PASSWORD;
const name = process.argv[4] || process.env.ADMIN_NAME;

const createAdmin = async () => {
  await connectDB();

  if (!email || !password) {
    console.log('Email and password are required');
    process.exit(1);
  }

  const existingAdmin = await User.findOne({ email });

  if (existingAdmin) {
    if (existingAdmin.role === 'admin') {
      console.log('Admin with this email already exists');
      process.exit(0);
    } else {
      console.log('This email is already taken by a non-admin user');
      process.exit(1);
    }
  }

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash(password, 12);
    const newAdmin = await User.create({
      name,
      email,
      password: hashedPassword,
      role: 'admin',
    });

    console.log(`Admin ${name} with email ${email} successfully created`);
    process.exit(0);
  }
};

createAdmin();
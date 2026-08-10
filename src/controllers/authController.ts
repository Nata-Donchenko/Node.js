import { Request, Response, NextFunction } from "express";
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';

import User from '../models/userModel';
import RefreshToken from "../models/refreshTokenModel";
import { generateTokens } from '../utils/generateTokens';

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Required field' });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password: hashedPassword });

    const { password: userPassword, ...userWithoutPassword } = user.toObject();
    res.status(201).json(userWithoutPassword);
  } catch (err) {
    next(err);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const { accessToken, refreshToken } = await generateTokens(user.id, user.role);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: Number(process.env.JWT_REFRESH_EXPIRES_DAYS) * 24 * 60 * 60 * 1000,
    });

    const { password: userPassword, ...userWithoutPassword } = user.toObject();
    res.status(200).json({ accessToken, user: userWithoutPassword });
  } catch (err) {
    next(err);
  }
};

export const getMe = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(401).json({ error: 'Invalid user' });
    }

    const { password: userPassword, ...userWithoutPassword } = user.toObject();
    res.status(200).json(userWithoutPassword);
  } catch (err) {
    next(err);
  }
};

export const refresh = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.refreshToken;
    let decoded: JwtPayload;

    if (!token) {
      return res.status(401).send("Refresh token not provided");
    }

    try {
      decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET as string) as JwtPayload;
    } catch (err) {
      if (err instanceof Error) {
        if (err.name === 'TokenExpiredError') {
          return res.status(401).json({ error: 'Refresh token expired' });
        }
        if (err.name === 'JsonWebTokenError') {
          return res.status(401).json({ error: 'Invalid json token' });
        }
      }
      return res.status(401).json({ error: 'Invalid token' });
    }

    const storedToken = await RefreshToken.findOne({ token });

    if (!storedToken) {
      return res.status(401).json({ error: 'Invalid refresh token provided' });
    }

    await storedToken.deleteOne();

    const { accessToken, refreshToken } = await generateTokens(decoded.id, decoded.role);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: Number(process.env.JWT_REFRESH_EXPIRES_DAYS) * 24 * 60 * 60 * 1000,
    });

    return res.json({ accessToken });
  } catch (err) {
    next(err);
  }
};

export const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.refreshToken;

    if (!token) {
      return res.status(401).send("Refresh token not provided");
    }

    await RefreshToken.deleteOne({ token });

    res.clearCookie('refreshToken');

    return res.status(200).send('Logged out successfully');
  } catch (err) {
    next(err);
  }
};
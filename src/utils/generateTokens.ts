import jwt from 'jsonwebtoken';
import RefreshToken from '../models/refreshTokenModel';

export const generateTokens = async (id: string, role: string) => {
  const signOptions: jwt.SignOptions = {
    expiresIn: process.env.JWT_ACCESS_EXPIRES_IN as jwt.SignOptions['expiresIn'],
  };

  const accessToken = jwt.sign(
    { id, role },
    process.env.JWT_ACCESS_SECRET as string,
    signOptions
  );

  const refreshSignOptions: jwt.SignOptions = {
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN as jwt.SignOptions['expiresIn'],
  };

  const refreshToken = jwt.sign(
    { id, role },
    process.env.JWT_REFRESH_SECRET as string,
    refreshSignOptions
  );

  const expiresAt = new Date(
    Date.now() + Number(process.env.JWT_REFRESH_EXPIRES_DAYS) * 24 * 60 * 60 * 1000
  );

  await RefreshToken.create({
    token: refreshToken,
    user: id,
    expiresAt,
  });

  return { accessToken, refreshToken, expiresAt };
};
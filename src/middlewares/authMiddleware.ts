import { Request, Response, NextFunction } from "express";
import jwt, {JwtPayload} from "jsonwebtoken";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader?.startsWith("Bearer ")) {
    return res.status(401).send("Not authorized");
  }

  const token = authHeader.split("Bearer ")[1];

  if (!token) {
    return res.status(401).send("No token provided");
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET as string);
    req.user = decoded as JwtPayload;
    next();
  } catch (err) {
    if (err instanceof Error) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).send("Access token expired");
      };
      if (err.name === "JsonWebTokenError") {
        return res.status(401).send("Invalid token");
      }
    }
    return res.status(401).send("Unauthorized");
  }
}
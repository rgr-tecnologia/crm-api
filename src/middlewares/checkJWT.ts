import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export const validateJWT = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(403).json({ message: "Token is required" });
  }

  try {
    const secret = process.env.AUTH0_CLIENT_SECRET;
    const audience = process.env.AUTH0_AUDIENCE;
    const issuer = process.env.AUTH0_ISSUER_BASE_URL;

    if (!secret || !audience || !issuer) {
      return res.status(500).json({ message: "Internal server error" });
    }

    verify(token, secret, {
      audience,
      issuer,
      algorithms: ["HS256"],
    });

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

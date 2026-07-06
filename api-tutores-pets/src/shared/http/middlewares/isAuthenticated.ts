import auth from "@config/auth";
import AppError from "@shared/errors/AppError";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface ITokenPayload {
  sub: string;
  iat: number;
  exp: number;
}

export default function isAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("JWT token is missing.", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const decodedToken = jwt.verify(token, auth.jwt.secret);
    const { sub } = decodedToken as ITokenPayload;

    request.user = {
      id: sub,
    };

    return next();
  } catch (err) {
    throw new AppError("Invalid JWT token.", 401);
  }
}

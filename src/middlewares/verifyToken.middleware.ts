import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import ApiResponse from "../utils/apiResponse";

export const verifyJWT = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json(new ApiResponse(401, "Unauthorized"));
  }

  const decoded = await jwt.verify(token, process.env.JWT_SECRET as string);

  if (!decoded) {
    return res.status(401).json(new ApiResponse(401, "Unauthorized"));
  }

  req.user = decoded;

  next();
};

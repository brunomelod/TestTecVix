import { Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";
import { ERROR_MESSAGE } from "../constants/erroMessages";
import { STATUS_CODE } from "../constants/statusCode";
import { verifyToken } from "../utils/jwt";
import { CustomRequest } from "../types/custom";
import { UserModel } from "../models/UserModel";

const userModel = new UserModel();
type AuthenticatedRequest = CustomRequest<
  Awaited<ReturnType<UserModel["findById"]>>
>;

export const authUser = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  const { authorization } = req.headers;
  if (!authorization) {
    throw new AppError(ERROR_MESSAGE.INVALID_TOKEN, STATUS_CODE.UNAUTHORIZED);
  }
  const token = authorization.split(" ")[1];
  
  if (!token) {
    throw new AppError(ERROR_MESSAGE.INVALID_TOKEN, STATUS_CODE.UNAUTHORIZED);
  }

  const decoded = verifyToken(token);

  const user = await userModel.findById(decoded.idUser);

  if (!user) {
    throw new AppError(ERROR_MESSAGE.USER_NOT_FOUND, STATUS_CODE.UNAUTHORIZED);
  }

  if (!user.isActive) {
    throw new AppError(ERROR_MESSAGE.UNAUTHORIZED, STATUS_CODE.UNAUTHORIZED);
  }

  req.user = user;

  return next();
};

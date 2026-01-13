import jwt, { TokenExpiredError } from "jsonwebtoken";
import { AppError } from "../errors/AppError";
import { ERROR_MESSAGE } from "../constants/erroMessages";
import { STATUS_CODE } from "../constants/statusCode";

const secret = process.env.JWT_SECRET as string;

interface IPayload {
  idUser: string;
  email: string;
  role: string;
}

export const genToken = (payload: IPayload) => {
  if (!secret) {
    throw new AppError(
      "JWT_SECRET not configured",
      STATUS_CODE.SERVER_ERROR
    );
  }

  return jwt.sign(payload, secret, {
    expiresIn: "7d", // Token expira em 7 dias
  });
};

export const verifyToken = (token: string): IPayload => {
  try {
    if (!secret) {
      throw new AppError(
        "JWT_SECRET not configured",
        STATUS_CODE.SERVER_ERROR
      );
    }

    const decoded = jwt.verify(token, secret) as IPayload;
    return decoded;
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      throw new AppError(
        "Token expired",
        STATUS_CODE.UNAUTHORIZED
      );
    }
    throw new AppError(
      ERROR_MESSAGE.INVALID_TOKEN,
      STATUS_CODE.UNAUTHORIZED
    );
  }
};
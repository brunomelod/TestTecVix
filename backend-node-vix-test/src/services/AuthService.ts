import bcrypt from "bcryptjs";
import { AppError } from "../errors/AppError";
import { ERROR_MESSAGE } from "../constants/erroMessages";
import { STATUS_CODE } from "../constants/statusCode";
import { UserModel } from "../models/UserModel";
import { genToken } from "../utils/jwt";
import { TLogin } from "../types/validations/Auth/login";
import { loginSchema } from "../types/validations/Auth/login";
import { TUserCreated, userCreatedSchema } from "../types/validations/User/createUser";

export class AuthService {
  private userModel = new UserModel();

  async login(data: unknown) {
    const validData: TLogin = loginSchema.parse(data);

    const user = await this.userModel.findByEmail(validData.email);

    if (!user) {
      throw new AppError(
        ERROR_MESSAGE.INVALID_EMAIL_OR_PASSWORD,
        STATUS_CODE.UNAUTHORIZED
      );
    }

    const isPasswordValid = await bcrypt.compare(
      validData.password,
      user.password
    );

    if (!isPasswordValid) {
      throw new AppError(
        ERROR_MESSAGE.INVALID_EMAIL_OR_PASSWORD,
        STATUS_CODE.UNAUTHORIZED
      );
    }

    if (!user.isActive) {
      throw new AppError(
        ERROR_MESSAGE.UNAUTHORIZED,
        STATUS_CODE.UNAUTHORIZED
      );
    }

    await this.userModel.updateLastLogin(user.idUser);

    const token = genToken({
      idUser: user.idUser,
      email: user.email,
      role: user.role,
    });

    return {
      token,
      user: {
        idUser: user.idUser,
        username: user.username,
        email: user.email,
        role: user.role,
        idBrandMaster: user.idBrandMaster,
        profileImgUrl: user.profileImgUrl,
        isActive: user.isActive,
      },
    };
  }

  async register(data: unknown) {

    const validData: TUserCreated = userCreatedSchema.parse(data);

    const emailExists = await this.userModel.checkEmailExists(validData.email);
    if (emailExists) {
      throw new AppError(
        ERROR_MESSAGE.USER_EMAIL_ALREADY_EXISTS,
        STATUS_CODE.CONFLICT
      );
    }

    const usernameExists = await this.userModel.checkUsernameExists(
      validData.username
    );
    if (usernameExists) {
      throw new AppError(
        ERROR_MESSAGE.USERNAME_ALREADY_EXISTS,
        STATUS_CODE.CONFLICT
      );
    }

    const hashedPassword = await bcrypt.hash(validData.password, 10);

    const newUser = await this.userModel.create({
      ...validData,
      password: hashedPassword,
    });

    const token = genToken({
      idUser: newUser.idUser,
      email: newUser.email,
      role: newUser.role,
    });

    return {
      token,
      user: newUser,
    };
  }
}  

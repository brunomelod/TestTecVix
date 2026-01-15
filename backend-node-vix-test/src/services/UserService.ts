import { UserModel } from "../models/UserModel";
import { AppError } from "../errors/AppError";
import { ERROR_MESSAGE } from "../constants/erroMessages";
import { STATUS_CODE } from "../constants/statusCode";
import { TUserCreated, userCreatedSchema } from "../types/validations/User/createUser";
import { z } from "zod";
import bcrypt from "bcryptjs";

const userUpdateSchema = userCreatedSchema.partial();
type TUserUpdate = z.infer<typeof userUpdateSchema>;

export class UserService {
  private userModel = new UserModel();

  async listAll(query: unknown) {
    const page = query && typeof query === "object" && "page" in query 
      ? Number(query.page) 
      : 0;
    const limit = query && typeof query === "object" && "limit" in query 
      ? Number(query.limit) 
      : 20;
    const search = query && typeof query === "object" && "search" in query 
      ? String(query.search) 
      : undefined;

    return this.userModel.listAll({ page, limit, search });
  }

  async getById(idUser: string) {
    const user = await this.userModel.findById(idUser);
    
    if (!user) {
      throw new AppError(ERROR_MESSAGE.USER_NOT_FOUND, STATUS_CODE.NOT_FOUND);
    }

    // Não retornar a senha
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async update(idUser: string, data: unknown) {
    const validData: TUserUpdate = userUpdateSchema.parse(data);
    
    const user = await this.userModel.findById(idUser);
    if (!user) {
      throw new AppError(ERROR_MESSAGE.USER_NOT_FOUND, STATUS_CODE.NOT_FOUND);
    }

    // Verificar se email já existe (se estiver mudando)
    if (validData.email && validData.email !== user.email) {
      const emailExists = await this.userModel.checkEmailExists(validData.email);
      if (emailExists) {
        throw new AppError("Email already in use", STATUS_CODE.BAD_REQUEST);
      }
    }

    // Verificar se username já existe (se estiver mudando)
    if (validData.username && validData.username !== user.username) {
      const usernameExists = await this.userModel.checkUsernameExists(validData.username);
      if (usernameExists) {
        throw new AppError("Username already in use", STATUS_CODE.BAD_REQUEST);
      }
    }

    const updatedUser = await this.userModel.update(idUser, validData);
    
    // Não retornar a senha
    const { password, ...userWithoutPassword } = updatedUser;
    return userWithoutPassword;
  }

  async delete(idUser: string) {
    const user = await this.userModel.findById(idUser);
    
    if (!user) {
      throw new AppError(ERROR_MESSAGE.USER_NOT_FOUND, STATUS_CODE.NOT_FOUND);
    }

    await this.userModel.delete(idUser);
    
    return { message: "User deleted successfully" };
  }

  async updatePassword(idUser: string, data: { currentPassword: string; newPassword: string }) {
    const user = await this.userModel.findById(idUser);
    
    if (!user) {
      throw new AppError(ERROR_MESSAGE.USER_NOT_FOUND, STATUS_CODE.NOT_FOUND);
    }

    // Verificar senha atual
    const isPasswordValid = await bcrypt.compare(data.currentPassword, user.password);
    if (!isPasswordValid) {
      throw new AppError("Current password is incorrect", STATUS_CODE.UNAUTHORIZED);
    }

    // Hash da nova senha
    const hashedPassword = await bcrypt.hash(data.newPassword, 10);

    // Atualizar senha
    await this.userModel.update(idUser, { password: hashedPassword });

    return { message: "Password updated successfully" };
  }

  async updateProfileImage(idUser: string, imageUrl: string) {
    const user = await this.userModel.findById(idUser);
    
    if (!user) {
      throw new AppError(ERROR_MESSAGE.USER_NOT_FOUND, STATUS_CODE.NOT_FOUND);
    }

    const updatedUser = await this.userModel.update(idUser, { profileImgUrl: imageUrl });
    
    // Não retornar a senha
    const { password, ...userWithoutPassword } = updatedUser;
    return userWithoutPassword;
  }

  async deleteProfileImage(idUser: string) {
    const user = await this.userModel.findById(idUser);
    
    if (!user) {
      throw new AppError(ERROR_MESSAGE.USER_NOT_FOUND, STATUS_CODE.NOT_FOUND);
    }

    await this.userModel.update(idUser, { profileImgUrl: null });

    return { message: "Profile image removed successfully" };
  }
}

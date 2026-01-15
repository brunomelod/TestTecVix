import { Response } from "express";
import { CustomRequest } from "../types/custom";
import { UserService } from "../services/UserService";
import { STATUS_CODE } from "../constants/statusCode";

export class UserController {
  private userService = new UserService();

  async listAll(req: CustomRequest<unknown>, res: Response) {
    const result = await this.userService.listAll(req.query);
    return res.status(STATUS_CODE.OK).json(result);
  }

  async getById(req: CustomRequest<unknown>, res: Response) {
    const { idUser } = req.params;
    const idUserStr = Array.isArray(idUser) ? idUser[0] : idUser;
    const result = await this.userService.getById(idUserStr);
    return res.status(STATUS_CODE.OK).json(result);
  }

  async update(req: CustomRequest<unknown>, res: Response) {
    const { idUser } = req.params;
    const idUserStr = Array.isArray(idUser) ? idUser[0] : idUser;
    const result = await this.userService.update(idUserStr, req.body);
    return res.status(STATUS_CODE.OK).json(result);
  }

  async delete(req: CustomRequest<unknown>, res: Response) {
    const { idUser } = req.params;
    const idUserStr = Array.isArray(idUser) ? idUser[0] : idUser;
    const result = await this.userService.delete(idUserStr);
    return res.status(STATUS_CODE.OK).json(result);
  }

  async updatePassword(req: CustomRequest<unknown>, res: Response) {
    const { idUser } = req.params;
    const idUserStr = Array.isArray(idUser) ? idUser[0] : idUser;
    const result = await this.userService.updatePassword(idUserStr, req.body);
    return res.status(STATUS_CODE.OK).json(result);
  }

  async updateProfileImage(req: CustomRequest<unknown>, res: Response) {
    const { idUser } = req.params;
    const idUserStr = Array.isArray(idUser) ? idUser[0] : idUser;
    const imageUrl = req.body.imageUrl; // URL da imagem (assumindo upload já feito)
    const result = await this.userService.updateProfileImage(idUserStr, imageUrl);
    return res.status(STATUS_CODE.OK).json(result);
  }

  async deleteProfileImage(req: CustomRequest<unknown>, res: Response) {
    const { idUser } = req.params;
    const idUserStr = Array.isArray(idUser) ? idUser[0] : idUser;
    const result = await this.userService.deleteProfileImage(idUserStr);
    return res.status(STATUS_CODE.OK).json(result);
  }
}

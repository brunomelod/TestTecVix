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
    const result = await this.userService.getById(idUser);
    return res.status(STATUS_CODE.OK).json(result);
  }

  async update(req: CustomRequest<unknown>, res: Response) {
    const { idUser } = req.params;
    const result = await this.userService.update(idUser, req.body);
    return res.status(STATUS_CODE.OK).json(result);
  }

  async delete(req: CustomRequest<unknown>, res: Response) {
    const { idUser } = req.params;
    const result = await this.userService.delete(idUser);
    return res.status(STATUS_CODE.OK).json(result);
  }
}

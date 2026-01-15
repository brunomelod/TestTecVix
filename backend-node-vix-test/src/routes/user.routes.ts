import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { API_VERSION } from "../constants/basePathRoutes";
import { authUser } from "../auth/authUser";
import { isAdmin } from "../auth/isAdmin";
import { isSelfOrIsManagerOrIsAdm } from "../auth/isSelfOrIsManagerOrIsAdm";

const BASE_PATH = API_VERSION.V1 + "/users";

const userRoutes = Router();
const userController = new UserController();

// Listar todos os usuários (apenas admin)
userRoutes.get(
  BASE_PATH,
  authUser,
  isAdmin,
  async (req, res) => {
    await userController.listAll(req, res);
  }
);

// Buscar usuário por ID (próprio usuário ou admin)
userRoutes.get(
  `${BASE_PATH}/:idUser`,
  authUser,
  isSelfOrIsManagerOrIsAdm,
  async (req, res) => {
    await userController.getById(req, res);
  }
);

// Atualizar usuário (próprio usuário ou admin)
userRoutes.put(
  `${BASE_PATH}/:idUser`,
  authUser,
  isSelfOrIsManagerOrIsAdm,
  async (req, res) => {
    await userController.update(req, res);
  }
);

// Deletar usuário (apenas admin)
userRoutes.delete(
  `${BASE_PATH}/:idUser`,
  authUser,
  isAdmin,
  async (req, res) => {
    await userController.delete(req, res);
  }
);

// Alterar senha (próprio usuário)
userRoutes.put(
  `${BASE_PATH}/:idUser/password`,
  authUser,
  isSelfOrIsManagerOrIsAdm,
  async (req, res) => {
    await userController.updatePassword(req, res);
  }
);

// Atualizar imagem de perfil (próprio usuário)
userRoutes.post(
  `${BASE_PATH}/:idUser/profile-image`,
  authUser,
  isSelfOrIsManagerOrIsAdm,
  async (req, res) => {
    await userController.updateProfileImage(req, res);
  }
);

// Remover imagem de perfil (próprio usuário)
userRoutes.delete(
  `${BASE_PATH}/:idUser/profile-image`,
  authUser,
  isSelfOrIsManagerOrIsAdm,
  async (req, res) => {
    await userController.deleteProfileImage(req, res);
  }
);

export { userRoutes };

import { prisma } from "../database/client";
import { TUserCreated } from "../types/validations/User/createUser";

export class UserModel {
  async findByEmail(email: string) {
    return prisma.user.findFirst({
      where: {
        email,
        deletedAt: null,
        isActive: true,
      },
    });
  }
}

async findById(idUser: string) {
    return prisma.user.findUnique({
        where: {
            idUser,
            deletedAt: null,
        },
    });
}

async create(data: TUserCreated & { password: string }) {
    return prisma.user.create({
      data: {
        username: data.username,
        email: data.email,
        password: data.password,
        role: data.role || "member",
        idBrandMaster: data.idBrandMaster || null,
        profileImgUrl: data.profileImgUrl || null,
        isActive: data.isActive ?? true,
      },
      select: {
        idUser: true,
        username: true,
        email: true,
        role: true,
        idBrandMaster: true,
        profileImgUrl: true,
        isActive: true,
        createdAt: true,
      },
    });
  }

  async updateLastLogin(idUser: string) {
    return prisma.user.update({
      where: { idUser },
      data: {
        lastLoginDate: new Date(),
      },
    });
  }

  async checkEmailExists(email: string) {
    const user = await prisma.user.findFirst({
      where: {
        email,
        deletedAt: null,
      },
    });
    return !!user;
  }

  async checkUsernameExists(username: string) {
    const user = await prisma.user.findFirst({
      where: {
        username,
        deletedAt: null,
      },
    });
    return !!user;
  }
}
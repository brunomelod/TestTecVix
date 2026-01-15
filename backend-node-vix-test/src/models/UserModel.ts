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

  async findById(idUser: string) {
    return prisma.user.findFirst({
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

  async listAll(params?: { page?: number; limit?: number; search?: string }) {
    const page = params?.page || 0;
    const limit = params?.limit || 20;
    const skip = page * limit;

    const where = {
      deletedAt: null,
      ...(params?.search && {
        OR: [
          { username: { contains: params.search } },
          { email: { contains: params.search } },
        ],
      }),
    };

    const [users, totalCount] = await Promise.all([
      prisma.user.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        select: {
          idUser: true,
          username: true,
          email: true,
          role: true,
          isActive: true,
          profileImgUrl: true,
          idBrandMaster: true,
          createdAt: true,
          lastLoginDate: true,
        },
      }),
      prisma.user.count({ where }),
    ]);

    return { result: users, totalCount };
  }

  async update(idUser: string, data: Partial<TUserCreated>) {
    const updateData: any = { ...data };
    
    // Se tem senha, fazer hash
    if (data.password) {
      const bcrypt = await import("bcryptjs");
      updateData.password = await bcrypt.hash(data.password, 10);
    }

    return prisma.user.update({
      where: { idUser },
      data: {
        ...updateData,
        updatedAt: new Date(),
      },
    });
  }

  async delete(idUser: string) {
    return prisma.user.update({
      where: { idUser },
      data: {
        deletedAt: new Date(),
        updatedAt: new Date(),
      },
    });
  }
}
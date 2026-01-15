import { useState } from "react";
import { api } from "../services/api";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

export interface IEmployee {
  idUser: string;
  username: string;
  email: string;
  role: "admin" | "manager" | "member";
  isActive: boolean;
  profileImgUrl: string | null;
  idBrandMaster: number | null;
  createdAt: string;
  lastLoginDate: string | null;
}

interface IListEmployeesResponse {
  result: IEmployee[];
  totalCount: number;
}

export const useEmployees = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  const listEmployees = async (params?: {
    page?: number;
    limit?: number;
    search?: string;
  }) => {
    setIsLoading(true);
    const response = await api.get<IListEmployeesResponse>({
      url: "/users",
      params: {
        page: params?.page || 0,
        limit: params?.limit || 20,
        search: params?.search || "",
      },
    });
    setIsLoading(false);

    if (response.error) {
      toast.error(response.message);
      return { result: [], totalCount: 0 };
    }

    return response.data || { result: [], totalCount: 0 };
  };

  const getEmployeeById = async (idUser: string) => {
    setIsLoading(true);
    const response = await api.get<IEmployee>({
      url: `/users/${idUser}`,
    });
    setIsLoading(false);

    if (response.error) {
      toast.error(response.message);
      return null;
    }

    return response.data;
  };

  const createEmployee = async (data: {
    username: string;
    email: string;
    password: string;
    role: "admin" | "manager" | "member";
  }) => {
    setIsLoading(true);
    const response = await api.post({
      url: "/auth/register",
      data,
    });
    setIsLoading(false);

    if (response.error) {
      toast.error(response.message);
      return null;
    }

    toast.success(t("employees.createSuccess") || "Funcionário criado com sucesso!");
    return response.data;
  };

  const updateEmployee = async (
    idUser: string,
    data: {
      username?: string;
      email?: string;
      role?: "admin" | "manager" | "member";
      isActive?: boolean;
    }
  ) => {
    setIsLoading(true);
    const response = await api.put({
      url: `/users/${idUser}`,
      data,
    });
    setIsLoading(false);

    if (response.error) {
      toast.error(response.message);
      return null;
    }

    toast.success(t("employees.updateSuccess") || "Funcionário atualizado com sucesso!");
    return response.data;
  };

  const deleteEmployee = async (idUser: string) => {
    setIsLoading(true);
    const response = await api.delete({
      url: `/users/${idUser}`,
    });
    setIsLoading(false);

    if (response.error) {
      toast.error(response.message);
      return false;
    }

    toast.success(t("employees.deleteSuccess") || "Funcionário deletado com sucesso!");
    return true;
  };

  return {
    isLoading,
    listEmployees,
    getEmployeeById,
    createEmployee,
    updateEmployee,
    deleteEmployee,
  };
};

/* eslint-disable @typescript-eslint/no-unused-vars */
import { useNavigate } from "react-router-dom";
import { useZResetAllStates } from "../stores/useZResetAllStates";
import { FullPage } from "../components/Skeletons/FullPage";
import { useEffect, useState } from "react";
import { useZUserProfile } from "../stores/useZUserProfile";

interface IProps {
  children: React.ReactNode;
  onlyManagerOrAdmin?: boolean;
  onlyAdmin?: boolean;
  skeleton?: boolean;
}

export const PrivatePage = ({
  children,
  onlyAdmin = false,
  onlyManagerOrAdmin = false,
}: IProps) => {
  const [isChecking, setIsChecking] = useState(true);
  const { resetAllStates } = useZResetAllStates();
  const navigate = useNavigate();
  const { idUser, token, role } = useZUserProfile();
  useEffect(() => {
   
    switch (true) {
      case !idUser || !token: // Se não tem usuário ou token logado
        resetAllStates();
        navigate("/login");
        break;
      case onlyAdmin && role !== "admin": // Se precisa ser admin mas não é
        navigate(-1);
        break;
      case onlyManagerOrAdmin && role !== "admin" && role !== "manager": // Se precisa ser manager/admin mas não é
        navigate(-1);
        break;

      default:
        setIsChecking(false);
        break;
    }
  }, [idUser, token, role, onlyAdmin, onlyManagerOrAdmin, navigate, resetAllStates]);

  if (!idUser || !token) return <FullPage />; // ← DESCOMENTAR

  if (isChecking) {
    return <FullPage />;
  }

  return <>{children}</>;
};

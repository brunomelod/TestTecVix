import { useNavigate } from "react-router-dom";
import { useZResetAllStates } from "../stores/useZResetAllStates";
import { FullPage } from "../components/Skeletons/FullPage";
import { useEffect, useRef } from "react";
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
  const { resetAllStates } = useZResetAllStates();
  const navigate = useNavigate();
  const { idUser, token, role } = useZUserProfile();
  const hasChecked = useRef(false);


  useEffect(() => {  // ← ADICIONAR ESTA LINHA (estava faltando!)
    if (hasChecked.current) return;
    hasChecked.current = true;

    if (!idUser || !token) {
      resetAllStates();
      navigate("/login", { replace: true });
      return;
    }

    if (onlyAdmin && role !== "admin") {
      navigate(-1);
      return;
    }

    if (onlyManagerOrAdmin && role !== "admin" && role !== "manager") {
      navigate(-1);
      return;
    }
  }, []);

  // Se não tem usuário, mostra loading
  if (!idUser || !token) {
    return <FullPage />;
  }

  return <>{children}</>;
};

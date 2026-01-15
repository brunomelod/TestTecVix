import { Stack, TextField, Button } from "@mui/material";
import { useState } from "react";
import { useZTheme } from "../../../stores/useZTheme";
import { useTranslation } from "react-i18next";
import { useZUserProfile } from "../../../stores/useZUserProfile";
import { api } from "../../../services/api";
import { toast } from "react-toastify";
import { AbsoluteBackDrop } from "../../../components/AbsoluteBackDrop";

export const SecurityTab = () => {
  const { theme, mode } = useZTheme();
  const { t } = useTranslation();
  const { idUser } = useZUserProfile();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChangePassword = async () => {
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error(t("settings.passwordMismatch") || "As senhas não coincidem");
      return;
    }

    if (formData.newPassword.length < 8) {
      toast.error(
        t("settings.passwordTooShort") || "A senha deve ter no mínimo 8 caracteres"
      );
      return;
    }

    setIsLoading(true);
    const response = await api.put({
      url: `/users/${idUser}/password`,
      data: {
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      },
    });
    setIsLoading(false);

    if (response.error) {
      toast.error(response.message);
      return;
    }

    toast.success(t("settings.passwordChanged") || "Senha alterada com sucesso!");
    setFormData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  const canSave =
    formData.currentPassword &&
    formData.newPassword &&
    formData.confirmPassword &&
    formData.newPassword === formData.confirmPassword;

  return (
    <>
      {isLoading && <AbsoluteBackDrop open={isLoading} />}
      <Stack spacing={3}>
        <TextField
          label={t("settings.currentPassword") || "Senha Atual"}
          type="password"
          fullWidth
          value={formData.currentPassword}
          onChange={(e) =>
            setFormData({ ...formData, currentPassword: e.target.value })
          }
          sx={{
            "& .MuiInputLabel-root": { color: theme[mode].gray },
            "& .MuiOutlinedInput-root": {
              color: theme[mode].primary,
              "& fieldset": { borderColor: theme[mode].grayLight },
            },
          }}
        />

        <TextField
          label={t("settings.newPassword") || "Nova Senha"}
          type="password"
          fullWidth
          value={formData.newPassword}
          onChange={(e) =>
            setFormData({ ...formData, newPassword: e.target.value })
          }
          helperText="Mínimo 8 caracteres"
          sx={{
            "& .MuiInputLabel-root": { color: theme[mode].gray },
            "& .MuiOutlinedInput-root": {
              color: theme[mode].primary,
              "& fieldset": { borderColor: theme[mode].grayLight },
            },
            "& .MuiFormHelperText-root": { color: theme[mode].gray },
          }}
        />

        <TextField
          label={t("settings.confirmPassword") || "Confirmar Nova Senha"}
          type="password"
          fullWidth
          value={formData.confirmPassword}
          onChange={(e) =>
            setFormData({ ...formData, confirmPassword: e.target.value })
          }
          error={
            formData.confirmPassword !== "" &&
            formData.newPassword !== formData.confirmPassword
          }
          helperText={
            formData.confirmPassword !== "" &&
            formData.newPassword !== formData.confirmPassword
              ? "As senhas não coincidem"
              : ""
          }
          sx={{
            "& .MuiInputLabel-root": { color: theme[mode].gray },
            "& .MuiOutlinedInput-root": {
              color: theme[mode].primary,
              "& fieldset": { borderColor: theme[mode].grayLight },
            },
            "& .MuiFormHelperText-root": { color: theme[mode].gray },
          }}
        />

        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <Button
            variant="contained"
            onClick={handleChangePassword}
            disabled={!canSave}
            sx={{
              backgroundColor: theme[mode].blue,
              color: theme[mode].btnText,
              "&:disabled": {
                backgroundColor: theme[mode].grayLight,
                color: theme[mode].gray,
              },
            }}
          >
            {t("settings.changePassword") || "Alterar Senha"}
          </Button>
        </Stack>
      </Stack>
    </>
  );
};

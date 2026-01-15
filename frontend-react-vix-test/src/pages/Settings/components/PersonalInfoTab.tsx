import { Stack, TextField, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { useZTheme } from "../../../stores/useZTheme";
import { useTranslation } from "../../../react-i18next";
import { useZUserProfile } from "../../../stores/useZUserProfile";
import { api } from "../../../services/api";
import { toast } from "react-toastify";
import { AbsoluteBackDrop } from "../../../components/AbsoluteBackDrop";

export const PersonalInfoTab = () => {
  const { theme, mode } = useZTheme();
  const { t } = useTranslation();
  const { username, userEmail, idUser, setUserProfile } = useZUserProfile();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: username || "",
    email: userEmail || "",
  });

  useEffect(() => {
    setFormData({
      username: username || "",
      email: userEmail || "",
    });
  }, [username, userEmail]);

  const handleSave = async () => {
    setIsLoading(true);
    const response = await api.put({
      url: `/users/${idUser}`,
      data: {
        username: formData.username,
        email: formData.email,
      },
    });
    setIsLoading(false);

    if (response.error) {
      toast.error(response.message);
      return;
    }

    toast.success(t("settings.updateSuccess") || "Informações atualizadas com sucesso!");
    
    // Atualizar o store com os novos dados
    setUserProfile({
      username: formData.username,
      userEmail: formData.email,
    });
  };

  const hasChanges =
    formData.username !== username || formData.email !== userEmail;

  return (
    <>
      {isLoading && <AbsoluteBackDrop open={isLoading} />}
      <Stack spacing={3}>
        <TextField
          label={t("settings.name") || "Nome"}
          fullWidth
          value={formData.username}
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
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
          label={t("settings.email") || "Email"}
          type="email"
          fullWidth
          value={formData.email}
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
          sx={{
            "& .MuiInputLabel-root": { color: theme[mode].gray },
            "& .MuiOutlinedInput-root": {
              color: theme[mode].primary,
              "& fieldset": { borderColor: theme[mode].grayLight },
            },
          }}
        />

        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <Button
            variant="contained"
            onClick={handleSave}
            disabled={!hasChanges}
            sx={{
              backgroundColor: theme[mode].blue,
              color: theme[mode].btnText,
              "&:disabled": {
                backgroundColor: theme[mode].grayLight,
                color: theme[mode].gray,
              },
            }}
          >
            {t("generic.save") || "Salvar"}
          </Button>
        </Stack>
      </Stack>
    </>
  );
};

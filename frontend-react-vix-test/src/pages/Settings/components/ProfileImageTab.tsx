import { Stack, Button, Avatar, IconButton } from "@mui/material";
import { useState, useRef } from "react";
import { useZTheme } from "../../../stores/useZTheme";
import { useTranslation } from "react-i18next";
import { useZUserProfile } from "../../../stores/useZUserProfile";
import { api } from "../../../services/api";
import { toast } from "react-toastify";
import { AbsoluteBackDrop } from "../../../components/AbsoluteBackDrop";
import PersonIcon from "@mui/icons-material/Person";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import DeleteIcon from "@mui/icons-material/Delete";
import { ImgFromDB } from "../../../components/ImgFromDB";

export const ProfileImageTab = () => {
  const { theme, mode } = useZTheme();
  const { t } = useTranslation();
  const { profileImgUrl, idUser, setUserProfile } = useZUserProfile();
  const [isLoading, setIsLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error(t("settings.fileTooLarge") || "Arquivo muito grande. Máximo: 5MB");
        return;
      }

      if (!file.type.startsWith("image/")) {
        toast.error(t("settings.invalidFileType") || "Tipo de arquivo inválido");
        return;
      }

      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsLoading(true);
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await api.post({
        url: `/users/${idUser}/profile-image`,
        data: formData,
      });

      setIsLoading(false);

      if (response.error) {
        toast.error(response.message);
        return;
      }

      toast.success(
        t("settings.imageUploadSuccess") || "Imagem atualizada com sucesso!"
      );
      
      // Atualizar o store com a nova URL da imagem
      const newImageUrl = response.data?.profileImgUrl;
      if (newImageUrl) {
        setUserProfile({ profileImgUrl: newImageUrl });
      }

      setPreviewImage(null);
      setSelectedFile(null);
    } catch (error) {
      setIsLoading(false);
      toast.error(t("settings.uploadError") || "Erro ao fazer upload");
    }
  };

  const handleRemoveImage = async () => {
    setIsLoading(true);
    const response = await api.delete({
      url: `/users/${idUser}/profile-image`,
    });
    setIsLoading(false);

    if (response.error) {
      toast.error(response.message);
      return;
    }

    toast.success(
      t("settings.imageRemoveSuccess") || "Imagem removida com sucesso!"
    );
    setUserProfile({ profileImgUrl: null });
  };

  const handleClickUpload = () => {
    fileInputRef.current?.click();
  };

  const currentImage = previewImage || profileImgUrl;

  return (
    <>
      {isLoading && <AbsoluteBackDrop open={isLoading} />}
      <Stack spacing={3} alignItems="center">
        <Stack
          sx={{
            position: "relative",
            width: "200px",
            height: "200px",
          }}
        >
          {currentImage ? (
            <ImgFromDB
              src={currentImage}
              alt="Profile"
              style={{
                width: "200px",
                height: "200px",
                borderRadius: "50%",
                objectFit: "cover",
                boxShadow: `0px 4px 8px ${theme[mode].shadow}`,
              }}
            />
          ) : (
            <Avatar
              sx={{
                width: "200px",
                height: "200px",
                backgroundColor: theme[mode].grayLight,
                boxShadow: `0px 4px 8px ${theme[mode].shadow}`,
              }}
            >
              <PersonIcon sx={{ fontSize: "100px", color: theme[mode].gray }} />
            </Avatar>
          )}

          <IconButton
            onClick={handleClickUpload}
            sx={{
              position: "absolute",
              bottom: "10px",
              right: "10px",
              backgroundColor: theme[mode].blue,
              color: theme[mode].btnText,
              "&:hover": {
                backgroundColor: theme[mode].blueMedium,
              },
            }}
          >
            <PhotoCamera />
          </IconButton>
        </Stack>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleFileSelect}
        />

        <Stack direction="row" spacing={2}>
          {selectedFile && (
            <Button
              variant="contained"
              onClick={handleUpload}
              sx={{
                backgroundColor: theme[mode].blue,
                color: theme[mode].btnText,
              }}
            >
              {t("settings.uploadImage") || "Fazer Upload"}
            </Button>
          )}

          {(profileImgUrl || previewImage) && (
            <Button
              variant="outlined"
              startIcon={<DeleteIcon />}
              onClick={previewImage ? () => {
                setPreviewImage(null);
                setSelectedFile(null);
              } : handleRemoveImage}
              sx={{
                borderColor: theme[mode].danger,
                color: theme[mode].danger,
                "&:hover": {
                  borderColor: theme[mode].danger,
                  backgroundColor: `${theme[mode].danger}20`,
                },
              }}
            >
              {previewImage
                ? t("generic.cancel") || "Cancelar"
                : t("settings.removeImage") || "Remover Imagem"}
            </Button>
          )}
        </Stack>

        <Stack sx={{ color: theme[mode].gray, fontSize: "14px" }}>
          {t("settings.imageHint") || "Formatos aceitos: JPG, PNG. Tamanho máximo: 5MB"}
        </Stack>
      </Stack>
    </>
  );
};

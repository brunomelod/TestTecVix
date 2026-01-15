import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Stack,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useZTheme } from "../../../stores/useZTheme";
import { useTranslation } from "react-i18next";
import { IEmployee } from "../../../hooks/useEmployees";

interface IProps {
  open: boolean;
  employee: IEmployee | null;
  onClose: () => void;
  onSave: (data: any) => void;
}

export const EmployeeModal = ({ open, employee, onClose, onSave }: IProps) => {
  const { theme, mode } = useZTheme();
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "member" as "admin" | "manager" | "member",
    isActive: true,
  });

  useEffect(() => {
    if (employee) {
      setFormData({
        username: employee.username,
        email: employee.email,
        password: "",
        role: employee.role,
        isActive: employee.isActive,
      });
    } else {
      setFormData({
        username: "",
        email: "",
        password: "",
        role: "member",
        isActive: true,
      });
    }
  }, [employee, open]);

  const handleSave = () => {
    if (!formData.username || !formData.email) {
      return;
    }

    if (!employee && !formData.password) {
      return;
    }

    const dataToSave: any = {
      username: formData.username,
      email: formData.email,
      role: formData.role,
    };

    if (!employee) {
      dataToSave.password = formData.password;
    }

    if (employee) {
      dataToSave.isActive = formData.isActive;
    }

    onSave(dataToSave);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          backgroundColor: theme[mode].mainBackground,
        },
      }}
    >
      <DialogTitle sx={{ color: theme[mode].primary }}>
        {employee
          ? t("employees.edit") || "Editar Funcionário"
          : t("employees.create") || "Novo Funcionário"}
      </DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField
            label={t("employees.name") || "Nome"}
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
            label={t("employees.email") || "Email"}
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

          {!employee && (
            <TextField
              label={t("employees.password") || "Senha"}
              type="password"
              fullWidth
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
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
          )}

          <TextField
            select
            label={t("employees.role") || "Função"}
            fullWidth
            value={formData.role}
            onChange={(e) =>
              setFormData({
                ...formData,
                role: e.target.value as "admin" | "manager" | "member",
              })
            }
            sx={{
              "& .MuiInputLabel-root": { color: theme[mode].gray },
              "& .MuiOutlinedInput-root": {
                color: theme[mode].primary,
                "& fieldset": { borderColor: theme[mode].grayLight },
              },
            }}
          >
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="manager">Manager</MenuItem>
            <MenuItem value="member">Member</MenuItem>
          </TextField>

          {employee && (
            <FormControlLabel
              control={
                <Switch
                  checked={formData.isActive}
                  onChange={(e) =>
                    setFormData({ ...formData, isActive: e.target.checked })
                  }
                />
              }
              label={t("employees.active") || "Ativo"}
              sx={{ color: theme[mode].primary }}
            />
          )}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} sx={{ color: theme[mode].gray }}>
          {t("generic.cancel") || "Cancelar"}
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          sx={{
            backgroundColor: theme[mode].blue,
            color: theme[mode].btnText,
          }}
        >
          {t("generic.save") || "Salvar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

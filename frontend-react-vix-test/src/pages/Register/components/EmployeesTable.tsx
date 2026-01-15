import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
  Stack,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useZTheme } from "../../../stores/useZTheme";
import { useTranslation } from "react-i18next";
import { IEmployee } from "../../../hooks/useEmployees";

interface IProps {
  employees: IEmployee[];
  onEdit: (employee: IEmployee) => void;
  onDelete: (employee: IEmployee) => void;
}

export const EmployeesTable = ({ employees, onEdit, onDelete }: IProps) => {
  const { theme, mode } = useZTheme();
  const { t } = useTranslation();

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "error";
      case "manager":
        return "warning";
      case "member":
        return "default";
      default:
        return "default";
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case "admin":
        return "Admin";
      case "manager":
        return "Manager";
      case "member":
        return "Member";
      default:
        return role;
    }
  };

  return (
    <TableContainer
      component={Paper}
      sx={{
        backgroundColor: theme[mode].mainBackground,
        boxShadow: "none",
      }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ color: theme[mode].primary, fontWeight: "bold" }}>
              {t("employees.name") || "Nome"}
            </TableCell>
            <TableCell sx={{ color: theme[mode].primary, fontWeight: "bold" }}>
              {t("employees.email") || "Email"}
            </TableCell>
            <TableCell sx={{ color: theme[mode].primary, fontWeight: "bold" }}>
              {t("employees.role") || "Função"}
            </TableCell>
            <TableCell sx={{ color: theme[mode].primary, fontWeight: "bold" }}>
              {t("employees.status") || "Status"}
            </TableCell>
            <TableCell
              sx={{ color: theme[mode].primary, fontWeight: "bold" }}
              align="right"
            >
              {t("employees.actions") || "Ações"}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employees.map((employee) => (
            <TableRow
              key={employee.idUser}
              sx={{
                "&:hover": {
                  backgroundColor: theme[mode].grayLight,
                },
              }}
            >
              <TableCell sx={{ color: theme[mode].primary }}>
                {employee.username}
              </TableCell>
              <TableCell sx={{ color: theme[mode].primary }}>
                {employee.email}
              </TableCell>
              <TableCell>
                <Chip
                  label={getRoleLabel(employee.role)}
                  color={getRoleColor(employee.role)}
                  size="small"
                />
              </TableCell>
              <TableCell>
                <Chip
                  label={employee.isActive ? "Ativo" : "Inativo"}
                  color={employee.isActive ? "success" : "default"}
                  size="small"
                />
              </TableCell>
              <TableCell align="right">
                <Stack direction="row" spacing={1} justifyContent="flex-end">
                  <IconButton
                    size="small"
                    onClick={() => onEdit(employee)}
                    sx={{ color: theme[mode].blue }}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => onDelete(employee)}
                    sx={{ color: theme[mode].danger }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

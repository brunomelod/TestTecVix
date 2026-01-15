import { ScreenFullPage } from "../../components/ScreenFullPage";
import { TextRob20Font1MB } from "../../components/Text1MB";
import { useZTheme } from "../../stores/useZTheme";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import {
  Stack,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { EmployeesTable } from "./components/EmployeesTable";
import { EmployeeModal } from "./components/EmployeeModal";
import { useEmployees, IEmployee } from "../../hooks/useEmployees";
import { AbsoluteBackDrop } from "../../components/AbsoluteBackDrop";
import CustomPagination from "../../components/Pagination/CustomPagination";

export const EmployeesPage = () => {
  const { theme, mode } = useZTheme();
  const { t } = useTranslation();
  const {
    listEmployees,
    createEmployee,
    updateEmployee,
    deleteEmployee,
    isLoading,
  } = useEmployees();

  const [employees, setEmployees] = useState<IEmployee[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<IEmployee | null>(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState<IEmployee | null>(null);

  const limit = 10;

  const fetchEmployees = async (page = 0) => {
    const result = await listEmployees({
      page,
      limit,
      search,
    });
    setEmployees(result.result);
    setTotalCount(result.totalCount);
  };

  useEffect(() => {
    fetchEmployees(currentPage - 1);
  }, [currentPage, search]);

  const handleSearch = () => {
    setSearch(searchValue);
    setCurrentPage(1);
  };

  const handleOpenModal = (employee: IEmployee | null = null) => {
    setSelectedEmployee(employee);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedEmployee(null);
  };

  const handleSaveEmployee = async (data: any) => {
    if (selectedEmployee) {
      await updateEmployee(selectedEmployee.idUser, data);
    } else {
      await createEmployee(data);
    }
    handleCloseModal();
    fetchEmployees(currentPage - 1);
  };

  const handleDeleteClick = (employee: IEmployee) => {
    setEmployeeToDelete(employee);
    setDeleteConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (employeeToDelete) {
      const success = await deleteEmployee(employeeToDelete.idUser);
      if (success) {
        fetchEmployees(currentPage - 1);
      }
    }
    setDeleteConfirmOpen(false);
    setEmployeeToDelete(null);
  };

  return (
    <ScreenFullPage
      title={
        <TextRob20Font1MB
          sx={{
            color: theme[mode].primary,
            fontSize: "28px",
            fontWeight: "500",
            lineHeight: "40px",
          }}
        >
          {t("sidebar.colaboratorRegister")}
        </TextRob20Font1MB>
      }
      sxTitleSubTitle={{
        paddingLeft: "40px",
        paddingRight: "40px",
      }}
      sxContainer={{
        paddingLeft: "40px",
        paddingRight: "40px",
        paddingBottom: "40px",
      }}
    >
      {isLoading && <AbsoluteBackDrop open={isLoading} />}
      
      <Stack spacing={3}>
        {/* Header com busca e botão adicionar */}
        <Stack
          direction="row"
          spacing={2}
          sx={{
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Stack direction="row" spacing={1} sx={{ flex: 1, maxWidth: "400px" }}>
            <TextField
              size="small"
              placeholder={t("employees.search") || "Buscar funcionário..."}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              sx={{
                flex: 1,
                "& .MuiInputLabel-root": { color: theme[mode].gray },
                "& .MuiOutlinedInput-root": {
                  color: theme[mode].primary,
                  "& fieldset": { borderColor: theme[mode].grayLight },
                },
              }}
            />
            <Button
              variant="outlined"
              onClick={handleSearch}
              sx={{
                borderColor: theme[mode].blue,
                color: theme[mode].blue,
              }}
            >
              {t("generic.search") || "Buscar"}
            </Button>
          </Stack>

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenModal(null)}
            sx={{
              backgroundColor: theme[mode].blue,
              color: theme[mode].btnText,
            }}
          >
            {t("employees.addNew") || "Novo Funcionário"}
          </Button>
        </Stack>

        {/* Tabela */}
        <EmployeesTable
          employees={employees}
          onEdit={handleOpenModal}
          onDelete={handleDeleteClick}
        />

        {/* Paginação */}
        <CustomPagination
          currentPage={currentPage}
          totalPages={totalCount}
          onPageChange={setCurrentPage}
          limit={limit}
        />
      </Stack>

      {/* Modal de Cadastro/Edição */}
      <EmployeeModal
        open={modalOpen}
        employee={selectedEmployee}
        onClose={handleCloseModal}
        onSave={handleSaveEmployee}
      />

      {/* Modal de Confirmação de Delete */}
      <Dialog
        open={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        PaperProps={{
          sx: { backgroundColor: theme[mode].mainBackground },
        }}
      >
        <DialogTitle sx={{ color: theme[mode].primary }}>
          {t("employees.confirmDelete") || "Confirmar Exclusão"}
        </DialogTitle>
        <DialogContent sx={{ color: theme[mode].primary }}>
          {t("employees.confirmDeleteMessage") ||
            `Deseja realmente deletar o funcionário ${employeeToDelete?.username}?`}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setDeleteConfirmOpen(false)}
            sx={{ color: theme[mode].gray }}
          >
            {t("generic.cancel") || "Cancelar"}
          </Button>
          <Button
            onClick={handleConfirmDelete}
            variant="contained"
            sx={{
              backgroundColor: theme[mode].danger,
              color: theme[mode].btnText,
            }}
          >
            {t("generic.delete") || "Deletar"}
          </Button>
        </DialogActions>
      </Dialog>
    </ScreenFullPage>
  );
};

import { PrivatePage } from "../auth/PrivatePage";
import { EmployeesPage } from "../pages/Register/EmployeesPage";

export const EmployeesRouter = {
  path: "/employees",
  element: (
    <PrivatePage onlyManagerOrAdmin>
      <EmployeesPage />
    </PrivatePage>
  ),
};

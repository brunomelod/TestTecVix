import { DefaultRouter } from "./DefaultRouter";
import { HomeRouter } from "./HomeRoute";
import { MyVMsRouter } from "./MyVMsRouter";
import { VirtualMachineRouter } from "./VirtualMachineRouter";
import { MSPRegisterRouter } from "./MSPRegisterRouter";
import { RegisterRouter } from "./RegisterRouter";
import { LoginRouter } from "./LoginRouter";
import { WhiteLabelRouter } from "./WhiteLabelRouter";
import { EmployeesRouter } from "./EmployeesRouter";
import { SettingsRouter } from "./SettingsRouter";

export const mainRoutes = [
  DefaultRouter,
  HomeRouter,
  LoginRouter,
  RegisterRouter,
  VirtualMachineRouter,
  MyVMsRouter,
  MSPRegisterRouter,
  EmployeesRouter,
  WhiteLabelRouter,
  SettingsRouter,
];

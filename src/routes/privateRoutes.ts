import { AboutPage } from "../pages/about";
import { DashboardPage } from "../pages/dashboard";
import { Monitoring } from "../pages/monitoring";
import { MonitoringList } from "../pages/monitoring/list";
import { PatientsList, PatientsForm } from "../pages/patients";
import { SettingsPage } from "../pages/settings";

const privateRoutes = [
  {
    path: "/dashboard",
    Component: DashboardPage,
    label: "Дешборд",
    children: [],
    isMenu: true,
  },
  {
    path: "/patients",
    Component: PatientsList,
    label: "Пациенты",
    isMenu: true,
  },
  {
    path: "/patients/:id",
    Component: PatientsForm,
    label: "Пациенты",
    isMenu: false,
  },
  {
    path: "/monitoring",
    Component: MonitoringList,
    label: "Мониторинг",
    isMenu: true,
  },
  {
    path: "/monitoring/:id",
    Component: Monitoring,
    label: "Мониторинг",
    isMenu: false,
  },
  {
    path: "/settings",
    Component: SettingsPage,
    label: "Настройки",
    isMenu: true,
  },
  {
    path: "/about",
    label: "О нас",
    Component: AboutPage,
    isMenu: true,
  },
];

export default privateRoutes;
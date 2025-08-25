import { AboutPage } from "../pages/about";
import { MainPage } from "../pages/main";
import { Monitoring } from "../pages/monitoring";

const privateRoutes = [
  {
    path: "/",
    Component: MainPage,
    label: "Главная",
    children: [],
  },
  {
    path: "/monitoring",
    Component: Monitoring,
    label: "Мониторинг",
  },
  {
    path: "/about",
    label: "О нас",
    Component: AboutPage,
  },
];

export default privateRoutes;
import { createBrowserRouter, type RouteObject } from "react-router";
import { AuthPage } from "../pages/auth";
import ProtectedRoute from "./ProtectedRoute";
import Layout from "../components/layout/Layout";
import privateRoutes from "./privateRoutes";
import { DashboardPage } from "../pages/dashboard";

const publicRoutes: RouteObject[] = [
  {
    path: "/auth",
    Component: AuthPage,
  },
];

const router = createBrowserRouter([
  {
    Component: Layout,
    children: [
      ...publicRoutes,
      {
        Component: ProtectedRoute,
        children: privateRoutes,
      },
      {
        path: "*",
        Component: DashboardPage,
      },
    ],
  },
]);

export const links = privateRoutes.map((el) => ({
  key: el.path,
  path: el.path,
}));

export default router;

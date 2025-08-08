import { createBrowserRouter, type RouteObject } from "react-router";
import { AuthPage } from "../pages/auth";
import ProtectedRoute from "./ProtectedRoute";
import Layout from "../components/Layout";
import { MainPage } from "../pages/main";

const publicRoutes: RouteObject[] = [
  {
    path: "/auth",
    Component: AuthPage,
  },
];

const privateRoutes: RouteObject[] = [
  {
    path: "/",
    Component: MainPage,
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
        Component: ProtectedRoute,
      },
    ],
  },
]);

export default router;

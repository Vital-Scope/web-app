import { createBrowserRouter, type RouteObject } from "react-router";
import App from "../App";
import { AuthPage } from "../pages/auth";
import ProtectedRoute from "./ProtectedRoute";
import Layout from "../components/Layout";

const publicRoutes: RouteObject[] = [
  {
    path: "/auth",
    Component: AuthPage,
  },
];

const privateRoutes: RouteObject[] = [
  {
    path: "/",
    Component: App,
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

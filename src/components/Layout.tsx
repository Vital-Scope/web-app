import { Outlet } from "react-router";

const Layout = () => (
  <div className="h-dvh relative bg-slate-600">
    <Outlet />
  </div>
);

export default Layout;

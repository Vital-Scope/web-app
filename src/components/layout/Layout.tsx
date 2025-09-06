import { Outlet } from "react-router-dom";
import styles from "./layout.module.scss";
import { MenuBar } from "../menu";
import clsx from "clsx";

const Layout = () => (
  <div className={clsx(styles.background)}>
    <nav className="fixed top-1 left-1/2 z-40 -translate-x-1/2">
      <MenuBar />
    </nav>
    {new Array(12).fill(0).map((_, idx) => (
      <span key={idx} className="absolute"></span>
    ))}
    <div className="h-[calc(100vh-60px)] mt-[60px] overflow-y-auto px-10 pb-14 font-sans text-rose-300 overflow-auto">
      <Outlet />
    </div>
  </div>
);

export default Layout;

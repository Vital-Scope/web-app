import { Outlet } from "react-router-dom";
import styles from "./layout.module.scss";
import { MenuBar } from "../menu";

const Layout = () => (
  <div className={styles.background}>
    <nav className="fixed left-1/2 w-md -translate-x-1/2  z-40">
      <MenuBar />
    </nav>
    {new Array(12).fill(0).map(() => <span></span>)}
    <div className="py-14 px-10 overflow-y-auto text-rose-300 font-sans">
      <Outlet />
    </div>
  </div>
);

export default Layout;

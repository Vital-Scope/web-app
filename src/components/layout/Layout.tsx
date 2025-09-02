import { Outlet } from "react-router-dom";
import styles from "./layout.module.scss";
import { MenuBar } from "../menu";

const Layout = () => (
  <div className={styles.background}>
    <nav className="fixed left-1/2 w-md -translate-x-1/2">
      <MenuBar />
    </nav>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <div className="pt-12 px-10 overflow-hidden overflow-y-scroll text-rose-300">
      <Outlet />
    </div>
  </div>
);

export default Layout;

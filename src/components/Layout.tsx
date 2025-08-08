import { Outlet } from "react-router";
import styles from "./layout.module.scss";

const Layout = () => (
  <div className={styles.background}>
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
    <Outlet />
  </div>
);

export default Layout;

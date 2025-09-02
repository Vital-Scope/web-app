import { Menu } from "antd";
import "./menuBar.module.scss";
import privateRoutes from "../../routes/privateRoutes";
import { useCallback } from "react";
import { useNavigate } from "react-router";

const menuItems = privateRoutes
  .filter((route) => route.isMenu)
  .map((route) => ({
    key: route.path,
    path: route.path,
    label: route.label,
  }));

const MenuBar: React.FC = () => {
  const navigate = useNavigate();
  const onSelectHandler = useCallback((info: any) => {
    navigate(info.key);
  }, []);

  return (
    <Menu
      mode="horizontal"
      theme="dark"
      className="rounded-xl !bg-black/30 select-none w-max"
      onSelect={onSelectHandler}
      items={menuItems}
    />
  );
};

export default MenuBar;

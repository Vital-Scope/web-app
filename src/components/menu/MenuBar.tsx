import { Menu } from "antd";
import "./menuBar.module.scss";
import privateRoutes from "../../routes/privateRoutes";
import { useCallback } from "react";
import { useNavigate, useLocation } from "react-router";

const menuItems = privateRoutes
  .filter((route) => route.isMenu)
  .map((route) => ({
    key: route.path,
    path: route.path,
    label: route.label,
  }));

const MenuBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const onSelectHandler = useCallback((info: any) => {
    navigate(info.key);
  }, [navigate]);

  return (
    <Menu
      mode="horizontal"
      theme="dark"
      className="rounded-xl !bg-black/30 select-non w-xl select-none"
      onSelect={onSelectHandler}
      items={menuItems}
      selectedKeys={[location.pathname]}
    />
  );
};

export default MenuBar;

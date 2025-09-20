
import { Menu } from "antd";
import {
  DashboardOutlined,
  UsergroupAddOutlined,
  LineChartOutlined,
  SettingOutlined,
  InfoCircleOutlined
} from "@ant-design/icons";
import "./menuBar.module.scss";
import privateRoutes from "../../../routes/privateRoutes";
import { useCallback } from "react";
import { useNavigate, useLocation } from "react-router";


const iconMap: Record<string, React.ReactNode> = {
  "/dashboard": <DashboardOutlined />,
  "/patients": <UsergroupAddOutlined />,
  "/monitoring": <LineChartOutlined />,
  "/settings": <SettingOutlined />,
  "/about": <InfoCircleOutlined />,
};

const menuItems = privateRoutes
  .filter((route) => route.isMenu)
  .map((route) => ({
    key: route.path,
    path: route.path,
    label: route.label,
    icon: iconMap[route.path] || null,
  }));


const MenuBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const onSelectHandler = useCallback((info: any) => {
    navigate(info.key);
  }, [navigate]);

  // Подсвечивать вкладку "Пациенты" для всех роутов, начинающихся с /patients
  const getSelectedKey = () => {
    if (location.pathname.startsWith("/patients")) return "/patients";
    if (location.pathname.startsWith("/dashboard")) return "/dashboard";
    if (location.pathname.startsWith("/monitoring")) return "/monitoring";
    if (location.pathname.startsWith("/settings")) return "/settings";
    if (location.pathname.startsWith("/about")) return "/about";
    return location.pathname;
  };

  return (
    <aside className="w-[220px] min-w-[220px] bg-[#F9FAFB] pt-6 flex flex-col items-start z-10 border-r border-[#E5E7EB]">
      <nav className="w-full">
        <Menu
          mode="vertical"
          theme="light"
          className="rounded-xl bg-[#FFFFFF] select-none w-full border border-[#E5E7EB]"
          onSelect={onSelectHandler}
          items={menuItems}
          selectedKeys={[getSelectedKey()]}
        />
      </nav>
    </aside>
  );
};

export default MenuBar;

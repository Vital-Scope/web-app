

import { Outlet } from "react-router-dom";
import { Header } from "./header";
import { MenuBar } from "./menu";


const Layout = () => (
  <div className="fixed inset-0 w-screen h-screen bg-[#F9FAFB] flex flex-col">
    <Header />
    <div className="flex flex-1 flex-row h-[calc(100vh-60px)] z-0">
      <MenuBar />
  <main className="flex-1 p-8 md:p-10 overflow-y-auto text-[#1F2937] font-sans z-0">
        <Outlet />
      </main>
    </div>
  </div>
);

export default Layout;

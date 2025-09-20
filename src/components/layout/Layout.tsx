import { Header } from "./header";
import { MenuBar } from "./menu";
import { MainContent } from "./mainContent";

const Layout = () => (
  <div className="fixed inset-0 flex h-screen w-screen flex-col bg-[#F9FAFB]">
    <Header />
    <div className="z-0 flex h-[calc(100vh-60px)] flex-1 flex-row">
      <MenuBar />
      <MainContent />
    </div>
  </div>
);

export default Layout;

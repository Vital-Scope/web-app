import { Outlet } from "react-router-dom";
import styles from "./MainContent.module.scss";

function clsx(...args: (string | false | undefined)[]) {
  return args.filter(Boolean).join(" ");
}

const MainContent = () => {
  return (
    <main className="z-0 flex flex-1 justify-center overflow-y-auto bg-[#F3F4F6] p-4 font-sans text-[#1F2937]">
      <div
        className={clsx(
          "max-w-8xl min-h-[calc(100vh-110px)] w-full min-w-[320px] overflow-x-auto rounded-2xl border border-[#F1F5F9] bg-white px-6 py-7 shadow-xl transition-shadow duration-300",
          styles["custom-scroll"],
        )}
        data-scroll-active={true}
      >
        <Outlet />
      </div>
    </main>
  );
};

export default MainContent;

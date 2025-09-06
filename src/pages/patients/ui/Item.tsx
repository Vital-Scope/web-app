import { UserOutlined } from "@ant-design/icons";
import clsx from "clsx";
import styles from "../styles.module.scss";

const DashboardItem = () => {
  const a = 10;

  return (
    <div
      className={clsx(
        "cursor-pointer items-center rounded-xl border border-[#B8C1EC]/40 bg-[#232946]/70 p-3 text-white drop-shadow-2xl backdrop-blur-md transition-all hover:bg-[#3A86FF]/20 hover:shadow-[0_0_16px_#E9456080]",
        styles.animation,
      )}
    >
      <div className="mr-3 flex flex-col items-center justify-center text-[50px]">
        <UserOutlined />
        <div className="mt-2 flex flex-col items-center text-[16px]">
          <div className="flex items-center gap-2">
            <span className="font-semibold">Иванова</span>
            <span>Мария</span>
          </div>
          <span className="ml-1 rounded-full border border-[#3A86FF]/30 bg-[#3A86FF]/20 px-2 py-0.5 text-xs font-semibold text-[#3A86FF] shadow-sm">
            32&nbsp;года
          </span>
        </div>
      </div>
      <div>
        <p className="overflow-hidden">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro ab
          commodi, minima molestias at quibusdam sed expedita voluptatibus
          corporis quo animi quisquam deserunt ex accusamus esse hic odit ut
          voluptates.
        </p>
      </div>
    </div>
  );
};

export default DashboardItem;

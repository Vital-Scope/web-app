import { UserOutlined } from "@ant-design/icons";
import clsx from "clsx";
import styles from "../styles.module.scss";

const DashboardItem = () => {


  return (
    <div
      className={clsx(
        "cursor-pointer items-center rounded-xl border border-[#E3E8F0] bg-white p-3 text-[#232946] shadow-[0_4px_24px_0_#E3E8F0] transition-all hover:bg-[#F0F4FF] hover:shadow-[0_0_16px_#3A86FF33]",
        styles.animation,
      )}
    >
      <div className="mr-3 flex flex-col items-center justify-center text-[50px] text-[#3A86FF]">
        <UserOutlined />
        <div className="mt-2 flex flex-col items-center text-[16px]">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[#2F70AF]">Иванова</span>
            <span>Мария</span>
          </div>
          <span className="ml-1 rounded-full border border-[#3A86FF]/30 bg-[#E6F4FF] px-2 py-0.5 text-xs font-semibold text-[#3A86FF] shadow-sm">
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

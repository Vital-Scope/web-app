import { UserOutlined } from "@ant-design/icons";
import clsx from "clsx";
import styles from "../styles.module.scss";

const DashboardItem = () => {
  const a = 10;

  return (
    <div
      className={clsx(
        "grid cursor-pointer grid-cols-[1fr_3fr] items-center rounded-md bg-gray-700/50 p-2 text-rose-100 outline-1 outline-rose-200/50 drop-shadow-2xl transition-all",
        styles.animation,
      )}
    >
      <div className="mr-3 flex h-2/3 flex-col items-center justify-center text-[50px]">
        <UserOutlined />
        <div className="mt-2 text-center text-[16px]">
          <p>Иванова</p>
          <p>Мария</p>
        </div>
      </div>
      <div className="flex flex-col">
        <p>
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

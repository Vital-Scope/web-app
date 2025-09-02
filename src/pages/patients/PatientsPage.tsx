import {Table} from "antd";
import type { DataType } from "./ui/table/columns";
import columns from "./ui/table/columns";
import { data } from "./ui/Table";
import cx from "clsx";
import styles from "./styles.module.scss";

const PatientsPage = () => {
  return (
    <div className="p-4 bg-gray-700">
      <Table<DataType>
        columns={columns}
        dataSource={data}
        onChange={() => console.log("asd")}
        showSorterTooltip={{ target: "sorter-icon" }}
        pagination={false}
        className={styles.table}
      />
    </div>
  );
};

export default PatientsPage;

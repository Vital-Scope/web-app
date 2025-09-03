import { Input, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import DashboardItem from "./ui/Item";
import type { DefaultOptionType } from "antd/es/select";
import { useState } from "react";

const filters = ["lastName", "firstName", "createdAt"] as const;
type filtersType = (typeof filters)[number];

const options: DefaultOptionType[] = [
  {
    label: "Фамилия",
    value: "lastname",
  },
  {
    label: "Имя",
    value: "firstName",
  },
  {
    label: "По дате добавления",
    value: "createdAt",
  },
];

const PatientsPage = () => {
  const [filter, setFilter] = useState<filtersType>("lastName");
  return (
    <div>
      <div className="flex items-center justify-between">
        <Select
          size="middle"
          className="w-40"
          options={options}
          onChange={(val) => setFilter(val)}
          variant="outlined"
        />
        <div className="w-1/2 text-white relative">
          <SearchOutlined className="absolute top-[5px] left-1"/>
          <input
            type="text"
            placeholder="Поиск..."
            className="w-full focus:outline-2 outline-rose-200/50 rounded-md pl-6 pr-2"
          />
        </div>
      </div>
      <div className="mt-2 mb-4 border-b-2 border-rose-200/50" />
      <div className="grid grid-cols-4 gap-6 md:grid-cols-3">
        {new Array(20).fill(0).map(() => (
          <DashboardItem />
        ))}
      </div>
    </div>
  );
};

export default PatientsPage;

import { Button, Input, Modal, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import DashboardItem from "./ui/Item";
import type { DefaultOptionType } from "antd/es/select";
import { useState } from "react";
import ModalForm from "./ui/ModalForm";

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
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="relative">
      <div className="flex items-center justify-between">
        <Select
          size="middle"
          className="w-40"
          options={options}
          onChange={(val) => setFilter(val)}
          variant="outlined"
        />
        <div className="relative w-1/2 text-white">
          <SearchOutlined className="absolute top-[5px] left-1" />
          <input
            type="text"
            placeholder="Поиск..."
            className="w-full rounded-md pr-2 pl-6 outline-rose-200/50 focus:outline-2"
          />
        </div>
      </div>
      <div className="mt-2 mb-4 border-b-2 border-rose-200/50" />
      <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4">
        {new Array(20).fill(0).map(() => (
          <DashboardItem />
        ))}
      </div>
      <ModalForm isOpen={isModalOpen} onClose={closeModal} />
      <button
        onClick={openModal}
        className="bg-white-500/20 fixed right-10 bottom-5 h-10 w-24 rounded-md border-1 text-white transition-all hover:animate-pulse hover:cursor-pointer hover:text-white"
      >
        Добавить
      </button>
    </div>
  );
};

export default PatientsPage;

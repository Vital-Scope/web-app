import React from "react";
import { useQuery } from "@tanstack/react-query";
import MonitoringCard from "./ui/MonitoringCard";
import { Link, useNavigate } from "react-router-dom";
import { SearchInput, SortSelect } from "../../../components/ui";
import { Button } from "../../../components/button";
import { Modal } from "antd";
import PatientSelect from "./ui/modal/PatientSelect";
import { createMonitoring, getMonitorings, type MonitoringListItem } from "../../../service/monitoring/api";

const sortOptions = [
  { value: "lastName", label: "По фамилии" },
  { value: "dateStart", label: "По дате начала" },
  { value: "result", label: "По результату" },
  { value: "status", label: "По статусу" },
];

function sortData(data: MonitoringListItem[], sortBy: string) {
  const sorted = [...data];
  switch (sortBy) {
    case "lastName":
      // Сортируем по фамилии из fullName
      sorted.sort((a, b) => {
        const aName = a.fullName || "";
        const bName = b.fullName || "";
        return aName.localeCompare(bName, "ru");
      });
      break;
    case "dateStart":
      // Сортируем по дате начала (новые сверху)
      sorted.sort((a, b) => {
        const aDate = a.dateStart || 0;
        const bDate = b.dateStart || 0;
        return bDate - aDate;
      });
      break;
    case "result":
      // Сортируем по результату: Regular -> Risk -> Hypoxia
      sorted.sort((a, b) => {
        const resultOrder = { "Regular": 0, "Risk": 1, "Hypoxia": 2 };
        const aOrder = resultOrder[a.result as keyof typeof resultOrder] ?? 3;
        const bOrder = resultOrder[b.result as keyof typeof resultOrder] ?? 3;
        return aOrder - bOrder;
      });
      break;
    case "status":
      // Сортируем по статусу: Active -> Completed
      sorted.sort((a, b) => {
        const statusOrder = { "Active": 0, "Completed": 1 };
        const aOrder = statusOrder[a.status as keyof typeof statusOrder] ?? 2;
        const bOrder = statusOrder[b.status as keyof typeof statusOrder] ?? 2;
        return aOrder - bOrder;
      });
      break;
    default:
      break;
  }
  return sorted;
}

const MonitoringList = () => {
  const redirect = useNavigate();
  const [sortBy, setSortBy] = React.useState("lastName");
  const [search, setSearch] = React.useState("");
  const [modal, contextHolder] = Modal.useModal();
  const { data = [] } = useQuery({
    queryKey: ["monitorings"],
    queryFn: getMonitorings,
  });

  const filtered = data.filter((item: MonitoringListItem) =>
    (item.fullName || "")
      .toLowerCase()
      .includes(search.trim().toLowerCase()),
  );
  const sorted: MonitoringListItem[] = sortData(filtered, sortBy);

  const handleCreateClick = () => {
    const close = () => Modal.destroyAll();
    modal.info({
      title: "Привязать пациента",
      content: (
        <PatientSelect
          onSelect={async (id) => {
            if (id) {
              const monitoring = await createMonitoring(id);
              if (monitoring) {
                redirect(`/monitoring/${monitoring.id}`);
                close();
              }
            }
          }}
        />
      ),
      icon: null,
      footer: null,
      closable: true,
      maskClosable: true,
      onCancel: close,
      width: 1000,
    });
  };
  return (
    <div className="max-w-8xl relative mx-auto w-full">
      {contextHolder}
      <div className="mb-8 flex w-full flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Поиск по фамилии..."
        />
        <SortSelect value={sortBy} onChange={setSortBy} options={sortOptions} />
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {sorted.map((item, idx: number) => (
          <Link
            to={`/monitoring/${item.id}`}
            key={item.id || idx}
            className="transition-transform duration-100 hover:scale-[1.02]"
            style={{ textDecoration: "none" }}
          >
            <MonitoringCard {...item} />
          </Link>
        ))}
      </div>
      <Button onClick={handleCreateClick} text="Создать" />
    </div>
  );
};

export default MonitoringList;

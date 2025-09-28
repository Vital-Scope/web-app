import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getMonitorings } from "./api";
import MonitoringCard from "./ui/MonitoringCard";
import { SearchInput, SortSelect } from "../../components/ui";
import { Button } from "../../components/button";
import { Modal } from "antd";
import PatientSelect from "./ui/modal/PatientSelect";

const sortOptions = [
  { value: "lastName", label: "По фамилии" },
  { value: "firstName", label: "По имени" },
  { value: "date", label: "По дате" },
  { value: "status", label: "По готовности" },
];

function sortData(data: any[], sortBy: string) {
  const sorted = [...data];
  switch (sortBy) {
    case "lastName":
      sorted.sort((a, b) =>
        (a.lastName || "").localeCompare(b.lastName || "", "ru"),
      );
      break;
    case "firstName":
      sorted.sort((a, b) =>
        (a.firstName || "").localeCompare(b.firstName || "", "ru"),
      );
      break;
    case "date":
      sorted.sort((a, b) => (b.date || "").localeCompare(a.date || ""));
      break;
    case "status":
      sorted.sort((a, b) =>
        a.status === b.status ? 0 : a.status === "ready" ? -1 : 1,
      );
      break;
    default:
      break;
  }
  return sorted;
}

const MonitoringList = () => {
  const [sortBy, setSortBy] = React.useState("date");
  const [search, setSearch] = React.useState("");
  const { data = [] } = useQuery({
    queryKey: ["monitorings"],
    queryFn: getMonitorings,
  });
  const filtered = data.filter((item: any) =>
    (item.patient?.lastName || "")
      .toLowerCase()
      .includes(search.trim().toLowerCase()),
  );
  const sorted = sortData(filtered, sortBy);
  const [modal, contextHolder] = Modal.useModal();

  const handleCreateClick = () => {
  const close = () => Modal.destroyAll();
    modal.info({
      title: "Привязать пациента",
      content: <PatientSelect onSelect={(id) => {
        if (id) {
          // Здесь можно вызвать createMonitoring(id) или другую логику
          close();
        }
      }} />,
      icon: null,
      footer: null,
      closable: true,
      maskClosable: true,
      width: 800,
      onCancel: close,
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
        {sorted.map((item: any, idx: number) => (
          <MonitoringCard key={item.id || idx} {...item} />
        ))}
      </div>
      <Button onClick={handleCreateClick} text="Создать" />
    </div>
  );
};

export default MonitoringList;

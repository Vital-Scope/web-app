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
  const redirect = useNavigate();
  const [sortBy, setSortBy] = React.useState("date");
  const [search, setSearch] = React.useState("");
  const [modal, contextHolder] = Modal.useModal();
  const { data = [] } = useQuery({
    queryKey: ["monitorings"],
    queryFn: getMonitorings,
  });

  const filtered = data.filter((item: any) =>
    (item.patient?.lastName || "")
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

import React from "react";
import MonitoringCard from "./ui/MonitoringCard";
import { SearchInput, SortSelect } from "../../components/ui";

const initialData: Array<{
  firstName: string;
  lastName: string;
  date: string;
  status: "ready" | "not_ready";
}> = [
  { firstName: "Анна", lastName: "Иванова", date: "06.09.2025", status: "ready" },
  { firstName: "Мария", lastName: "Петрова", date: "05.09.2025", status: "not_ready" },
  { firstName: "Екатерина", lastName: "Смирнова", date: "04.09.2025", status: "ready" },
  { firstName: "Ольга", lastName: "Кузнецова", date: "03.09.2025", status: "not_ready" },
  { firstName: "Наталья", lastName: "Попова", date: "02.09.2025", status: "ready" },
  { firstName: "Светлана", lastName: "Васильева", date: "01.09.2025", status: "not_ready" },
  { firstName: "Татьяна", lastName: "Морозова", date: "31.08.2025", status: "ready" },
  { firstName: "Елена", lastName: "Новикова", date: "30.08.2025", status: "not_ready" },
  { firstName: "Виктория", lastName: "Федорова", date: "29.08.2025", status: "ready" },
  { firstName: "Анастасия", lastName: "Соколова", date: "28.08.2025", status: "not_ready" },
  { firstName: "Дарья", lastName: "Михайлова", date: "27.08.2025", status: "ready" },
  { firstName: "Юлия", lastName: "Беляева", date: "26.08.2025", status: "not_ready" },
];

const sortOptions = [
  { value: "lastName", label: "По фамилии" },
  { value: "firstName", label: "По имени" },
  { value: "date", label: "По дате" },
  { value: "status", label: "По готовности" },
];

function sortData(data: typeof initialData, sortBy: string) {
  const sorted = [...data];
  switch (sortBy) {
    case "lastName":
      sorted.sort((a, b) => a.lastName.localeCompare(b.lastName, "ru"));
      break;
    case "firstName":
      sorted.sort((a, b) => a.firstName.localeCompare(b.firstName, "ru"));
      break;
    case "date":
      sorted.sort((a, b) => b.date.localeCompare(a.date));
      break;
    case "status":
      sorted.sort((a, b) => (a.status === b.status ? 0 : a.status === "ready" ? -1 : 1));
      break;
    default:
      break;
  }
  return sorted;
}

const MonitoringList = () => {
  const [sortBy, setSortBy] = React.useState("date");
  const [search, setSearch] = React.useState("");
  const filtered = initialData.filter(item =>
    item.lastName.toLowerCase().includes(search.trim().toLowerCase())
  );
  const data = sortData(filtered, sortBy);

  return (
    <div className="w-full max-w-6xl mx-auto py-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 w-full">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Поиск по фамилии..."
        />
        <SortSelect
          value={sortBy}
          onChange={setSortBy}
          options={sortOptions}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.map((item, idx) => (
          <MonitoringCard key={idx} {...item} />
        ))}
      </div>
    </div>
  );
};

export default MonitoringList;

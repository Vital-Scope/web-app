import { Button } from "../../../components/button";
import { SearchInput, SortSelect } from "../../../components/ui";
import DashboardItem from "./ui/Item";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const sortOptions = [
  { value: "lastName", label: "По фамилии" },
  { value: "firstName", label: "По имени" },
  { value: "createdAt", label: "По дате добавления" },
];

const PatientsListPage = () => {
  const [sortBy, setSortBy] = useState("lastName");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleCreateClick = () => {
    navigate("/patients/create");
  };

  return (
    <div className="relative">
      <div className="mb-8 flex w-full flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Поиск по фамилии..."
        />
        <SortSelect value={sortBy} onChange={setSortBy} options={sortOptions} />
      </div>
      <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4">
        {new Array(20).fill(0).map((_, idx) => (
          <DashboardItem key={idx} />
        ))}
      </div>
      <Button onClick={handleCreateClick} />
    </div>
  );
};

export default PatientsListPage;

import { useQuery } from "@tanstack/react-query";
import { Button } from "../../../components/button";
import { SearchInput, SortSelect } from "../../../components/ui";
import DashboardItem from "./ui/Item";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPatients } from "./service";

const sortOptions = [
  { value: "lastName", label: "По фамилии" },
  { value: "firstName", label: "По имени" },
  { value: "birthday", label: "По возрасту" },
];

const PatientsListPage = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["patients"],
    queryFn: getPatients,
  });
  const [sortBy, setSortBy] = useState("lastName");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleCreateClick = () => {
    navigate("/patients/create");
  };

  const filteredData = (data || []).filter((patient) =>
    patient.lastName.toLowerCase().includes(search.toLowerCase())
  );

  const sortedData = [...filteredData].sort((a, b) => {
    if (sortBy === "lastName") {
      return a.lastName.localeCompare(b.lastName);
    }
    if (sortBy === "firstName") {
      return a.firstName.localeCompare(b.firstName);
    }
    if (sortBy === "birthday") {
      const ageA = new Date().getFullYear() - new Date(a.birthDate).getFullYear();
      const ageB = new Date().getFullYear() - new Date(b.birthDate).getFullYear();
      return ageB - ageA;
    }
    return 0;
  });

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
      <div className="grid gap-6 md:grid-cols-3 2xl:grid-cols-4">
        {sortedData.map((patient) => (
          <DashboardItem
            key={patient.id}
            id={patient.id}
            firstName={patient.firstName}
            lastName={patient.lastName}
            age={
              new Date().getFullYear() -
              new Date(patient.birthDate).getFullYear()
            }
            pregnancyWeek={patient.pregnancyWeek || 0}
            anamnesis={patient.anamnesis}
          />
        ))}
      </div>
      <Button onClick={handleCreateClick} />
    </div>
  );
};

export default PatientsListPage;

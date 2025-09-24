import { useQuery } from "@tanstack/react-query";
import { Button } from "../../../components/button";
import { SearchInput, SortSelect } from "../../../components/ui";
import DashboardItem from "./ui/Item";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getPatients } from "./service";

const sortOptions = [
  { value: "lastName", label: "По фамилии" },
  { value: "firstName", label: "По имени" },
  { value: "createdAt", label: "По дате добавления" },
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
  console.log(data);
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
        {data?.map((patient) => (
          <DashboardItem
            key={patient.id}
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

import { useQuery } from "@tanstack/react-query";
import { Button } from "../../../components/button";
import { SearchInput, SortSelect } from "../../../components/ui";
import DashboardItem from "./ui/Item";
import { useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { getPatients } from "../../../service/patients";

type SortOption = "lastName" | "firstName" | "birthday";

interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  birthDate: number;
  pregnancyWeek: number | null;
  anamnesis: string;
  avatar: string | null;
}

const SORT_OPTIONS = [
  { value: "lastName" as const, label: "По фамилии" },
  { value: "firstName" as const, label: "По имени" },
  { value: "birthday" as const, label: "По возрасту" },
];

const calculateAge = (birthDate: number): number => {
  return new Date().getFullYear() - new Date(birthDate * 1000).getFullYear();
};

const filterPatients = (patients: Patient[], searchTerm: string): Patient[] => {
  if (!searchTerm.trim()) return patients;
  
  const lowercaseSearch = searchTerm.toLowerCase();
  return patients.filter((patient) =>
    patient.lastName.toLowerCase().includes(lowercaseSearch) ||
    patient.firstName.toLowerCase().includes(lowercaseSearch)
  );
};

const sortPatients = (patients: Patient[], sortBy: SortOption): Patient[] => {
  return [...patients].sort((a, b) => {
    switch (sortBy) {
      case "lastName":
        return a.lastName.localeCompare(b.lastName);
      case "firstName":
        return a.firstName.localeCompare(b.firstName);
      case "birthday":
        return calculateAge(b.birthDate) - calculateAge(a.birthDate);
      default:
        return 0;
    }
  });
};

const PatientsListPage = () => {
  const [sortBy, setSortBy] = useState<SortOption>("lastName");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const { data: patients = [] } = useQuery({
    queryKey: ["patients"],
    queryFn: getPatients,
  });

  const filteredAndSortedPatients = useMemo(() => {
    const filtered = filterPatients(patients, search);
    return sortPatients(filtered, sortBy);
  }, [patients, search, sortBy]);

  const handleCreateClick = useCallback(() => {
    navigate("/patients/create");
  }, [navigate]);

  const handleSearchChange = useCallback((value: string) => {
    setSearch(value);
  }, []);

  const handleSortChange = useCallback((value: string) => {
    setSortBy(value as SortOption);
  }, []);

  return (
    <div className="relative">
      <div className="mb-8 flex w-full flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <SearchInput
          value={search}
          onChange={handleSearchChange}
          placeholder="Поиск по имени или фамилии..."
        />
        <SortSelect 
          value={sortBy} 
          onChange={handleSortChange} 
          options={SORT_OPTIONS} 
        />
      </div>
      
      <div className="grid gap-6 md:grid-cols-3 2xl:grid-cols-4">
        {filteredAndSortedPatients.map((patient) => (
          <DashboardItem
            key={patient.id}
            id={patient.id}
            firstName={patient.firstName}
            lastName={patient.lastName}
            age={calculateAge(patient.birthDate)}
            pregnancyWeek={patient.pregnancyWeek || 0}
            anamnesis={patient.anamnesis}
            avatar={patient.avatar}
          />
        ))}
      </div>
      
      <Button onClick={handleCreateClick} />
    </div>
  );
};

export default PatientsListPage;
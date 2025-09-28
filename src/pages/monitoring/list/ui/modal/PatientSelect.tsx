import React, { useEffect, useState } from "react";

import { getPatients } from "../../../../patients/list/service";
import type { Patient } from "../../../../patients/list/service";
import { Spin, Input } from "antd";

interface PatientSelectProps {
  onSelect: (id: string | null) => void;
}

const PatientSelect: React.FC<PatientSelectProps> = ({ onSelect }) => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    getPatients()
      .then((data) => {
        setPatients(Array.isArray(data) ? data : []);
      })
      .finally(() => setLoading(false));
  }, []);

  const filtered = patients.filter((p: Patient) =>
    (p.lastName + " " + p.firstName + " " + (p.middleName || ""))
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  return (
    <div className="flex flex-col gap-4">
      <Input
        placeholder="Поиск по фамилии или имени"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] px-4 py-2 text-[#1F2937] transition focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]"
        allowClear
        size="large"
        style={{ fontSize: 16 }}
      />
      {loading ? (
        <div className="flex items-center justify-center py-10">
          <Spin size="large" />
        </div>
      ) : (
        <>
          <div className="max-h-[45vh] overflow-y-auto rounded-xl border border-[#E5E7EB] bg-[#FFFFFF] p-2 shadow-sm">
            {filtered.length === 0 && (
              <div className="py-6 text-center text-base text-[#6B7280]">
                Нет результатов
              </div>
            )}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
              {filtered.map((p) => {
                let birthDate = "";
                if (p.birthDate) {
                  const d = new Date(p.birthDate);
                  birthDate = d.toLocaleDateString("ru-RU", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  });
                }
                const isSelected = selectedId === p.id;
                return (
                  <button
                    key={p.id}
                    className={`group flex w-full cursor-pointer flex-col gap-1 rounded-2xl border px-5 py-4 text-left shadow-sm transition focus:outline-none ${isSelected ? "border-[#3B82F6] bg-[#E0EDFF]" : "border-[#E5E7EB] bg-[#F9FAFB] hover:border-[#3B82F6] hover:bg-[#F3F4F6] focus:bg-[#F3F4F6]"}`}
                    onClick={() => setSelectedId(p.id)}
                    type="button"
                  >
                    <span
                      className={`text-lg font-semibold transition-colors ${isSelected ? "text-[#3B82F6]" : "text-[#1F2937] group-hover:text-[#3B82F6]"}`}
                    >
                      {p.lastName} {p.firstName} {p.middleName}
                    </span>
                    <span className="text-sm text-[#6B7280]">
                      Дата рождения: {birthDate || "—"}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <button
              className={`rounded-lg border px-5 py-2 text-base font-semibold transition-all duration-150 focus:ring-2 focus:ring-[#3B82F6] focus:ring-offset-2 focus:outline-none ${selectedId ? "border-[#3B82F6] bg-[#3B82F6] text-white hover:border-[#2563EB] hover:bg-[#2563EB] active:bg-[#1D4ED8]" : "cursor-not-allowed border-[#E5E7EB] bg-[#F3F4F6] text-[#6B7280]"}`}
              onClick={() => selectedId && onSelect(selectedId)}
              type="button"
              disabled={!selectedId}
              style={{ minWidth: 110 }}
            >
              Создать
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default PatientSelect;

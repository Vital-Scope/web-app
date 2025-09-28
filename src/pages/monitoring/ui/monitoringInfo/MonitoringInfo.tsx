import { Badge, Button } from "antd";
import React, { useState, useEffect } from "react";

interface MonitoringInfoProps {
  dateStart?: number | null;
  dateEnd?: number | null;
  status?: string | null;
  result?: string | null;
  diagnosis?: string;
  notes?: string;
  medicalTests?: {
    ph: number | null;
    glu: number | null;
    сarbonDioxide: number | null;
    be: number | null;
    lac: number | null;
  } | null;
}

const MonitoringInfo: React.FC<MonitoringInfoProps> = ({
  dateStart,
  dateEnd,
  status,
  result,
  diagnosis = "",
  notes = "",
  medicalTests,
}) => {
  const [localDiagnosis, setLocalDiagnosis] = useState("");
  const [localNotes, setLocalNotes] = useState("");

  useEffect(() => {
    setLocalDiagnosis(diagnosis);
  }, [diagnosis]);
  useEffect(() => {
    setLocalNotes(notes);
  }, [notes]);

  const handleSave = () => {};

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm">
      <h2 className="mb-2 text-xl font-semibold text-[#1F2937]">Мониторинг</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <div className="text-sm text-[#6B7280]">Дата начала:</div>
          <div className="mb-2 font-medium text-[#1F2937]">
            {dateStart
              ? new Date(dateStart * 1000).toLocaleString("ru-RU")
              : "—"}
          </div>
          <div className="text-sm text-[#6B7280]">Дата окончания:</div>
          <div className="mb-2 font-medium text-[#1F2937]">
            {dateEnd ? new Date(dateEnd * 1000).toLocaleString("ru-RU") : "—"}
          </div>
          <div className="mt-2 flex items-center gap-2">
            {status && (
              <Badge
                color={status === "Active" ? "#3B82F6" : "#6B7280"}
                text={status === "Active" ? "Активен" : "Завершён"}
              />
            )}
            {result && (
              <Badge
                color={
                  result === "Regular"
                    ? "#10B981"
                    : result === "Risk"
                      ? "#FBBF24"
                      : "#EF4444"
                }
                text={
                  result === "Regular"
                    ? "В норме"
                    : result === "Risk"
                      ? "Риск"
                      : "Гипоксия"
                }
              />
            )}
          </div>
          <div className="mt-4">
            <div className="mb-1 text-xs text-[#6B7280]">Диагноз</div>
            <textarea
              className="min-h-[48px] w-full resize-y rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] p-2 text-[#1F2937] focus:border-[#8B5CF6] focus:outline-none"
              value={localDiagnosis}
              onChange={(e) => setLocalDiagnosis(e.target.value)}
            />
          </div>
          <div className="mt-2">
            <div className="mb-1 text-xs text-[#6B7280]">Примечания</div>
            <textarea
              className="min-h-[48px] w-full resize-y rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] p-2 text-[#1F2937] focus:border-[#8B5CF6] focus:outline-none"
              value={localNotes}
              onChange={(e) => setLocalNotes(e.target.value)}
            />
          </div>
        </div>
        <div>
          <div className="mb-1 text-xs text-[#6B7280]">Медицинские тесты</div>
          <div className="mt-1 flex flex-wrap gap-3 text-sm">
            <span>
              pH: <b>{medicalTests?.ph ?? "—"}</b>
            </span>
            <span>
              Glu: <b>{medicalTests?.glu ?? "—"}</b>
            </span>
            <span>
              CO₂: <b>{medicalTests?.сarbonDioxide ?? "—"}</b>
            </span>
            <span>
              BE: <b>{medicalTests?.be ?? "—"}</b>
            </span>
            <span>
              Lac: <b>{medicalTests?.lac ?? "—"}</b>
            </span>
          </div>
        </div>
      </div>
      <div className="mt-4 flex justify-end">
        <Button type="primary" className="bg-[#8B5CF6]" onClick={handleSave}>
          Сохранить
        </Button>
      </div>
    </div>
  );
};

export default MonitoringInfo;

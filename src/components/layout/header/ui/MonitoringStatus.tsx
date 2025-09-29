import React from "react";
import { useNavigate } from "react-router-dom";
import StatusDot from "../../../ui/StatusDot";

interface MonitoringStatusProps {
  patient?: string;
  isActive?: boolean;
  monitoringId?: string | null;
}

const MonitoringStatus: React.FC<MonitoringStatusProps> = ({
  patient,
  isActive,
  monitoringId,
}) => {
  const navigate = useNavigate();
  let status: "green" | "gray" | "red";
  if (isActive === undefined) status = "red";
  else if (isActive) status = "green";
  else status = "gray";

  return (
    <div className="flex items-center gap-3 select-none">
      {monitoringId ? (
        <button
          className="mr-3 text-xs font-bold tracking-wider text-[#3B82F6] uppercase underline underline-offset-2 hover:text-[#2563EB] transition cursor-pointer"
          onClick={() => navigate(`/monitoring/${monitoringId}`)}
        >
          Текущий мониторинг
        </button>
      ) : (
        <span className="mr-3 text-xs font-medium tracking-wider text-[#A0AEC0] uppercase">
          Текущий мониторинг
        </span>
      )}
      <div className="flex items-center gap-3 rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] px-2 py-1">
        <span className="mr-1 text-[11px] font-medium text-[#64748B]">
          Имя:
        </span>
        <span className="mr-4 text-[15px] font-semibold text-[#1F2937]">
          {patient ? patient : "—"}
        </span>
        <span className="mr-1 text-[11px] font-medium text-[#64748B]">
          Статус:
        </span>
        <StatusDot color={status} />
      </div>
    </div>
  );
};

export default MonitoringStatus;

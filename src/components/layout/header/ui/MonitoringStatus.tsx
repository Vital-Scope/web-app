import React from "react";
import { useNavigate } from "react-router-dom";
import StatusDot from "../../../ui/StatusDot";

interface MonitoringStatusProps {
  patient?: string;
  isActive?: boolean;
  monitoringId?: string | null;
  deviceStatus?: boolean;
}

const MonitoringStatus: React.FC<MonitoringStatusProps> = ({
  patient,
  isActive,
  monitoringId,
  deviceStatus,
}) => {
  const navigate = useNavigate();

  let status: "green" | "gray" | "red";
  let tooltip: string;

  if (deviceStatus === false) {
    status = "red";
    tooltip = "Нет соединения с оборудованием";
  } else {
    if (isActive === undefined) {
      status = "red";
      tooltip = "Мониторинг неактивен";
    } else if (isActive) {
      status = "green";
      tooltip = "Мониторинг активен";
    } else {
      status = "gray";
      tooltip = "Мониторинг остановлен";
    }
  }

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
        <div title={tooltip}>
          <StatusDot color={status} />
        </div>
      </div>
    </div>
  );
};

export default MonitoringStatus;

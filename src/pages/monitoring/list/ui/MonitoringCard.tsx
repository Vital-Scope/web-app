import React from "react";
import InfoLabel, {
  type InfoLabelColor,
} from "../../../../components/ui/InfoLabel";
import styles from "./MonitoringCard.module.scss";
import type { MonitoringListItem } from "../api/types";

const statusMap: Record<string, { label: string; color: InfoLabelColor }> = {
  Active: {
    label: "Активен",
    color: "blue",
  },
  Completed: {
    label: "Завершён",
    color: "gray",
  },
};

const resultLabelMap: Record<string, { label: string; color: InfoLabelColor }> =
  {
    Regular: { label: "В норме", color: "green" },
    Hypoxia: { label: "Гипоксия", color: "red" },
    Risk: { label: "Риск", color: "orange" },
  };

const MonitoringCard: React.FC<MonitoringListItem> = ({
  dateStart,
  dateEnd,
  pregnancyWeek,
  status,
  result,
  diagnosis,
}) => {
  const statusInfo = status ? statusMap[status] : undefined;
  const formatDate = (timestamp: number | null) =>
    timestamp
      ? new Date(timestamp * 1000).toLocaleString("ru-RU", {
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        })
      : "—";

  return (
    <div
      className={`flex flex-col gap-3 rounded-2xl border border-[#E5E7EB] bg-[#FFFFFF] p-5 text-[#1F2937] shadow-[0_4px_24px_0_#E5E7EB] select-none ${styles["monitoring-card-anim"]}`}
      style={{ minHeight: 180 }}
    >
      <div className="mb-2 flex items-center justify-between">
        <span className="text-base font-semibold text-[#3B82F6]">
          {formatDate(dateStart)}
        </span>
        {statusInfo && (
          <InfoLabel color={statusInfo.color}>{statusInfo.label}</InfoLabel>
        )}
      </div>
      <div className="mt-1 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span className="text-xs text-[#6B7280]">Окончание:</span>
          <span className="text-xs font-medium text-[#1F2937]">
            {formatDate(dateEnd)}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-[#6B7280]">Неделя беременности:</span>
          <span className="text-xs font-medium text-[#1F2937]">
            {pregnancyWeek ?? "—"}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-[#6B7280]">Результат:</span>
          {result && resultLabelMap[result] ? (
            <InfoLabel color={resultLabelMap[result].color}>
              {resultLabelMap[result].label}
            </InfoLabel>
          ) : (
            <span className="text-xs font-medium text-[#1F2937]">—</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-[#6B7280]">Диагноз:</span>
          <span className="text-xs font-medium text-[#1F2937]">
            {diagnosis || "—"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MonitoringCard;

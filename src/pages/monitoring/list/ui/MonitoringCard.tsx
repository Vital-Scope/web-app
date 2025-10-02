import React from "react";
import InfoLabel, {
  type InfoLabelColor,
} from "../../../../components/ui/InfoLabel";
import styles from "./MonitoringCard.module.scss";
import type { MonitoringListItem } from "../../../../service/monitoring/api";

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
  fullName,
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
      className={`relative flex flex-col overflow-hidden rounded-2xl border border-[#E5E7EB] bg-[#FFFFFF] shadow-[0_4px_24px_0_#E5E7EB] transition-shadow select-none hover:shadow-[0_8px_32px_0_#E5E7EB] ${styles["monitoring-card-anim"]}`}
      style={{ minHeight: 200 }}
    >
      <div
        className={`h-2 w-full ${
          statusInfo?.color === "blue"
            ? "bg-[#3B82F6]"
            : statusInfo?.color === "gray"
              ? "bg-[#E5E7EB]"
              : "bg-[#F3F4F6]"
        }`}
      />
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="mb-1 flex items-center justify-between">
          <span
            className="max-w-[70%] truncate text-lg font-bold"
            title={fullName || "—"}
          >
            {fullName || "—"}
          </span>
          {statusInfo && (
            <InfoLabel color={statusInfo.color}>
              <span className="text-xs">{statusInfo.label}</span>
            </InfoLabel>
          )}
        </div>
        <div className="mb-1 flex flex-col">
          <span className="mb-0.5 text-xs text-[#6B7280]">Результат</span>
          <div className="flex items-center gap-2">
            {result === "Regular" && (
              <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
                <circle cx="10" cy="10" r="10" fill="#10B981" />
                <path
                  d="M6 10.5l2.5 2.5 5-5"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
            {result === "Hypoxia" && (
              <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
                <circle cx="10" cy="10" r="10" fill="#EF4444" />
                <path
                  d="M10 5.5a1 1 0 0 1 1 1v4a1 1 0 1 1-2 0v-4a1 1 0 0 1 1-1zm0 8.5a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5z"
                  fill="#fff"
                />
              </svg>
            )}
            {result === "Risk" && (
              <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
                <circle cx="10" cy="10" r="10" fill="#FBBF24" />
                <path
                  d="M10 6v4"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <circle cx="10" cy="14" r="1" fill="#fff" />
              </svg>
            )}
            <span
              className={`text-base font-semibold ${
                result && resultLabelMap[result]?.color === "green"
                  ? "text-[#10B981]"
                  : result && resultLabelMap[result]?.color === "red"
                    ? "text-[#EF4444]"
                    : result && resultLabelMap[result]?.color === "orange"
                      ? "text-[#FBBF24]"
                      : "text-[#6B7280]"
              }`}
            >
              {result && resultLabelMap[result]
                ? resultLabelMap[result].label
                : "—"}
            </span>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div className="flex flex-col">
            <span className="text-[#6B7280]">Начало</span>
            <span className="font-medium text-[#1F2937]">
              {formatDate(dateStart)}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-[#6B7280]">Окончание</span>
            <span className="font-medium text-[#1F2937]">
              {formatDate(dateEnd)}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-[#6B7280]">Неделя</span>
            <span className="font-medium">{pregnancyWeek ?? "—"}</span>
          </div>
        </div>
        <div className="mt-2 flex flex-col">
          <span className="text-sm text-[#6B7280]">Диагноз</span>
          <span
            className="truncate font-medium text-[#1F2937]"
            title={diagnosis || "—"}
          >
            {diagnosis || "—"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MonitoringCard;

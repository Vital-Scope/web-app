import React from "react";
import { Popover } from "antd";

const statusText: Record<StatusDotColor, string> = {
  green: "Идёт мониторинг",
  gray: "Нет мониторинга",
  red: "Нет связи с оборудованием",
};

export type StatusDotColor = "green" | "gray" | "red";

const colorMap: Record<StatusDotColor, string> = {
  green: "bg-[#10B981]",
  gray: "bg-[#D1D5DB]",
  red: "bg-[#EF4444]",
};

interface StatusDotProps {
  color: StatusDotColor;
  className?: string;
}

const StatusDot: React.FC<StatusDotProps> = ({ color, className }) => (
  <Popover content={statusText[color]} placement="bottom" mouseEnterDelay={0.1}>
    <span className="relative inline-block h-3 w-3 cursor-pointer">
      {color === "green" && (
        <span
          className="animate-pulse-slow absolute top-0 left-0 h-3 w-3 rounded-full bg-[#10B981] opacity-40"
          style={{ zIndex: 0 }}
        />
      )}
      {color === "red" && (
        <span
          className="animate-pulse-slow absolute top-0 left-0 h-3 w-3 rounded-full bg-[#EF4444] opacity-40"
          style={{ zIndex: 0 }}
        />
      )}
      <span
        className={`absolute top-0 left-0 h-3 w-3 rounded-full ${colorMap[color]} border border-white shadow ${className || ""}`}
        style={{ zIndex: 1 }}
      />
    </span>
  </Popover>
);
// Добавить кастомную анимацию через tailwind (или глобально)
// animate-pulse-slow: медленный плавный пульс

export default StatusDot;

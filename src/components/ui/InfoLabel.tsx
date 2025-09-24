import React from "react";

export type InfoLabelColor = "blue" | "green" | "red" | "purple";

const colorMap: Record<InfoLabelColor, { bg: string; border: string; text: string }> = {
  blue: {
    bg: "bg-[#E0F2FE]",
    border: "border-[#3B82F6]/30",
    text: "text-[#3B82F6]",
  },
  green: {
    bg: "bg-[#ECFDF5]",
    border: "border-[#10B981]/30",
    text: "text-[#10B981]",
  },
  red: {
    bg: "bg-[#FEE2E2]",
    border: "border-[#EF4444]/30",
    text: "text-[#EF4444]",
  },
  purple: {
    bg: "bg-[#F3F0FF]",
    border: "border-[#8B5CF6]/30",
    text: "text-[#8B5CF6]",
  },
};

interface InfoLabelProps {
  color: InfoLabelColor;
  children: React.ReactNode;
  className?: string;
}

const InfoLabel: React.FC<InfoLabelProps> = ({ color, children, className }) => {
  const c = colorMap[color];
  return (
    <span
      className={`rounded-full border ${c.border} ${c.bg} px-2 py-0.5 text-xs font-semibold ${c.text} shadow-sm ${className || ""}`}
    >
      {children}
    </span>
  );
};

export default InfoLabel;

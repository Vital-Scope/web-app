import React from "react";

export interface SortOption {
  value: string;
  label: string;
}

interface SortSelectProps {
  value: string;
  onChange: (v: string) => void;
  options: SortOption[];
}

const SortSelect: React.FC<SortSelectProps> = ({
  value,
  onChange,
  options,
}) => (
  <div className="flex items-center">
    <label className="mr-3 text-sm font-medium text-[#B8C1EC] select-none">
      Сортировка:
    </label>
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none rounded-xl border border-[#B8C1EC33] bg-[#18122bcc] py-2 pr-10 pl-4 text-sm font-semibold text-white shadow-md transition-colors focus:ring-2 focus:ring-[#3A86FF80] focus:outline-none"
        style={{ minWidth: 150 }}
      >
        {options.map((opt) => (
          <option
            key={opt.value}
            value={opt.value}
            className="bg-[#232946] text-white"
          >
            {opt.label}
          </option>
        ))}
      </select>
      <span className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-lg text-[#B8C1EC]">
        ▼
      </span>
    </div>
  </div>
);

export default SortSelect;

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
    <label className="mr-3 text-sm font-medium text-[#3A86FF] select-none">
      Сортировка:
    </label>
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none rounded-xl border border-[#E3E8F0] bg-white py-2 pr-10 pl-4 text-sm font-semibold text-[#232946] shadow transition-colors focus:ring-2 focus:ring-[#3A86FF33] focus:outline-none"
        style={{ minWidth: 150 }}
      >
        {options.map((opt) => (
          <option
            key={opt.value}
            value={opt.value}
            className="bg-white text-[#232946]"
          >
            {opt.label}
          </option>
        ))}
      </select>
      <span className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-lg text-[#3A86FF]">
        ▼
      </span>
    </div>
  </div>
);

export default SortSelect;

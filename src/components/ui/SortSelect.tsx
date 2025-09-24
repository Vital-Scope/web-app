import React from "react";
import { Select } from "antd";

export interface SortOption {
  value: string;
  label: string;
}

interface SortSelectProps {
  value: string;
  onChange: (v: string) => void;
  options: SortOption[];
}


const SortSelect: React.FC<SortSelectProps> = ({ value, onChange, options }) => {

  return (
    <div className="flex items-center">
      <label className="mr-3 text-sm font-medium text-[#3A86FF] select-none">
        Сортировка:
      </label>
      <Select
        value={value}
        onChange={onChange}
        style={{ minWidth: 150 }}
        className="rounded-xl border border-[#E3E8F0] bg-white text-sm font-semibold text-[#232946] shadow"
        classNames={{ popup: { root: "rounded-xl" } }}
        options={options.map((opt) => ({ label: opt.label, value: opt.value }))}
      />
    </div>
  );
};

export default SortSelect;

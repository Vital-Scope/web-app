import React from "react";

interface SearchInputProps {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder,
}) => (
  <div className="flex w-full max-w-xs items-center">
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder || "Поиск..."}
      className="w-full rounded-xl border border-[#E3E8F0] bg-white py-2 pr-10 pl-4 text-sm font-semibold text-[#232946] placeholder-[#B8C1EC] shadow transition-colors focus:ring-2 focus:ring-[#3A86FF33] focus:outline-none"
      style={{ minWidth: 150 }}
    />
    <span className="pointer-events-none -ml-8 text-lg text-[#3A86FF]">🔍</span>
  </div>
);

export default SearchInput;

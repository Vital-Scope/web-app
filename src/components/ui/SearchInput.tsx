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
      className="w-full rounded-xl border border-[#B8C1EC33] bg-[#18122bcc] py-2 pr-10 pl-4 text-sm font-semibold text-white placeholder-[#B8C1EC99] shadow-md transition-colors focus:ring-2 focus:ring-[#3A86FF80] focus:outline-none"
      style={{ minWidth: 150 }}
    />
    <span className="pointer-events-none -ml-8 text-lg text-[#B8C1EC]">🔍</span>
  </div>
);

export default SearchInput;

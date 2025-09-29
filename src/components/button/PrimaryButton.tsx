import React from "react";
import "./primaryButtonAnim.css";


interface Props {
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  children?: React.ReactNode;
}

const PrimaryButton: React.FC<Props> = ({ onClick, className = "", type = "button", disabled = false, children }) => (
  <button
    type={type}
    onClick={onClick}
    className={`flex items-center justify-center rounded-lg bg-[#10B981] px-5 py-2 font-semibold text-white shadow-sm transition hover:bg-[#059669] focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:ring-offset-2 active:scale-95 active:shadow-[0_0_16px_4px_#10B98155] primary-btn-press-anim ${className}`}
    disabled={disabled}
  >
    {children}
  </button>
);

export default PrimaryButton;

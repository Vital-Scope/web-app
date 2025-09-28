import React from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ open, onClose, title, children }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-all">
      <div
        className="animate-fadeIn relative w-full max-w-3xl min-w-[640px] rounded-3xl border border-[#E5E7EB] bg-[#FFFFFF] p-10 shadow-2xl"
        style={{ boxShadow: "0 8px 40px 0 rgba(59, 130, 246, 0.10)" }}
      >
        <button
          className="absolute top-6 right-6 text-2xl font-bold text-[#6B7280] transition-colors hover:text-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6] focus:outline-none"
          onClick={onClose}
          aria-label="Закрыть"
        >
          ×
        </button>
        {title && (
          <div className="mb-6 flex items-center gap-2 text-2xl font-bold text-[#1F2937]">
            {title}
          </div>
        )}
        <div className="max-h-[70vh] overflow-y-auto pr-2">{children}</div>
      </div>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.25s cubic-bezier(.4,0,.2,1); }
      `}</style>
    </div>
  );
};

export default Modal;

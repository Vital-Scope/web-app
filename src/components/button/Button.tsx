interface Props {
  onClick: () => void;
}

const Button: React.FC<Props> = ({ onClick }) => (
  <button
    onClick={onClick}
    className="text-md fixed right-10 bottom-5 flex h-10 w-36 items-center justify-center rounded-xl border-0 bg-gradient-to-r from-[#3A86FF] via-[#B8C1EC] to-[#E94560] font-semibold text-white shadow-[0_4px_24px_0_#B8C1EC33] transition-all duration-200 hover:scale-105 hover:cursor-pointer hover:shadow-[0_0_16px_4px_#3A86FF33,0_0_32px_8px_#E9456033] focus:outline-none"
    style={{ letterSpacing: "0.05em" }}
  >
    <svg
      className="mr-2 h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
    </svg>
    Добавить
  </button>
);

export default Button;

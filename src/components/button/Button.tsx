interface Props {
  onClick: () => void;
}

const Button: React.FC<Props> = ({ onClick }) => (
  <button
    onClick={onClick}
    className="text-md fixed right-8 bottom-5 flex h-10 w-36 items-center justify-center rounded-xl border-2 border-[#3B82F6] bg-transparent font-semibold text-[#3B82F6] shadow-none transition-all duration-200 hover:scale-105 hover:bg-[#3B82F6] hover:text-white hover:shadow-[0_0_16px_4px_#3B82F633] focus:outline-none"
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

interface Props {
  onClick: () => void;
}

const Button: React.FC<Props> = ({ onClick }) => (
  <button
    onClick={onClick}
  className="text-md fixed right-10 bottom-5 flex h-10 w-36 items-center justify-center rounded-xl border-0 bg-gradient-to-r from-[#18122bcc] via-[#E94560b3] to-[#3A86FFb3] font-md text-white shadow-[0_4px_24px_0_rgba(58,134,255,0.10)] transition-all duration-200 hover:scale-105 hover:cursor-pointer hover:shadow-[0_0_16px_4px_#E9456080,0_0_32px_8px_#3A86FF80] focus:outline-none"
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

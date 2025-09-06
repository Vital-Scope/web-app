
import React from "react";
import { Popover } from "antd";

interface MonitoringCardProps {
  firstName: string;
  lastName: string;
  date: string;
  status: "ready" | "not_ready";
}

const statusMap = {
  ready: {
    label: "Готово",
    color: "bg-[#3A86FF] text-white",
    glow: "shadow-[0_0_12px_2px_#3A86FF80]",
  },
  not_ready: {
    label: "Не готово",
    color: "bg-[#E94560] text-white",
    glow: "shadow-[0_0_12px_2px_#E9456080]",
  },
};

const MonitoringCard: React.FC<MonitoringCardProps> = ({ firstName, lastName, date, status }) => {
  const statusInfo = statusMap[status];
  const [favorite, setFavorite] = React.useState(false);
  return (
    <div
      className="w-full max-w-md mx-auto bg-[#232946cc] rounded-2xl p-6 mb-6 flex flex-col gap-2 shadow-lg border border-[#B8C1EC33] backdrop-blur-md hover:shadow-[0_0_32px_0_#3A86FF80] transition-shadow"
      style={{
        boxShadow: '0 8px 32px 0 #18122bcc',
      }}
    >
      <div>
        <div className="text-lg md:text-xl font-bold text-white drop-shadow-[0_0_8px_#3A86FF80]">
          {lastName} {firstName}
        </div>
        <div className="text-sm text-[#B8C1EC] mt-1">
          {date}
        </div>
      </div>
      <div className="flex flex-col items-start mt-4">
        <span className="text-xs text-[#B8C1EC] mb-1 select-none">Готовность анализа:</span>
        <span
          className={`px-4 py-1 rounded-full font-semibold text-sm ${statusInfo.color} ${statusInfo.glow} transition-all`}
        >
          {statusInfo.label}
        </span>
      </div>
      <div className="relative flex items-center mt-4 w-full" style={{minHeight: '2.5rem'}}>
        <span
          className="absolute left-0 right-0 mx-auto text-[#3A86FF] font-semibold text-sm cursor-pointer hover:underline hover:text-[#E94560] transition-colors text-center w-max"
          style={{left: '0', right: '0'}}>
          Посмотреть
        </span>
        <Popover
          placement="top"
          arrow={false}
          styles={{
            body: {
              background: '#232946',
              color: '#fff',
              borderRadius: '0.75rem',
              boxShadow: '0 4px 24px 0 #18122bcc',
              border: '1.5px solid #B8C1EC33',
              padding: '6px 18px',
              fontWeight: 600,
              fontSize: '0.95rem',
              letterSpacing: '0.01em',
            },
          }}
          content={
            <span style={{ color: favorite ? '#E94560' : '#B8C1EC' }}>
              {favorite ? 'Убрать из отслеживаемых' : 'Отслеживать'}
            </span>
          }
        >
          <button
            className="absolute right-0 p-1 rounded-full bg-transparent hover:bg-[#3A86FF22] transition-colors"
            aria-label={favorite ? 'Убрать из отслеживаемых' : 'Отслеживать'}
            onClick={e => {
              e.stopPropagation();
              setFavorite(f => !f);
            }}
          >
            {favorite ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="#E94560" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#E94560" className="w-7 h-7 drop-shadow-[0_0_8px_#E9456080]">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#B8C1EC" className="w-7 h-7">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12.1 21.3l-1.1-1.01C5.14 15.14 2 12.23 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.73-3.14 6.64-8.9 11.79z" />
              </svg>
            )}
          </button>
        </Popover>
      </div>
    </div>
  );
};

export default MonitoringCard;

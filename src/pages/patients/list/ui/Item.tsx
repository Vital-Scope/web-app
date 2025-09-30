

import clsx from "clsx";
import styles from "../styles.module.scss";
import { WomanMock } from "../../../../components/icons";
import InfoLabel from "../../../../components/ui/InfoLabel";
import { useNavigate } from "react-router-dom";
import React from "react";

function getYearWord(age: number): string {
  const lastDigit = age % 10;
  const lastTwoDigits = age % 100;
  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
    return 'лет';
  }
  if (lastDigit === 1) {
    return 'год';
  }
  if (lastDigit >= 2 && lastDigit <= 4) {
    return 'года';
  }
  return 'лет';
}


export interface DashboardItemPatient {
  id: string;
  lastName: string;
  firstName: string;
  age: number;
  pregnancyWeek: number;
  anamnesis: string;
}


type DashboardItemProps = DashboardItemPatient;



const DashboardItem: React.FC<DashboardItemProps> = ({
  id,
  lastName,
  firstName,
  age,
  pregnancyWeek,
  anamnesis,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/patients/${id}`);
  };

  return (
    <div
      className={clsx(
        "relative flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-[0_2px_16px_0_rgba(244,114,182,0.08)] transition-all duration-200 cursor-pointer hover:shadow-[0_4px_32px_0_rgba(244,114,182,0.16)] hover:border-pink-300",
        styles.animation,
      )}
      onClick={handleClick}
      tabIndex={0}
      role="button"
      aria-pressed="false"
    >
      <div className="flex items-center gap-4">
        <div className="h-14 w-14 rounded-xl bg-pink-100 flex items-center justify-center shadow-sm">
          <WomanMock />
        </div>
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg text-pink-500 truncate">{lastName}</span>
            <span className="text-lg truncate">{firstName}</span>
          </div>
          <div className="flex gap-2 mt-1">
            <span className="inline-block rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600 font-medium">{age} {getYearWord(age)}</span>
            <span className="inline-block rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600 font-medium">{pregnancyWeek} неделя</span>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-100 pt-3 mt-2">
        <div className="text-sm text-gray-500 min-h-[32px]">{anamnesis}</div>
      </div>
      <span className="absolute right-6 top-6 text-xs text-pink-400 opacity-0 group-hover:opacity-100 transition-opacity">Подробнее</span>
    </div>
  );
};

export default React.memo(DashboardItem);


import clsx from "clsx";
import styles from "../styles.module.scss";
import { WomanMock } from "../../../../components/icons";
import InfoLabel from "../../../../components/ui/InfoLabel";
import { useNavigate } from "react-router-dom";
import React from "react";


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
        "flex cursor-pointer flex-col gap-2 rounded-xl border border-[#E5E7EB] bg-[#FFFFFF] p-4 text-[#1F2937] shadow-[0_4px_24px_0_#E5E7EB] transition-all select-none hover:bg-[#EFF6FF] hover:shadow-[0_0_16px_#3B82F633]",
        styles.animation,
      )}
      onClick={handleClick}
    >
      <div className="flex items-center gap-4">
        <div className="flex flex-col items-center justify-center">
          <WomanMock />
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[#3B82F6]">{lastName}</span>
            <span>{firstName}</span>
          </div>
          <div className="mt-1 flex items-start gap-1 2xl:flex-row 2xl:items-center 2xl:gap-2">
            <InfoLabel color="blue">{age}&nbsp;лет</InfoLabel>
            <InfoLabel color="green">{pregnancyWeek}&nbsp;неделя</InfoLabel>
          </div>
        </div>
      </div>
      <div className="mt-2 min-h-[40px] text-sm text-[#6B7280]">
        {anamnesis}
      </div>
    </div>
  );
};

export default React.memo(DashboardItem);

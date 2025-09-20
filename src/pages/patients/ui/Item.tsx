import clsx from "clsx";
import styles from "../styles.module.scss";
import { WomanMock } from "../../../components/icons";
import InfoLabel from "../../../components/ui/InfoLabel";

const mock = {
  lastName: "Иванова",
  firstName: "Мария",
  age: 32,
  pregnancyWeek: 24,
  information: "Пациентка наблюдается с 2023 года. Жалоб нет.",
};

const DashboardItem = () => {
  return (
    <div
      className={clsx(
        "flex cursor-pointer flex-col gap-2 rounded-xl border border-[#E5E7EB] bg-[#FFFFFF] p-4 text-[#1F2937] shadow-[0_4px_24px_0_#E5E7EB] transition-all select-none hover:bg-[#EFF6FF] hover:shadow-[0_0_16px_#3B82F633]",
        styles.animation,
      )}
    >
      <div className="flex items-center gap-4">
        <div className="flex flex-col items-center justify-center">
          <WomanMock />
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[#3B82F6]">
              {mock.lastName}
            </span>
            <span>{mock.firstName}</span>
          </div>
          <div className="mt-1 flex gap-2">
            <InfoLabel color="blue">{mock.age}&nbsp;лет</InfoLabel>
            <InfoLabel color="green">{mock.pregnancyWeek}&nbsp;неделя</InfoLabel>
          </div>
        </div>
      </div>
      <div className="mt-2 min-h-[40px] text-sm text-[#6B7280]">
        {mock.information}
      </div>
    </div>
  );
};

export default DashboardItem;

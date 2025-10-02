import { useQuery } from "@tanstack/react-query";
import { getMonitoringById } from "../../service/monitoring/api";
import { useParams } from "react-router";
import { useMemo, useState } from "react";
import MonitoringInfo from "./ui/monitoringInfo/MonitoringInfo";
import PatientInfo from "./ui/patientInfo";
import { useSessionStore } from "../../store/useSessionStore";
import { getPatientById } from "../../service/patients";
import FirstGraph from "./ui/FirstGraph";
import PrimaryButton from "../../components/button/PrimaryButton";
import { Spin } from "antd";
import { startStreaming, stopStreaming } from "../../service/proxy";

const Monitoring = () => {
  const { updateSession, data: sessionData } = useSessionStore();
  const [loading, setLoading] = useState(false);
  const id = useParams().id as string;

  const { data, refetch } = useQuery({
    queryKey: ["getMonitoringData", id],
    queryFn: () => getMonitoringById(id),
    enabled: !!id,
  });

  const { data: patient, isLoading: isPatientLoading } = useQuery({
    queryKey: ["getPatientById", data?.patientId],
    queryFn: () =>
      data?.patientId ? getPatientById(data.patientId) : undefined,
    enabled: !!data?.patientId,
  });

  const first_arr = useMemo(
    () => data?.sensors.filter((el) => el.channel === "Fhr"),
    [data],
  );

  const xarr = useMemo(() => {
    return first_arr?.map((el) => el.time);
  }, [first_arr]);

  const yarr = useMemo(() => {
    return first_arr?.map((el) => el.value);
  }, [first_arr]);

  const isCurrent = id && sessionData?.monitoringId === id;
  const buttonText = isCurrent ? "Закончить мониторинг" : "Начать мониторинг";
  const loadingText = isCurrent ? "Завершение..." : "Запуск мониторинга...";
  const isVisibleButton = data?.status === null;

  const getButtonColor = () => {
    if (loading) {
      return "bg-[#6B7280] hover:bg-[#6B7280] focus:ring-[#6B7280] cursor-not-allowed opacity-70";
    }
    return isCurrent
      ? "bg-[#EF4444] hover:bg-[#DC2626] focus:ring-[#EF4444] active:shadow-[0_0_16px_4px_#EF444455]"
      : "bg-[#10B981] hover:bg-[#059669] focus:ring-[#10B981] active:shadow-[0_0_16px_4px_#10B98155]";
  };

  const clickHandler = async () => {
    setLoading(true);
    try {
      if (!isCurrent) {
        await startStreaming(id);
      } else {
        await stopStreaming(id);
        setTimeout(refetch, 2000);
      }
      await updateSession(id);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <div className="max-w-8xl mx-auto flex flex-col gap-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <MonitoringInfo
              monitoringId={id}
              dateStart={data?.dateStart}
              dateEnd={data?.dateEnd}
              pregnancyWeek={data?.pregnancyWeek}
              status={data?.status}
              result={data?.result}
              percent={data?.percent}
              diagnosis={data?.diagnosis}
              notes={data?.notes || undefined}
              medicalTests={data?.medicalTests}
            />
          </div>
          <div className="md:col-span-1">
            <PatientInfo patient={patient} isLoading={isPatientLoading} />
          </div>
        </div>
        {isVisibleButton && (
          <PrimaryButton
            onClick={clickHandler}
            className={getButtonColor()}
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <Spin size="small" />
                {loadingText}
              </span>
            ) : (
              buttonText
            )}
          </PrimaryButton>
        )}
        <FirstGraph x_arr={xarr} y_arr={yarr} />

        <div className="mt-4 flex justify-end gap-4">
          <button className="rounded-lg border border-[#8B5CF6] bg-white px-5 py-2 font-semibold text-[#8B5CF6] transition hover:bg-[#F3F4F6]">
            Экспорт
          </button>
        </div>
      </div>
    </div>
  );
};

export default Monitoring;

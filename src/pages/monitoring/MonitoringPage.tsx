import { useQuery } from "@tanstack/react-query";
import { getMonitoringById } from "../../service/monitoring/api";
import { useParams } from "react-router";
import { useMemo, useState } from "react";
import MonitoringInfo from "./ui/monitoringInfo/MonitoringInfo";
import PatientInfo from "./ui/patientInfo";
import { useSessionStore } from "../../store/useSessionStore";
import { getPatientById } from "../../service/patients";
import FirstGraph from "./ui/FirstGraph";
import SecondGraph from "./ui/SecondGraph";
import PrimaryButton from "../../components/button/PrimaryButton";
import { LoadingSpinner } from "../../components/ui";
import { startStreaming, stopStreaming } from "../../service/proxy";

const Monitoring = () => {
  const { updateSession, data: sessionData } = useSessionStore();
  const [loading, setLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
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

  const fhr_arr = useMemo(
    () => data?.sensors.filter((el) => el.channel === "Fhr"),
    [data],
  );

  const uc_arr = useMemo(
    () => data?.sensors.filter((el) => el.channel === "Uc"),
    [data],
  );

  const fhr_xarr = useMemo(() => {
    return fhr_arr?.map((el) => el.time);
  }, [fhr_arr]);

  const fhr_yarr = useMemo(() => {
    return fhr_arr?.map((el) => el.value);
  }, [fhr_arr]);

  const uc_xarr = useMemo(() => {
    return uc_arr?.map((el) => el.time);
  }, [uc_arr]);

  const uc_yarr = useMemo(() => {
    return uc_arr?.map((el) => el.value);
  }, [uc_arr]);

  const isCurrent = id && sessionData?.monitoringId === id;
  const buttonText = isCurrent ? "Закончить мониторинг" : "Начать мониторинг";
  const isVisibleButton = data?.status !== "Completed";

  const getButtonColor = () => {
    if (loading || isProcessing) {
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
        await updateSession(id);
      } else {
        setIsProcessing(true);
        await stopStreaming(id);
        await updateSession(id);
        refetch();
        await new Promise(resolve => setTimeout(resolve, 5000));
        setIsProcessing(false);
      }
    } catch (error) {
      console.error(error);
      setIsProcessing(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] relative">
      {isProcessing && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50" style={{ left: '220px' }}>
          <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-md mx-4">
            <LoadingSpinner 
              message="Идет обработка обученной моделью..."
              size="large"
            />
          </div>
        </div>
      )}
      
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
            disabled={loading || isProcessing}
          >
            {buttonText}
          </PrimaryButton>
        )}
        <div className="grid grid-cols-1 gap-6">
          <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm">
            <FirstGraph x_arr={fhr_xarr} y_arr={fhr_yarr} monitoringId={id} />
          </div>
          <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm">
            <SecondGraph x_arr={uc_xarr} y_arr={uc_yarr} monitoringId={id} />
          </div>
        </div>

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

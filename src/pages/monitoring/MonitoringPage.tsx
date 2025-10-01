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

const Monitoring = () => {
  const { updateSession, data: sessionData } = useSessionStore();
  const [loading, setLoading] = useState(false);
  const id = useParams().id as string;

  const { data, isLoading } = useQuery({
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
    () =>
      data?.sensors
        .filter((el) => el.channel === "Fhr")
        .sort((a, b) => a.time - b.time),
    [data],
  );
  const sliceIdx = 1500;
  const xarr = useMemo(() => {
    let prev = 0;
    const result = [];
    const set = Array.from(new Set(first_arr?.map((el) => el.time))).slice(
      0,
      sliceIdx,
    );
    for (const i of set) {
      if (Math.trunc(i) === prev) continue;
      else {
        result.push(Math.trunc(i));
        prev = Math.trunc(i);
      }
    }
    return result;
  }, [first_arr]);

  const first_xarr = useMemo(() => {
    return Array.from(
      new Set(
        data?.sensors
          .filter((val) => val.channel === "Fhr")
          .map((val) => val.time)
          .sort(),
      ),
    ).slice(0, 40);
  }, [data?.sensors]);

  const first_yarr = useMemo(() => {
    return data?.sensors
      .filter((val) => val.channel === "Fhr")
      .map((val) => val.value)
      .slice(0, sliceIdx);
  }, [data?.sensors]);

  /* const second_xarr = useMemo(() => {
    return data?.filter((val) => !val.channelType).map((val) => val.date);
  }, [data]);

  const second_yarr = useMemo(() => {
    return data?.filter((val) => val.channelType).map((val) => val.value);
  }, [data]); */

  const darkLayout = {
    paper_bgcolor: "#181C23",
    plot_bgcolor: "#181C23",
    font: { color: "#F9FAFB" },
    xaxis: {
      showgrid: true,
      gridcolor: "#23272F",
      linecolor: "#F9FAFB",
      tickfont: { color: "#F9FAFB" },
      title: { font: { color: "#8B5CF6" } },
    },
    yaxis: {
      showgrid: true,
      gridcolor: "#23272F",
      linecolor: "#F9FAFB",
      tickfont: { color: "#F9FAFB" },
      title: { font: { color: "#3B82F6" } },
    },
    margin: { t: 40, l: 50, r: 30, b: 50 },
    legend: { orientation: "h" as const, y: -0.2 },
  };

  const isCurrent = id && sessionData?.monitoringId === id;
  const buttonText = isCurrent ? "Закончить мониторинг" : "Начать мониторинг";
  const buttonColor = isCurrent
    ? "bg-[#EF4444] hover:bg-[#DC2626] focus:ring-[#EF4444] active:shadow-[0_0_16px_4px_#EF444455]"
    : "bg-[#10B981] hover:bg-[#059669] focus:ring-[#10B981] active:shadow-[0_0_16px_4px_#10B98155]";

  const clickHandler = async () => {
    setLoading(true);
    try {
      updateSession(id);
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
              dateStart={data?.dateStart}
              dateEnd={data?.dateEnd}
              status={data?.status}
              result={data?.result}
              diagnosis={data?.diagnosis}
              notes={data?.notes || undefined}
              medicalTests={data?.medicalTests}
            />
          </div>
          <div className="md:col-span-1">
            <PatientInfo patient={patient} isLoading={isPatientLoading} />
          </div>
        </div>
        <PrimaryButton
          onClick={clickHandler}
          className={buttonColor}
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <Spin size="small" />
              {buttonText}
            </span>
          ) : (
            buttonText
          )}
        </PrimaryButton>
        <FirstGraph x_arr={xarr} y_arr={first_yarr} />

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

import { useQuery } from "@tanstack/react-query";
import Plot from "react-plotly.js";
import { getMonitoringById } from "./api";
import { useParams } from "react-router";
import { Spin, Switch } from "antd";
import { mapSensors } from "../../models/Monitoring/sensorMapper";
import { getPatientById } from "../patients/form/service";
import { useState } from "react";
import MonitoringInfo from "./ui/monitoringInfo/MonitoringInfo";
import PatientInfo from "./ui/patientInfo";
import { PrimaryButton } from "../../components/button";
import { useSessionStore } from "../../store/useSessionStore";
import useSignalRSensorPage from "../../hooks/useSignalRSensorPage";

const Monitoring = () => {
  const {
    updateSession,
    data: sessionData,
  } = useSessionStore();
  const ref = useSignalRSensorPage();
  const [loading, setLoading] = useState(false);
  const [isVerticalLayout, setIsVerticalLayout] = useState(false);
  const id = useParams().id as string;

  const { data, isLoading } = useQuery({
    queryKey: ["getMonitoringData", id],
    queryFn: () => getMonitoringById(id),
    enabled: !!id,
  });

  // Получаем данные пациента по patientId из monitoring
  const { data: patient, isLoading: isPatientLoading } = useQuery({
    queryKey: ["getPatientById", data?.patientId],
    queryFn: () =>
      data?.patientId ? getPatientById(data.patientId) : undefined,
    enabled: !!data?.patientId,
  });

  // Маппинг сенсоров для графиков
  const sensorValues = data?.sensors ? mapSensors(data.sensors) : [];
  const fetalData = sensorValues.filter((v) => v.channelType === 0);
  const uterineData = sensorValues.filter((v) => v.channelType === 1);

  // Layout для темного графика
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
              notes={data?.notes}
              medicalTests={data?.medicalTests}
            />
          </div>
          <div className="md:col-span-1">
            <PatientInfo patient={patient} isLoading={isPatientLoading} />
          </div>
        </div>

        {/* Переключатель расположения графиков */}
        <div className="flex items-center justify-between rounded-xl border border-[#E5E7EB] bg-white p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-[#1F2937]">
              Расположение графиков
            </span>
            <span className="text-sm text-[#6B7280]">
              {isVerticalLayout
                ? "Вертикально (друг под другом)"
                : "Горизонтально (рядом)"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-[#6B7280]">Рядом</span>
            <Switch
              checked={isVerticalLayout}
              onChange={setIsVerticalLayout}
              className="bg-[#8B5CF6]"
            />
            <span className="text-sm text-[#6B7280]">Подряд</span>
          </div>
        </div>

        {/* Графики - динамическое расположение */}
        <div
          className={
            isVerticalLayout
              ? "space-y-6"
              : "grid grid-cols-1 gap-6 md:grid-cols-2"
          }
        >
          <div className="rounded-2xl bg-[#181C23] p-6 shadow-md">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F472B6] text-lg text-white shadow-sm">
                💓
              </span>
              <h3 className="text-xl font-bold text-[#F9FAFB]">ЧСС Плода</h3>
            </div>
            {isLoading ? (
              <div className="flex h-64 items-center justify-center">
                <Spin size="large" />
              </div>
            ) : (
              <Plot
                data={[
                  {
                    x: fetalData.map((v) => v.date),
                    y: fetalData.map((v) => v.value),
                    type: "scatter",
                    mode: "lines",
                    line: { color: "#F472B6", width: 3 },
                    name: "ЧСС Плода",
                  },
                ]}
                layout={{
                  ...darkLayout,
                  title: undefined,
                  height: isVerticalLayout ? 400 : 350,
                  width: undefined,
                  autosize: true,
                  margin: { t: 20, l: 60, r: 30, b: 60 },
                }}
                config={{
                  scrollZoom: true,
                  displaylogo: false,
                  responsive: true,
                }}
                style={{ width: "100%", height: "100%" }}
                className="w-full"
              />
            )}
          </div>

          <div className="rounded-2xl bg-[#181C23] p-6 shadow-md">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#8B5CF6] text-lg text-white shadow-sm">
                📊
              </span>
              <h3 className="text-xl font-bold text-[#F9FAFB]">Тонус матки</h3>
            </div>
            {isLoading ? (
              <div className="flex h-64 items-center justify-center">
                <Spin size="large" />
              </div>
            ) : (
              <Plot
                data={[
                  {
                    x: uterineData.map((v) => v.date),
                    y: uterineData.map((v) => v.value),
                    type: "scatter",
                    mode: "lines",
                    line: { color: "#8B5CF6", width: 3 },
                    name: "Тонус матки",
                  },
                ]}
                layout={{
                  ...darkLayout,
                  title: undefined,
                  height: isVerticalLayout ? 400 : 350,
                  width: undefined,
                  autosize: true,
                  margin: { t: 20, l: 60, r: 30, b: 60 },
                }}
                config={{
                  scrollZoom: true,
                  displaylogo: false,
                  responsive: true,
                }}
                style={{ width: "100%", height: "100%" }}
                className="w-full"
              />
            )}
          </div>
        </div>

        <div className="mt-4 flex justify-end gap-4">
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
          <button className="rounded-lg border border-[#8B5CF6] bg-white px-5 py-2 font-semibold text-[#8B5CF6] transition hover:bg-[#F3F4F6]">
            Экспорт
          </button>
        </div>
      </div>
    </div>
  );
};

export default Monitoring;

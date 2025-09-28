

import { useQuery } from "@tanstack/react-query";
import Plot from "react-plotly.js";
import { getMonitoringById } from "./api";
import { useParams } from "react-router";
import { Badge, Spin, Avatar } from "antd";
import { mapSensors } from "../../models/Monitoring/sensorMapper";
import { getPatientById } from "../patients/form/service";
import { useState, useEffect } from "react";
import MonitoringInfo from "./ui/monitoringInfo/MonitoringInfo";


const Monitoring = () => {

  const id = useParams().id as string;

  const { data, isLoading } = useQuery({
    queryKey: ["getMonitoringData", id],
    queryFn: () => getMonitoringById(id),
    enabled: !!id,
  });

  // Получаем данные пациента по patientId из monitoring
  const { data: patient, isLoading: isPatientLoading } = useQuery({
    queryKey: ["getPatientById", data?.patientId],
    queryFn: () => data?.patientId ? getPatientById(data.patientId) : undefined,
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
    legend: { orientation: 'h' as const, y: -0.2 },
  };


  return (
    <div className="min-h-screen bg-[#F9FAFB] py-8 px-2 sm:px-8">
      <div className="max-w-8xl mx-auto flex flex-col gap-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
          <div className="md:col-span-1 flex flex-col gap-2 bg-white rounded-2xl border border-[#E5E7EB] p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-[#1F2937] mb-2">Пациент</h2>
            {isPatientLoading ? <Spin /> : patient ? (
              <>
                <div className="flex items-center gap-3 mb-2">
                  {patient.avatar && <Avatar src={patient.avatar} size={48} />}
                  <div>
                    <div className="font-medium text-[#1F2937]">{patient.lastName} {patient.firstName} {patient.middleName || ""}</div>
                    <div className="text-[#6B7280] text-sm">Дата рождения: {patient.birthDate ? new Date(Number(patient.birthDate) * 1000).toLocaleDateString("ru-RU") : "—"}</div>
                  </div>
                </div>
                <div className="text-[#6B7280] text-sm">Анамнез:</div>
                <div className="font-medium text-[#1F2937] mb-2">{patient.anamnesis || "—"}</div>
                <div className="text-[#6B7280] text-sm">Примечания врача:</div>
                <div className="font-medium text-[#1F2937]">{patient.doctorNotes || "—"}</div>
              </>
            ) : <div className="text-[#6B7280]">Нет данных о пациенте</div>}
          </div>
        </div>



        {/* Графики */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="rounded-2xl bg-[#181C23] p-4 shadow-md">
            <div className="mb-2 text-[#F9FAFB] font-semibold">ЧСС Плода</div>
            {isLoading ? <Spin /> : (
              <Plot
                data={[{
                  x: fetalData.map((v) => v.date),
                  y: fetalData.map((v) => v.value),
                  type: "scatter",
                  mode: "lines",
                  line: { color: "#F472B6", width: 2 },
                  name: "ЧСС Плода",
                }]}
                layout={{ ...darkLayout, title: undefined }}
                config={{ scrollZoom: true, displaylogo: false }}
                className="w-full"
              />
            )}
          </div>
          <div className="rounded-2xl bg-[#181C23] p-4 shadow-md">
            <div className="mb-2 text-[#F9FAFB] font-semibold">Тонус матки</div>
            {isLoading ? <Spin /> : (
              <Plot
                data={[{
                  x: uterineData.map((v) => v.date),
                  y: uterineData.map((v) => v.value),
                  type: "scatter",
                  mode: "lines",
                  line: { color: "#8B5CF6", width: 2 },
                  name: "Тонус матки",
                }]}
                layout={{ ...darkLayout, title: undefined }}
                config={{ scrollZoom: true, displaylogo: false }}
                className="w-full"
              />
            )}
          </div>
        </div>

        {/* Кнопки действий */}
        <div className="flex justify-end gap-4 mt-4">
          <a href="/monitoring-list" className="px-5 py-2 rounded-lg border border-[#3B82F6] text-[#3B82F6] font-semibold bg-white hover:bg-[#F3F4F6] transition">Назад к списку</a>
          <button className="px-5 py-2 rounded-lg border border-[#8B5CF6] text-[#8B5CF6] font-semibold bg-white hover:bg-[#F3F4F6] transition">Экспорт</button>
        </div>
      </div>
    </div>
  );
}


export default Monitoring;

import axios from "axios";
import { notification } from "antd";
import type { Monitoring, MonitoringListItem } from "./types";

export async function createMonitoring(patientId: string) {
  const url = import.meta.env.VITE_API_URL + "/api/monitoring";
  const data = {
    dateStart: 0,
    dateEnd: 0,
    pregnancyWeek: 0,
    status: null,
    result: null,
    medicalTests: null,
    diagnosis: "",
    patientId: patientId,
    notes: "",
  };
  try {
    const response = await axios.post<Monitoring>(url, data);
    notification.success({
      message: "Мониторинг создан",
      description: "Мониторинг успешно создан для выбранного пациента.",
    });
    return response.data;
  } catch (error) {
    notification.error({
      message: "Ошибка",
      description: "Не удалось создать мониторинг.",
    });
    return undefined;
  }
}

export async function getMonitorings(): Promise<MonitoringListItem[]> {
  const url = import.meta.env.VITE_API_URL + "/api/monitoring/all";
  try {
    const response = await axios.get<MonitoringListItem[]>(url);
    return response.data;
  } catch (error) {
    notification.error({
      message: "Ошибка",
      description: "Не удалось загрузить список мониторингов.",
    });
    console.error("Ошибка при получении мониторингов:", error);
    return [];
  }
}

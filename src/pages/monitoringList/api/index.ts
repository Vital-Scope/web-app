export async function createMonitoring(patientId: string) {
  const url = import.meta.env.VITE_API_URL + "/api/monitoring/create";
  try {
    const response = await axios.post(url, { patientId });
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
    throw error;
  }
}
import axios from "axios";
import { notification } from "antd";
import type { MonitoringListItem } from "./types";

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

import axios from "axios";
import { notification } from "antd";
import type { Monitoring } from "./types";

export async function getMonitoringById(id: string): Promise<Monitoring | undefined> {
  const url = import.meta.env.VITE_API_URL + "/api/monitoring/" + id;
  try {
    const response = await axios.get<Monitoring>(url);
    return response.data;
  } catch (error) {
    notification.error({
      message: "Ошибка",
      description: "Не удалось загрузить данные мониторинга.",
    });
    console.error("Ошибка при получении мониторинга:", error);
    return undefined;
  }
}

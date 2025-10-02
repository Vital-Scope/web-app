import axios from "axios";
import { notification } from "antd";

export type MonitoringResult = "Regular" | "Risk" | "Hypoxia";
export type MonitoringStatus = "Active" | "Completed";

export interface Sensor {
  id: string;
  time: number;
  channel: "Fhr" | "Uc"; // 0 - чсс, 1 - тонус матки
  value: number;
}

export interface Monitoring {
  id: string;
  dateStart: number | null;
  dateEnd: number | null;
  pregnancyWeek: number | null;
  status: MonitoringStatus | null;
  result: MonitoringResult | null;
  percent: number | null;
  medicalTests: {
    ph: number | null;
    glu: number | null;
    сarbonDioxide: number | null;
    be: number | null;
    lac: number | null;
  } | null;
  diagnosis: string;
  patientId: string;
  notes: string | null;
  sensors: Sensor[];
  createdAt: number | null;
  updatedAt: number | null;
  fullName: string;
}

export type MonitoringListItem = Omit<Monitoring, "sensors">;

// API
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
  } catch {
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

export async function updateMonitoring(id: string, monitoringData: Omit<Monitoring, "sensors" | "id" | "createdAt" | "updatedAt" | "patientId" | "fullName">): Promise<Monitoring | undefined> {
  const url = import.meta.env.VITE_API_URL + "/api/monitoring/update";
  
  const requestData = {
    id,
    dateStart: monitoringData.dateStart,
    dateEnd: monitoringData.dateEnd,
    pregnancyWeek: monitoringData.pregnancyWeek,
    status: monitoringData.status,
    result: monitoringData.result,
    percent: monitoringData.percent,
    medicalTests: monitoringData.medicalTests,
    diagnosis: monitoringData.diagnosis,
    notes: monitoringData.notes
  };
  
  try {
    const response = await axios.put<Monitoring>(url, requestData);
    notification.success({
      message: "Мониторинг обновлен",
      description: "Данные мониторинга успешно обновлены.",
    });
    return response.data;
  } catch (error) {
    notification.error({
      message: "Ошибка",
      description: "Не удалось обновить мониторинг.",
    });
    console.error("Ошибка при обновлении мониторинга:", error);
    return undefined;
  }
}
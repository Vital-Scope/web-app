import { notification } from "antd";
import axios from "axios";
import type { Monitoring } from "../../../monitoring/api/types";

export interface Patient {
  id: string;
  lastName: string;
  firstName: string;
  middleName: string | null;
  birthDate: number;
  clientId: string | null;
  pregnancyWeek: number | null;
  pregnancyNumber: number | null;
  anamnesis: string;
  doctorNotes: string;
  avatar: string | null;
  monitorings:  Monitoring[];
}

export async function getPatients() {
  try {
    const url = import.meta.env.VITE_API_URL + "/api/patient/all";
    const res = await axios.get<Patient[]>(url);
    return res.data;
  } catch (error) {
    console.error("Error fetching patients:", error);
    notification.error({
      message: "Ошибка",
      description: "Не удалось загрузить список пациентов.",
    });
  }
}

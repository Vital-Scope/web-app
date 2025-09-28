import { notification } from "antd";
import axios from "axios";

export interface Patient {
  id: string;
  lastName: string;
  firstName: string;
  middleName: string | null;
  birthDate: string; // timestamp
  clientId: string | null;
  pregnancyWeek: number | null;
  pregnancyNumber: number | null;
  anamnesis: string;
  doctorNotes: string;
  avatar: string | null;
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

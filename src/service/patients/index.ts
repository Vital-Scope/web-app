import axios from "axios";
import { notification } from "antd";
import type { Monitoring } from "../monitoring/api";

// Типы
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
  monitorings: Monitoring[];
}

export interface FormDataDto {
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
}

// API
export async function getPatients(): Promise<Patient[] | undefined> {
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
    return undefined;
  }
}

export async function createPatient(patient: FormDataDto): Promise<Patient | undefined> {
  try {
    const url = import.meta.env.VITE_API_URL + "/api/patient";
    const res = await axios.post<Patient>(url, patient);
    return res.data;
  } catch (error) {
    console.error("Error creating patient:", error);
    return undefined;
  }
}

export async function updatePatient(patient: FormDataDto): Promise<Patient | undefined> {
  try {
    const url = import.meta.env.VITE_API_URL + "/api/patient/update";
    const res = await axios.put<Patient>(url, patient);
    return res.data;
  } catch (error) {
    console.error("Error updating patient:", error);
    return undefined;
  }
}

export async function getPatientById(id: string): Promise<Patient | undefined> {
  try {
    const url = import.meta.env.VITE_API_URL + `/api/patient/${id}`;
    const res = await axios.get<Patient>(url);
    return res.data;
  } catch (error) {
    console.error("Error fetching patient by id:", error);
    return undefined;
  }
}

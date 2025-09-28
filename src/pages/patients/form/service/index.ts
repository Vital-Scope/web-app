import axios from "axios";
import type { Patient } from "../../list/service";
import type { Monitoring } from "../../../monitoring/api/types";

interface FormDataDto {
  lastName: string;
  firstName: string;
  middleName: string | null;
  birthDate: string;
  clientId: string | null;
  pregnancyWeek: number | null;
  pregnancyNumber: number | null;
  anamnesis: string;
  doctorNotes: string;
  avatar: string | null;
}

export async function createPatient(
  patient: FormDataDto,
): Promise<Patient | undefined> {
  try {
    const url = import.meta.env.VITE_API_URL + "/api/patient/create";
    const res = await axios.post<Patient>(url, patient);
    return res.data;
  } catch (error) {
    console.error("Error creating patient:", error);
    return undefined;
  }
}
export async function updatePatient(
  patient: FormDataDto,
): Promise<Patient | undefined> {
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

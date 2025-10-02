import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useState } from "react";
import { z } from "zod";
import formSchema from "../formSchema";
import { getPatientById } from "../../../../service/patients";
import type { Monitoring } from "../../../../service/monitoring/api";

type FormValues = z.infer<typeof formSchema>;

const DEFAULT_VALUES: Partial<FormValues> = {
  lastName: "",
  firstName: "",
  middleName: "",
  birthDate: undefined,
  clientId: "123456",
  pregnancyWeek: undefined,
  pregnancyNumber: undefined,
  anamnesis: "",
  doctorNotes: "",
  avatar: null,
};

export const usePatientForm = (patientId?: string) => {
  const [monitorings, setMonitorings] = useState<Monitoring[]>([]);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: DEFAULT_VALUES,
  });

  const loadPatientData = useCallback(async (id: string) => {
    try {
      const patient = await getPatientById(id);
      if (patient) {
        // Обновляем форму
        form.reset({
          lastName: patient.lastName || "",
          firstName: patient.firstName || "",
          middleName: patient.middleName || "",
          birthDate: patient.birthDate || undefined,
          clientId: patient.clientId || "",
          pregnancyWeek: patient.pregnancyWeek != null ? String(patient.pregnancyWeek) : undefined,
          pregnancyNumber: patient.pregnancyNumber != null ? String(patient.pregnancyNumber) : undefined,
          anamnesis: patient.anamnesis || "",
          doctorNotes: patient.doctorNotes || "",
          avatar: patient.avatar || null,
        });
        
        // Обновляем мониторинги
        setMonitorings(patient.monitorings || []);
        return patient;
      }
    } catch (error) {
      console.error("Error loading patient data:", error);
    }
    return null;
  }, [form]);

  useEffect(() => {
    if (patientId) {
      loadPatientData(patientId);
    }
  }, [patientId, loadPatientData]);

  return {
    ...form,
    loadPatientData,
    monitorings,
  };
};

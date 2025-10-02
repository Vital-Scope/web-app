import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";
import * as uuid from "uuid";
import { createPatient, updatePatient } from "../../../../service/patients";

interface PatientFormData {
  lastName: string;
  firstName: string;
  middleName: string | null;
  birthDate: number;
  clientId: string | null;
  pregnancyWeek: string | null;
  pregnancyNumber: string | null;
  anamnesis: string;
  doctorNotes: string;
  avatar: string | null;
}

export const usePatientActions = (patientId?: string) => {
  const navigate = useNavigate();

  const transformFormData = useCallback((data: PatientFormData) => ({
    ...data,
    pregnancyWeek: data.pregnancyWeek ? Number(data.pregnancyWeek) : null,
    pregnancyNumber: data.pregnancyNumber ? Number(data.pregnancyNumber) : null,
    birthDate: data.birthDate,
    avatar: data.avatar,
  }), []);

  const handleCreate = useCallback(async (formData: PatientFormData, resetForm: () => void) => {
    const payload = {
      ...transformFormData(formData),
      clientId: uuid.v4(),
    };

    try {
      const created = await createPatient(payload);
      if (created?.id) {
        resetForm();
        navigate(`/patients/${created.id}`);
      } else {
        resetForm();
        navigate("/patients");
      }
    } catch (error) {
      console.error("Error creating patient:", error);
      notification.error({
        message: "Ошибка создания",
        description: "Не удалось создать пациента",
        placement: "topRight",
      });
    }
  }, [navigate, transformFormData]);

  const handleUpdate = useCallback(async (formData: PatientFormData, resetForm: () => void) => {
    if (!patientId) return;

    const payload = {
      ...transformFormData(formData),
      clientId: formData.clientId,
      id: patientId,
    };

    try {
      await updatePatient(payload);
      notification.success({
        message: "Пациент обновлён",
        description: "Данные пациента успешно сохранены.",
        placement: "topRight",
        duration: 3,
      });
      resetForm();
    } catch (error) {
      console.error("Error updating patient:", error);
      notification.error({
        message: "Ошибка обновления",
        description: "Не удалось обновить данные пациента",
        placement: "topRight",
      });
    }
  }, [patientId, transformFormData]);

  const handleSubmit = useCallback((formData: PatientFormData, resetForm: () => void) => {
    if (patientId) {
      handleUpdate(formData, resetForm);
    } else {
      handleCreate(formData, resetForm);
    }
  }, [patientId, handleCreate, handleUpdate]);

  return {
    handleSubmit,
    isEditMode: !!patientId,
  };
};

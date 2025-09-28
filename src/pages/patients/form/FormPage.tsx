import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import formSchema from "./formSchema";
import ProfileBlock from "./ui/ProfileBlock";
import ObstetricBlock from "./ui/ObstetricBlock";
import * as uuid from "uuid";
import { z } from "zod";
import dayjs from "dayjs";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";
import MonitoringBlock from "./ui/MonitoringBlock";
import type { PregnancyHistoryRow } from "./ui/PregnancyHistoryTable";
import { useEffect } from "react";
import { getPatientById, updatePatient, createPatient } from "./service";
import type { Monitoring } from "../../monitoring/api/types";

type FormValues = z.infer<typeof formSchema>;
const AVATAR_PLACEHOLDER = null;

const PatientsFormPage = () => {
  const { id } = useParams();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [monitorings, setMonitorings] = useState<Monitoring[]>([]);
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { errors, isDirty },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      lastName: "",
      firstName: "",
      middleName: "",
      birthDate: undefined,
      clientId: "123456",
      pregnancyWeek: undefined,
      pregnancyNumber: undefined,
      anamnesis: "",
      doctorNotes: "",
      avatar: AVATAR_PLACEHOLDER,
    },
  });

  async function getPatientInfo(patientId: string) {
    const patient = await getPatientById(patientId);
    if (patient) {
      setMonitorings(patient.monitorings);
      reset({
        lastName: patient.lastName || "",
        firstName: patient.firstName || "",
        middleName: patient.middleName || "",
        birthDate: patient.birthDate
          ? Date.parse(patient.birthDate)
          : undefined,
        clientId: patient.clientId || "",
        pregnancyWeek:
          patient.pregnancyWeek != null
            ? String(patient.pregnancyWeek)
            : undefined,
        pregnancyNumber:
          patient.pregnancyNumber != null
            ? String(patient.pregnancyNumber)
            : undefined,
        anamnesis: patient.anamnesis || "",
        doctorNotes: patient.doctorNotes || "",
        avatar: patient.avatar || AVATAR_PLACEHOLDER,
      });
    }
  }

  useEffect(() => {
    if (!id) return;
    getPatientInfo(id);
  }, [id, reset]);

  const handleCreate = async () => {
    const values = getValues();
    const payload = {
      ...values,
      pregnancyWeek: Number(values.pregnancyWeek),
      pregnancyNumber: Number(values.pregnancyNumber),
      birthDate: dayjs(values.birthDate).format("YYYY-MM-DD"),
      avatar: values.avatar,
      clientId: uuid.v4(),
    };
    try {
      const created = await createPatient(payload);
      if (created && created.id) {
        reset(getValues());
        navigate(`/patients/${created.id}`);
      } else {
        reset(getValues());
        navigate("/patients");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async () => {
    const values = getValues();
    const payload = {
      ...values,
      pregnancyWeek: Number(values.pregnancyWeek),
      pregnancyNumber: Number(values.pregnancyNumber),
      birthDate: dayjs(values.birthDate).format("YYYY-MM-DD"),
      avatar: values.avatar,
      clientId: values.clientId,
      id: id ? id : "",
    };
    try {
      await updatePatient(payload);
      notification.success({
        message: "Пациент обновлён",
        description: "Данные пациента успешно сохранены.",
        placement: "topRight",
        duration: 3,
      });
      reset(getValues());
    } catch (error) {
      console.error(error);
    }
  };

  const handleAvatarClick = () => fileInputRef.current?.click();
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setValue("avatar", ev.target?.result as string, {
          shouldValidate: true,
        });
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onSubmit = () => {
    if (id) {
      handleUpdate();
    } else {
      handleCreate();
    }
  };

  return (
    <form
      className="flex min-h-screen flex-col items-center gap-8 px-2 [&_label]:text-sm"
      onSubmit={handleSubmit(onSubmit)}
      autoComplete="off"
    >
      <h2 className="mb-2 text-3xl font-extrabold text-[#3B82F6]">
        Карточка пациента
      </h2>
      <div className="max-w-8xl grid w-full grid-cols-1 gap-8 md:grid-cols-2">
        <div className="flex flex-col gap-8">
          <ProfileBlock
            control={control}
            errors={errors}
            fileInputRef={fileInputRef}
            handleAvatarClick={handleAvatarClick}
            handleAvatarChange={handleAvatarChange}
          />
        </div>
        <div className="flex flex-col gap-8">
          <ObstetricBlock control={control} errors={errors} />
        </div>
      </div>

      <MonitoringBlock
        data={
          monitorings.map((m, idx) => ({
            id: m.id,
            number: idx + 1,
            dateStart: m.dateStart || 0,
            dateEnd: m.dateEnd,
            pregnancyWeek: m.pregnancyWeek || 0,
            status: m.status ? (m.status.toLowerCase() as "active" | "completed") : null,
            result: m.result,
          })) || []
        }
      />

      <button
        type="submit"
        className={`mt-4 w-full max-w-md rounded-lg bg-[#10B981] py-2 text-base font-semibold text-white shadow transition-colors hover:bg-[#059669] disabled:cursor-not-allowed disabled:bg-[#F3F4F6] disabled:text-[#6B7280]`}
        style={{ minWidth: 180 }}
        disabled={!isDirty}
      >
        Сохранить
      </button>
    </form>
  );
};

export default PatientsFormPage;

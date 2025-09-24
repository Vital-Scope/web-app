import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import formSchema from "./formSchema";
import ProfileBlock from "./ui/ProfileBlock";
import ObstetricBlock from "./ui/ObstetricBlock";
import NotesBlock from "./ui/NotesBlock";
import * as uuid from "uuid"

import { z } from "zod";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import dayjs from "dayjs";
type FormValues = z.infer<typeof formSchema>;
const AVATAR_PLACEHOLDER = null;

const PatientsFormPage = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
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
      dueDate: undefined,
      anamnesis: "",
      doctorNotes: "",
      avatar: AVATAR_PLACEHOLDER,
    },
  });

  const createPatient = async () => {
    const url = import.meta.env.VITE_API_URL + `/api/patient/create`;
    const values = getValues();
    const payload = {
      ...values,
      pregnancyWeek: Number(getValues().pregnancyWeek),
      pregnancyNumber: Number(getValues().pregnancyNumber),
      birthDate: dayjs(values.birthDate).format("YYYY-MM-DD"),
      clientId: uuid.v4(),
    };

    try {
      const res = await axios.post(url, payload);
      console.log(res);
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

  const onSubmit = (data: FormValues) => {
    const payload = {
      ...data,
      birthDate:
        data.birthDate &&
        typeof data.birthDate === "object" &&
        "valueOf" in data.birthDate
          ? (data.birthDate as { valueOf: () => number }).valueOf()
          : data.birthDate,
      dueDate:
        data.dueDate &&
        typeof data.dueDate === "object" &&
        "valueOf" in data.dueDate
          ? (data.dueDate as { valueOf: () => number }).valueOf()
          : data.dueDate,
    };
    createPatient();
  };

  return (
    <form
      className="flex min-h-screen flex-col items-center gap-8 px-2 [&_label]:text-sm"
      onSubmit={handleSubmit(onSubmit)}
      autoComplete="off"
    >
      <h2 className="mb-2 text-3xl font-extrabold text-[#3B82F6]">
        Создание карточки пациента
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
          <NotesBlock control={control} errors={errors} />
        </div>
      </div>
      <button
        type="submit"
        className="mt-4 w-full max-w-3xl rounded-xl bg-[#10B981] py-3 text-lg font-bold text-white shadow transition-colors hover:bg-[#059669]"
      >
        Сохранить
      </button>
    </form>
  );
};

export default PatientsFormPage;

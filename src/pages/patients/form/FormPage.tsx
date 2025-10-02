import { useCallback } from "react";
import { useParams } from "react-router";
import ProfileBlock from "./ui/ProfileBlock";
import ObstetricBlock from "./ui/ObstetricBlock";
import MonitoringBlock from "./ui/MonitoringBlock";
import { usePatientForm } from "./hooks/usePatientForm";
import { useAvatarUpload } from "./hooks/useAvatarUpload";
import { usePatientActions } from "./hooks/usePatientActions";

const PatientsFormPage = () => {
  const { id } = useParams();
  
  // Если id === "create", то это создание нового пациента
  const patientId = id === "create" ? undefined : id;

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { errors, isDirty },
    monitorings,
  } = usePatientForm(patientId);

  const { handleSubmit: handlePatientSubmit, isEditMode } = usePatientActions(patientId);

  const handleAvatarChange = useCallback((avatar: string | null) => {
    setValue("avatar", avatar, {
      shouldValidate: true,
      shouldDirty: true,
    });
  }, [setValue]);

  const {
    fileInputRef,
    handleAvatarClick,
    handleAvatarChange: onAvatarFileChange,
    handleAvatarRemove,
  } = useAvatarUpload({ onAvatarChange: handleAvatarChange });

  const onSubmit = useCallback(() => {
    const formData = getValues();
    const resetForm = () => reset(getValues());
    handlePatientSubmit(formData, resetForm);
  }, [getValues, reset, handlePatientSubmit]);

  // Преобразуем мониторинги в формат для MonitoringBlock
  const transformedMonitorings = monitorings.map((m, idx) => ({
    id: m.id,
    number: idx + 1,
    dateStart: m.dateStart || 0,
    dateEnd: m.dateEnd,
    pregnancyWeek: m.pregnancyWeek || 0,
    status: m.status ? (m.status.toLowerCase() as "active" | "completed") : null,
    result: m.result,
    percent: m.percent,
  }));

  return (
    <form
      className="flex min-h-screen flex-col items-center gap-8 px-2 [&_label]:text-sm"
      onSubmit={handleSubmit(onSubmit)}
      autoComplete="off"
    >
      <h2 className="mb-2 text-3xl font-extrabold text-[#3B82F6]">
        {isEditMode ? "Редактирование пациента" : "Новый пациент"}
      </h2>
      
      <div className="max-w-8xl grid w-full grid-cols-1 gap-8 md:grid-cols-2">
        <div className="flex flex-col gap-8">
          <ProfileBlock
            control={control}
            errors={errors}
            fileInputRef={fileInputRef}
            handleAvatarClick={handleAvatarClick}
            handleAvatarChange={onAvatarFileChange}
            handleAvatarRemove={handleAvatarRemove}
          />
        </div>
        <div className="flex flex-col gap-8">
          <ObstetricBlock control={control} errors={errors} />
        </div>
      </div>

      {isEditMode && (
        <MonitoringBlock data={transformedMonitorings} />
      )}

      <button
        type="submit"
        className="mt-4 w-full max-w-md rounded-lg bg-[#10B981] py-2 text-base font-semibold text-white shadow transition-colors hover:bg-[#059669] disabled:cursor-not-allowed disabled:bg-[#F3F4F6] disabled:text-[#6B7280]"
        style={{ minWidth: 180 }}
        disabled={!isDirty}
      >
        {isEditMode ? "Сохранить изменения" : "Создать пациента"}
      </button>
    </form>
  );
};

export default PatientsFormPage;
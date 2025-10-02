import React from "react";
import { Input, DatePicker } from "antd";
import { UserOutlined, DeleteOutlined, CameraOutlined } from "@ant-design/icons";
import WomanMock from "../../../../components/icons/WomanMock";
import locale from "antd/es/date-picker/locale/ru_RU";
import dayjs from "dayjs";
import { Controller } from "react-hook-form";
import type { Control, FieldErrors } from "react-hook-form";

interface ProfileBlockProps {
  control: Control<any>;
  errors: FieldErrors<any>;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  handleAvatarClick: () => void;
  handleAvatarChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleAvatarRemove: () => void;
}

const AvatarUpload: React.FC<{
  control: Control<any>;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  handleAvatarClick: () => void;
  handleAvatarChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleAvatarRemove: () => void;
}> = ({
  control,
  fileInputRef,
  handleAvatarClick,
  handleAvatarChange,
  handleAvatarRemove,
}) => (
  <div className="flex flex-col items-center gap-2">
    <div className="relative">
      <div
        className="group relative h-28 w-28 cursor-pointer overflow-hidden rounded-full border-4 border-[#3B82F6] bg-[#DBEAFE]"
        onClick={handleAvatarClick}
        title="Загрузить аватар"
      >
        <Controller
          name="avatar"
          control={control}
          render={({ field }) =>
            field.value ? (
              <img
                src={field.value}
                alt="Аватар пациента"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-[#DBEAFE]">
                <WomanMock />
              </div>
            )
          }
        />
        <div className="absolute inset-0 flex items-center justify-center bg-[#3B82F6]/60 text-xs font-bold text-white opacity-0 transition-opacity group-hover:opacity-100">
          <CameraOutlined className="mr-1" />
          Загрузить
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleAvatarChange}
        />
      </div>
      
      <Controller
        name="avatar"
        control={control}
        render={({ field }) =>
          field.value && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleAvatarRemove();
              }}
              className="absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-white shadow-lg transition-colors hover:bg-red-600"
              title="Удалить фото"
            >
              <DeleteOutlined className="text-sm" />
            </button>
          )
        }
      />
    </div>
    
    <div className="text-center">
      <div className="text-xs text-gray-600">Нажмите для загрузки фото</div>
      <div className="text-xs text-gray-500">JPG, PNG до 5MB</div>
    </div>
  </div>
);

const FormField: React.FC<{
  label: string;
  name: string;
  control: Control<any>;
  errors: FieldErrors<any>;
  placeholder: string;
  disabled?: boolean;
  type?: "text" | "date";
  colSpan?: boolean;
}> = ({ label, name, control, errors, placeholder, disabled = false, type = "text", colSpan = false }) => (
  <div className={colSpan ? "md:col-span-2" : ""}>
    <label className="mb-1 block text-xs text-[#6B7280]">{label}</label>
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        if (type === "date") {
          return (
            <DatePicker
              {...field}
              className="w-full rounded-xl border-[#E5E7EB] px-3 py-2 text-base hover:border-[#E5E7EB] focus:border-[#3B82F6]"
              placeholder={placeholder}
              format="DD.MM.YYYY"
              size="large"
              style={{ width: "100%" }}
              locale={locale}
              value={field.value ? dayjs(field.value * 1000) : undefined}
              onChange={(date) => field.onChange(date ? date.unix() : undefined)}
              status={errors[name] ? "error" : undefined}
            />
          );
        }

        return (
          <Input
            {...field}
            className={`w-full rounded-xl border-[#E5E7EB] px-3 py-2 text-base hover:border-[#E5E7EB] focus:border-[#3B82F6] ${
              disabled ? "bg-[#F3F4F6] text-[#6B7280]" : ""
            }`}
            placeholder={placeholder}
            size="large"
            disabled={disabled}
            status={errors[name] ? "error" : undefined}
          />
        );
      }}
    />
    {errors[name] && (
      <div className="mt-1 text-xs text-red-500">
        {errors[name]?.message as string}
      </div>
    )}
  </div>
);

const ProfileBlock: React.FC<ProfileBlockProps> = ({
  control,
  errors,
  fileInputRef,
  handleAvatarClick,
  handleAvatarChange,
  handleAvatarRemove,
}) => (
  <div className="flex max-w-3xl flex-col gap-6 rounded-2xl border-2 border-[#E5E7EB] bg-white p-6 shadow transition-colors duration-200 focus-within:border-[#3B82F6] hover:border-[#3B82F6]">
    <div className="mb-2 flex items-center gap-2 transition-colors duration-200 group-focus-within:text-[#3B82F6] group-hover:text-[#3B82F6]">
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#3B82F6] text-lg text-white transition-colors duration-200 group-focus-within:bg-[#3B82F6] group-hover:bg-[#3B82F6]">
        <UserOutlined />
      </span>
      <span className="font-bold text-[#3B82F6] transition-colors duration-200 group-focus-within:text-[#3B82F6] group-hover:text-[#3B82F6]">
        Профиль пациента
      </span>
    </div>
    
    <AvatarUpload
      control={control}
      fileInputRef={fileInputRef}
      handleAvatarClick={handleAvatarClick}
      handleAvatarChange={handleAvatarChange}
      handleAvatarRemove={handleAvatarRemove}
    />
    
    <div className="grid grid-cols-1 items-center gap-4 md:grid-cols-2">
      <FormField
        label="Фамилия"
        name="lastName"
        control={control}
        errors={errors}
        placeholder="Фамилия"
      />
      <FormField
        label="Имя"
        name="firstName"
        control={control}
        errors={errors}
        placeholder="Имя"
      />
      <FormField
        label="Отчество"
        name="middleName"
        control={control}
        errors={errors}
        placeholder="Отчество"
      />
      <FormField
        label="Дата рождения"
        name="birthDate"
        control={control}
        errors={errors}
        placeholder="Дата рождения"
        type="date"
      />
      <FormField
        label="ID клиента"
        name="clientId"
        control={control}
        errors={errors}
        placeholder="ID клиента"
        disabled
        colSpan
      />
    </div>
  </div>
);

export default ProfileBlock;
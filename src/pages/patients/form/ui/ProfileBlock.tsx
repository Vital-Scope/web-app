import React from "react";
import { Input, DatePicker } from "antd";
import { UserOutlined } from "@ant-design/icons";
import WomanMock from "../../../../components/icons/WomanMock";
import locale from "antd/es/date-picker/locale/ru_RU";
import dayjs from "dayjs";
import { Controller } from "react-hook-form";
import type { Control, FieldErrors } from "react-hook-form";

type Props = {
  control: Control<any>;
  errors: FieldErrors<any>;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  handleAvatarClick: () => void;
  handleAvatarChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const ProfileBlock: React.FC<Props> = ({ control, errors, fileInputRef, handleAvatarClick, handleAvatarChange }) => (
  <div className="flex max-w-3xl flex-col gap-6 rounded-2xl border-2 border-[#E5E7EB] bg-white p-6 shadow transition-colors duration-200 focus-within:border-[#3B82F6] hover:border-[#3B82F6]">
    <div className="mb-2 flex items-center gap-2 transition-colors duration-200 group-hover:text-[#3B82F6] group-focus-within:text-[#3B82F6]">
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#3B82F6] text-lg text-white transition-colors duration-200 group-hover:bg-[#3B82F6] group-focus-within:bg-[#3B82F6]">
        <UserOutlined />
      </span>
      <span className="font-bold text-[#3B82F6] transition-colors duration-200 group-hover:text-[#3B82F6] group-focus-within:text-[#3B82F6]">Профиль пациента</span>
    </div>
    <div className="flex flex-col items-center gap-2">
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
    </div>
    <div className="grid grid-cols-1 items-center gap-4 md:grid-cols-2">
      <div>
        <label className="mb-1 block text-[#6B7280]">Фамилия</label>
        <Controller
          name="lastName"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              className="w-full rounded-xl border-[#E5E7EB] px-3 py-2 text-base hover:border-[#E5E7EB] focus:border-[#3B82F6]"
              placeholder="Фамилия"
              size="large"
              status={errors.lastName ? "error" : undefined}
            />
          )}
        />
        {errors.lastName && (
          <div className="mt-1 text-xs text-red-500">{errors.lastName.message as string}</div>
        )}
      </div>
      <div>
        <label className="mb-1 block text-xs text-[#6B7280]">Имя</label>
        <Controller
          name="firstName"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              className="w-full rounded-xl border-[#E5E7EB] px-3 py-2 text-base hover:border-[#E5E7EB] focus:border-[#3B82F6]"
              placeholder="Имя"
              size="large"
              status={errors.firstName ? "error" : undefined}
            />
          )}
        />
        {errors.firstName && (
          <div className="mt-1 text-xs text-red-500">{errors.firstName.message as string}</div>
        )}
      </div>
      <div>
        <label className="mb-1 block text-xs text-[#6B7280]">Отчество</label>
        <Controller
          name="middleName"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              className="w-full rounded-xl border-[#E5E7EB] px-3 py-2 text-base hover:border-[#E5E7EB] focus:border-[#3B82F6]"
              placeholder="Отчество"
              size="large"
              status={errors.middleName ? "error" : undefined}
            />
          )}
        />
        {errors.middleName && (
          <div className="mt-1 text-xs text-red-500">{errors.middleName.message as string}</div>
        )}
      </div>
      <div>
        <label className="mb-1 block text-xs text-[#6B7280]">Дата рождения</label>
        <Controller
          name="birthDate"
          control={control}
          render={({ field }) => (
            <DatePicker
              {...field}
              className="w-full rounded-xl border-[#E5E7EB] px-3 py-2 text-base hover:border-[#E5E7EB] focus:border-[#3B82F6]"
              placeholder="Дата рождения"
              format="DD.MM.YYYY"
              size="large"
              style={{ width: "100%" }}
              locale={locale}
              value={field.value ? dayjs(field.value) : undefined}
              onChange={(date) => field.onChange(date ? date.valueOf() : undefined)}
              status={errors.birthDate ? "error" : undefined}
            />
          )}
        />
        {errors.birthDate && (
          <div className="mt-1 text-xs text-red-500">{errors.birthDate.message as string}</div>
        )}
      </div>
      <div className="md:col-span-2">
        <label className="mb-1 block text-xs text-[#6B7280]">ID клиента</label>
        <Controller
          name="clientId"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              className="w-full rounded-xl border-[#E5E7EB] bg-[#F3F4F6] px-3 py-2 text-base text-[#6B7280] hover:border-[#E5E7EB] focus:border-[#3B82F6]"
              disabled
              size="large"
            />
          )}
        />
      </div>
    </div>
  </div>
);

export default ProfileBlock;

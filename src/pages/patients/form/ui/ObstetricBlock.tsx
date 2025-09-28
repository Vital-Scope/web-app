import React from "react";
import { Input } from "antd";
import { WomanOutlined } from "@ant-design/icons";
import { Controller } from "react-hook-form";
import type { Control, FieldErrors } from "react-hook-form";

type Props = {
  control: Control<any>;
  errors: FieldErrors<any>;
};

const ObstetricBlock: React.FC<Props> = ({ control, errors }) => (
  <div className="flex max-w-3xl flex-col gap-6 rounded-2xl border-2 border-[#E5E7EB] bg-white p-8 shadow transition-colors duration-200 focus-within:border-[#F472B6] hover:border-[#F472B6]">
    <div className="mb-2 flex items-center gap-2 transition-colors duration-200 group-focus-within:text-[#F472B6] group-hover:text-[#F472B6]">
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F472B6] text-lg text-white transition-colors duration-200 group-focus-within:bg-[#F472B6] group-hover:bg-[#F472B6]">
        <WomanOutlined />
      </span>
      <span className="font-bold text-[#F472B6] transition-colors duration-200 group-focus-within:text-[#F472B6] group-hover:text-[#F472B6]">
        Акушерские данные
      </span>
    </div>
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <div className="flex flex-col gap-2">
        <label className="mb-1 block text-xs text-[#6B7280]">
          Срок беременности (недели)
        </label>
        <Controller
          name="pregnancyWeek"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              type="number"
              min={0}
              max={45}
              className="max-w-[140px] rounded-xl border-[#E5E7EB] px-3 py-2 text-base hover:border-[#E5E7EB] focus:border-[#8B5CF6]"
              placeholder="Напр. 24"
              size="large"
              status={errors.pregnancyWeek ? "error" : undefined}
              value={field.value === null ? undefined : field.value}
            />
          )}
        />
        {errors.pregnancyWeek && (
          <div className="mt-1 text-xs text-red-500">
            {errors.pregnancyWeek.message as string}
          </div>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <label className="mb-1 block text-xs text-[#6B7280]">
          Номер беременности
        </label>
        <Controller
          name="pregnancyNumber"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              type="number"
              min={1}
              className="max-w-[140px] rounded-xl border-[#E5E7EB] px-3 py-2 text-base hover:border-[#E5E7EB] focus:border-[#8B5CF6]"
              placeholder="Напр. 2"
              size="large"
              status={errors.pregnancyNumber ? "error" : undefined}
              value={field.value === null ? undefined : field.value}
            />
          )}
        />
        {errors.pregnancyNumber && (
          <div className="mt-1 text-xs text-red-500">
            {errors.pregnancyNumber.message as string}
          </div>
        )}
      </div>
    </div>
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <div className="flex flex-col gap-2">
        <label className="mb-1 block text-xs text-[#6B7280]">Анамнез</label>
        <Controller
          name="anamnesis"
          control={control}
          render={({ field }) => (
            <Input.TextArea
              {...field}
              className="min-h-[80px] w-full resize-y rounded-xl border-[#E5E7EB] px-3 py-2 text-base hover:border-[#E5E7EB] focus:border-[#3B82F6]"
              placeholder="Анамнез пациента..."
              autoSize={{ minRows: 3, maxRows: 8 }}
              status={errors.anamnesis ? "error" : undefined}
            />
          )}
        />
        {errors.anamnesis && (
          <div className="mt-1 text-xs text-red-500">
            {errors.anamnesis.message as string}
          </div>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <label className="mb-1 block text-xs text-[#6B7280]">
          Примечания врача
        </label>
        <Controller
          name="doctorNotes"
          control={control}
          render={({ field }) => (
            <Input.TextArea
              {...field}
              className="min-h-[80px] w-full resize-y rounded-xl border-[#E5E7EB] px-3 py-2 text-base hover:border-[#E5E7EB] focus:border-[#3B82F6]"
              placeholder="Заметки врача..."
              autoSize={{ minRows: 3, maxRows: 8 }}
              status={errors.doctorNotes ? "error" : undefined}
            />
          )}
        />
        {errors.doctorNotes && (
          <div className="mt-1 text-xs text-red-500">
            {errors.doctorNotes.message as string}
          </div>
        )}
      </div>
    </div>
  </div>
);

export default ObstetricBlock;

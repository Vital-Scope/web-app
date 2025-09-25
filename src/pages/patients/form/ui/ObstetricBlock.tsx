import React from "react";
import { Input, DatePicker } from "antd";
import { WomanOutlined } from "@ant-design/icons";
import locale from "antd/es/date-picker/locale/ru_RU";
import dayjs from "dayjs";
import { Controller } from "react-hook-form";
import type { Control, FieldErrors } from "react-hook-form";

type Props = {
  control: Control<any>;
  errors: FieldErrors<any>;
};

const ObstetricBlock: React.FC<Props> = ({ control, errors }) => (
  <div className="flex max-w-3xl flex-col gap-4 rounded-2xl border-2 border-[#E5E7EB] bg-white p-6 shadow transition-colors duration-200 focus-within:border-[#F472B6] hover:border-[#F472B6]">
    <div className="mb-2 flex items-center gap-2 transition-colors duration-200 group-focus-within:text-[#F472B6] group-hover:text-[#F472B6]">
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F472B6] text-lg text-white transition-colors duration-200 group-focus-within:bg-[#F472B6] group-hover:bg-[#F472B6]">
        <WomanOutlined />
      </span>
      <span className="font-bold text-[#F472B6] transition-colors duration-200 group-focus-within:text-[#F472B6] group-hover:text-[#F472B6]">
        Акушерские данные
      </span>
    </div>
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <div className="flex h-full min-h-[90px] flex-col justify-end">
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
              className="w-full rounded-xl border-[#E5E7EB] px-3 py-2 text-base hover:border-[#E5E7EB] focus:border-[#8B5CF6]"
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
      <div className="flex h-full min-h-[90px] flex-col justify-end">
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
              className="w-full rounded-xl border-[#E5E7EB] px-3 py-2 text-base hover:border-[#E5E7EB] focus:border-[#8B5CF6]"
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
      <div className="flex h-full min-h-[90px] flex-col justify-end">
        <label className="mb-1 block text-xs text-[#6B7280]">
          Ожидаемая дата родов
        </label>
        <Controller
          name="dueDate"
          control={control}
          render={({ field }) => (
            <DatePicker
              {...field}
              className="w-full rounded-xl border-[#E5E7EB] px-3 py-2 text-base hover:border-[#E5E7EB] focus:border-[#8B5CF6]"
              placeholder="Ожидаемая дата родов"
              format="DD.MM.YYYY"
              size="large"
              style={{ width: "100%" }}
              locale={locale}
              value={field.value ? dayjs(field.value) : undefined}
              onChange={(date) =>
                field.onChange(date ? date.valueOf() : undefined)
              }
              status={errors.dueDate ? "error" : undefined}
            />
          )}
        />
        {errors.dueDate && (
          <div className="mt-1 text-xs text-red-500">
            {errors.dueDate.message as string}
          </div>
        )}
      </div>
    </div>
  </div>
);

export default ObstetricBlock;

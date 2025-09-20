import React from "react";
import { Input } from "antd";
import { FileTextOutlined } from "@ant-design/icons";
import { Controller } from "react-hook-form";
import type { Control, FieldErrors } from "react-hook-form";

type Props = {
  control: Control<any>;
  errors: FieldErrors<any>;
};

const NotesBlock: React.FC<Props> = ({ control, errors }) => (
  <div className="flex max-w-3xl flex-col gap-4 rounded-2xl border-2 border-[#E5E7EB] bg-white p-6 shadow transition-colors duration-200 focus-within:border-[#8B5CF6] hover:border-[#8B5CF6]">
    <div className="mb-2 flex items-center gap-2 transition-colors duration-200 group-focus-within:text-[#8B5CF6] group-hover:text-[#8B5CF6]">
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#8B5CF6] text-lg text-white transition-colors duration-200 group-focus-within:bg-[#8B5CF6] group-hover:bg-[#8B5CF6]">
        <FileTextOutlined />
      </span>
      <span className="font-bold text-[#8B5CF6] transition-colors duration-200 group-focus-within:text-[#8B5CF6] group-hover:text-[#8B5CF6]">
        Анамнез и примечания
      </span>
    </div>
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div>
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
      <div>
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

export default NotesBlock;

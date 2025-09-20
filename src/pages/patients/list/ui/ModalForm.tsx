import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import formSchema from "../formSchema";

import { Modal } from "antd";
import type z from "zod";

interface Props {
  onClose: () => void;
  isOpen: boolean;
}

export type FormData = z.infer<typeof formSchema>;

const ModalForm: React.FC<Props> = ({ isOpen, onClose }) => {

  const {
  register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      age: null,
      firstName: "",
      information: "",
      lastName: "",
      pregnancyWeek: null,
    },
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
    reset();
    setAvatar(null);
  };

  const [avatar, setAvatar] = React.useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setAvatar(ev.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      width={700}
      okText="Сохранить"
      cancelText="Отменить"
      onOk={handleSubmit(onSubmit)}
    >
      <form
        className="mx-auto max-w-4xl rounded-lg p-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mb-8 flex flex-col items-center">
          <div
            className="flex h-28 w-28 cursor-pointer items-center justify-center rounded-full border-2 border-[#E3E8F0] bg-[#F6F8FB] transition hover:opacity-80"
            onClick={handleAvatarClick}
            title="Загрузить аватар"
            style={{ overflow: "hidden" }}
          >
            {avatar ? (
              <img
                src={avatar}
                alt="Аватар"
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="text-4xl text-gray-400">+</span>
            )}
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleAvatarChange}
              className="hidden"
            />
          </div>
          <span className="mt-2 text-sm text-[#B8C1EC]">
            Нажмите, чтобы загрузить аватар
          </span>
        </div>
        <div className="grid grid-cols-1 gap-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
            <div>
              <label
                htmlFor="firstname"
                className="mb-1 block font-semibold text-[#3B82F6]"
              >
                Имя <span className="text-[#EF4444]">*</span>
              </label>
              <input
                id="firstname"
                type="text"
                {...register("firstName")}
                className="w-full rounded border border-[#E5E7EB] bg-[#FFFFFF] px-3 py-2 text-[#1F2937] shadow focus:ring-2 focus:ring-[#3B82F633] focus:outline-none placeholder-[#6B7280]"
                style={{
                  minHeight: "40px",
                  fontSize: "1rem",
                  lineHeight: "1.5",
                  padding: "12px",
                }}
              />
              {errors.firstName && (
                <span className="text-sm text-[#EF4444]">
                  {errors.firstName.message as string}
                </span>
              )}
            </div>
            <div>
              <label
                htmlFor="lastname"
                className="mb-1 block font-semibold text-[#3B82F6]"
              >
                Фамилия <span className="text-[#EF4444]">*</span>
              </label>
              <input
                id="lastname"
                type="text"
                {...register("lastName")}
                className="w-full rounded border border-[#E5E7EB] bg-[#FFFFFF] px-3 py-2 text-[#1F2937] shadow focus:ring-2 focus:ring-[#3B82F633] focus:outline-none placeholder-[#6B7280]"
                style={{
                  minHeight: "40px",
                  fontSize: "1rem",
                  lineHeight: "1.5",
                  padding: "12px",
                }}
              />
              {errors.lastName && (
                <span className="text-sm text-[#EF4444]">
                  {errors.lastName.message as string}
                </span>
              )}
            </div>
            <div>
              <label
                htmlFor="age"
                className="mb-1 block font-semibold text-[#3B82F6]"
              >
                Возраст
              </label>
              <input
                id="age"
                type="number"
                min="0"
                {...register("age", { valueAsNumber: true })}
                className="w-full rounded border border-[#E5E7EB] bg-[#FFFFFF] px-3 py-2 text-[#1F2937] shadow focus:ring-2 focus:ring-[#3B82F633] focus:outline-none placeholder-[#6B7280]"
                style={{
                  minHeight: "40px",
                  fontSize: "1rem",
                  lineHeight: "1.5",
                  padding: "12px",
                }}
              />
              {errors.age && (
                <span className="text-sm text-[#EF4444]">
                  {errors.age.message as string}
                </span>
              )}
            </div>
            <div>
              <label
                htmlFor="pregnancyWeek"
                className="mb-1 block font-semibold text-[#10B981]"
              >
                Неделя беременности
              </label>
              <input
                id="pregnancyWeek"
                type="number"
                min="1"
                max="42"
                {...register("pregnancyWeek", { valueAsNumber: true })}
                className="w-full rounded border border-[#D1FAE5] bg-[#ECFDF5] px-3 py-2 text-[#065F46] shadow focus:ring-2 focus:ring-[#10B98133] focus:outline-none placeholder-[#6B7280]"
                style={{
                  minHeight: "40px",
                  fontSize: "1rem",
                  lineHeight: "1.5",
                  padding: "12px",
                }}
              />
              {errors.pregnancyWeek && (
                <span className="text-sm text-[#EF4444]">
                  {errors.pregnancyWeek.message as string}
                </span>
              )}
            </div>
          </div>
          <div>
            <label
              htmlFor="information"
              className="mb-1 block font-semibold text-[#2F70AF]"
            >
              Информация
            </label>
            <textarea
              id="information"
              {...register("information")}
              className="w-full resize-none rounded border border-[#E3E8F0] bg-white px-3 py-2 text-[#232946] shadow focus:ring-2 focus:ring-[#3A86FF33] focus:outline-none placeholder-[#B8C1EC]"
              rows={10}
              style={{
                minHeight: "300px",
                fontSize: "1rem",
                lineHeight: "1.5",
                padding: "12px",
              }}
            />
            {errors.information && (
              <span className="text-sm text-[#E94560]">
                {errors.information.message}
              </span>
            )}
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default ModalForm;

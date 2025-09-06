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
    getValues,
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
            className="flex h-28 w-28 cursor-pointer items-center justify-center rounded-full border-2 border-blue-400 bg-gray-200 transition hover:opacity-80"
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
          <span className="mt-2 text-sm text-gray-500">
            Нажмите, чтобы загрузить аватар
          </span>
        </div>
        <div className="grid grid-cols-1 gap-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div>
              <label
                htmlFor="firstname"
                className="mb-1 block font-semibold text-gray-700"
              >
                Имя <span className="text-red-500">*</span>
              </label>
              <input
                id="firstname"
                type="text"
                {...register("firstName")}
                className="w-full rounded border border-blue-400 bg-gray-50 px-3 py-2 text-gray-800 shadow-inner focus:ring-2 focus:ring-blue-500 focus:outline-none"
                style={{
                  minHeight: "40px",
                  fontSize: "1rem",
                  lineHeight: "1.5",
                  padding: "12px",
                  borderColor: "#60a5fa",
                }}
              />
              {errors.firstName && (
                <span className="text-sm text-red-500">
                  {errors.firstName.message as string}
                </span>
              )}
            </div>
            <div>
              <label
                htmlFor="lastname"
                className="mb-1 block font-semibold text-gray-700"
              >
                Фамилия <span className="text-red-500">*</span>
              </label>
              <input
                id="lastname"
                type="text"
                {...register("lastName")}
                className="w-full rounded border border-blue-400 bg-gray-50 px-3 py-2 text-gray-800 shadow-inner focus:ring-2 focus:ring-blue-500 focus:outline-none"
                style={{
                  minHeight: "40px",
                  fontSize: "1rem",
                  lineHeight: "1.5",
                  padding: "12px",
                  borderColor: "#60a5fa",
                }}
              />
              {errors.lastName && (
                <span className="text-sm text-red-500">
                  {errors.lastName.message as string}
                </span>
              )}
            </div>
            <div>
              <label
                htmlFor="age"
                className="mb-1 block font-semibold text-gray-700"
              >
                Возраст
              </label>
              <input
                id="age"
                type="number"
                min="0"
                {...register("age", { valueAsNumber: true })}
                className="w-full rounded border border-blue-400 bg-gray-50 px-3 py-2 text-gray-800 shadow-inner focus:ring-2 focus:ring-blue-500 focus:outline-none"
                style={{
                  minHeight: "40px",
                  fontSize: "1rem",
                  lineHeight: "1.5",
                  padding: "12px",
                  borderColor: "#60a5fa",
                }}
              />
              {errors.age && (
                <span className="text-sm text-red-500">
                  {errors.age.message as string}
                </span>
              )}
            </div>
          </div>
          <div>
            <label
              htmlFor="information"
              className="mb-1 block font-semibold text-gray-700"
            >
              Информация
            </label>
            <textarea
              id="information"
              {...register("information")}
              className="w-full resize-none rounded border border-blue-400 bg-gray-50 px-3 py-2 text-gray-800 shadow-inner focus:ring-2 focus:ring-blue-500 focus:outline-none"
              rows={10}
              style={{
                minHeight: "300px",
                fontSize: "1rem",
                lineHeight: "1.5",
                padding: "12px",
                borderColor: "#60a5fa",
              }}
            />
            {errors.information && (
              <span className="text-sm text-red-500">
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

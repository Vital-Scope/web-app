import { Alert, Button, Input, notification } from "antd";
import {
  Controller,
  useForm,
  type FieldErrors,
  type SubmitHandler,
} from "react-hook-form";
import {
  UserOutlined,
  LockOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

interface FormFields {
  login: string;
  password: string;
}

const AuthPage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>();
  const [api, context] = notification.useNotification();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const openNotification = () => {
    api.error({
      message: "Некорректные данные",
      description: errors.login?.message || errors.password?.message,
      placement: "top",
    });
  };

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    setLoading(true);
    if (data.login === "root" && data.password === "root") {
      api.success({ message: "Авторизация прошла успешно", placement: "top" });
      localStorage.setItem("token", "asdasd");
      setTimeout(() => navigate("/"), 3000);
    }
    setTimeout(() => setLoading(false), 2000);
  };

  const onError = (errors: FieldErrors<FormFields>) => {
    if (errors.login || errors.password) {
      openNotification();
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onError)}
      className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col rounded-xl bg-slate-400/30 p-6 transition-colors hover:bg-slate-400/40"
    >
      {context}
      <p className="text-l mb-2 text-center text-white uppercase select-none">
        Vital Scope
      </p>
      <div className="flex h-[80px] w-xs flex-col justify-around">
        <Controller
          name="login"
          control={control}
          rules={{
            required: "Логин обязателен",
          }}
          render={({ field }) => (
            <Input
              {...field}
              disabled={loading}
              placeholder="Логин"
              variant="outlined"
              prefix={<UserOutlined />}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          rules={{
            required: "Пароль обязателен",
          }}
          render={({ field }) => (
            <Input.Password
              {...field}
              disabled={loading}
              placeholder="Пароль"
              prefix={<LockOutlined />}
            />
          )}
        />
      </div>
      <Button disabled={loading} type="default" htmlType="submit" className="mt-1 ml-auto">
        Вход
      </Button>
    </form>
  );
};

export default AuthPage;

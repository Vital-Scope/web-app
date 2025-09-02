import { Button, ColorPicker } from "antd";
import { AggregationColor } from "antd/es/color-picker/color";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";

interface FormFields {
  heartBeatColor: AggregationColor;
  uterineToneColor: AggregationColor;
}

const SettingsPage = () => {
  const { control, handleSubmit } = useForm<FormFields>({
    defaultValues: {
      heartBeatColor: new AggregationColor("rgb(0, 100, 255)"),
      uterineToneColor: new AggregationColor("rgb(100, 255, 255)"),
    },
  });

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="rounded-2xl bg-slate-800 pb-12 font-sans text-white">
        <h2>Настройки графика</h2>
        <div className="flex items-center">
          <span>ЧСС плода цвет</span>
          <Controller
            control={control}
            name="heartBeatColor"
            render={({ field }) => (
              <ColorPicker
                {...field}
              />
            )}
          />
        </div>
        <div className="flex items-center">
          <span>Тонус матки цвет</span>
          <Controller
            control={control}
            name="uterineToneColor"
            render={({ field }) => (
              <ColorPicker
                {...field}
              />
            )}
          />
        </div>
        <Button htmlType="submit" variant="filled" type="default">
          textasdasdasd
        </Button>
      </div>
    </form>
  );
};

export default SettingsPage;

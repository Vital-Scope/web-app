
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
      heartBeatColor: new AggregationColor("#3A86FF"),
      uterineToneColor: new AggregationColor("#E94560"),
    },
  });

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex justify-center items-center min-h-[80vh]"
    >
      <div
        className="w-full max-w-sm rounded-2xl p-6 font-sans text-[#232946] border bg-white shadow-[0_4px_24px_0_#E3E8F0]"
        style={{
          border: '1.5px solid #E3E8F0',
        }}
      >
        <h2 className="text-xl font-bold mb-7 text-center text-[#3A86FF] tracking-wide">
          Настройки графика
        </h2>
        <div className="space-y-7">
          <div className="flex items-center justify-between gap-4">
            <span className="text-base font-medium text-[#232946]">
              Цвет ЧСС плода
            </span>
            <Controller
              control={control}
              name="heartBeatColor"
              render={({ field }) => (
                <ColorPicker
                  {...field}
                  size="large"
                  showText
                  style={{
                    background: "rgba(30,40,70,0.5)",
                    borderRadius: 12,
                    boxShadow: "0 2px 8px 0 rgba(0,0,0,0.10)",
                  }}
                  presets={[
                    {
                      label: "Фирменные",
                      colors: [
                        "#3A86FF",
                        "#B8C1EC",
                        "#E94560",
                        "#232946",
                        "#B8C1ECcc",
                        "#3A86FFb3",
                        "#E94560b3",
                      ],
                    },
                  ]}
                />
              )}
            />
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-base font-medium text-[#232946]">
              Цвет тонуса матки
            </span>
            <Controller
              control={control}
              name="uterineToneColor"
              render={({ field }) => (
                <ColorPicker
                  {...field}
                  size="large"
                  showText
                  style={{
                    background: "rgba(30,40,70,0.5)",
                    borderRadius: 12,
                    boxShadow: "0 2px 8px 0 rgba(0,0,0,0.10)",
                  }}
                  presets={[
                    {
                      label: "Фирменные",
                      colors: [
                        "#3A86FF",
                        "#B8C1EC",
                        "#E94560",
                        "#232946",
                        "#B8C1ECcc",
                        "#3A86FFb3",
                        "#E94560b3",
                      ],
                    },
                  ]}
                />
              )}
            />
          </div>
        </div>
        <Button
          htmlType="submit"
          type="primary"
          className="w-full mt-8 py-2 rounded-xl bg-gradient-to-r from-[#3A86FF] via-[#B8C1EC] to-[#E94560] text-white font-semibold text-lg border-0 shadow-lg hover:from-[#B8C1EC] hover:to-[#3A86FF] transition-all"
          style={{
            letterSpacing: '0.05em',
          }}
        >
          Сохранить
        </Button>
      </div>
    </form>
  );
};

export default SettingsPage;

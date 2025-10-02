import { ColorPicker, InputNumber, Slider, Divider } from "antd";
import { Controller, type Control } from "react-hook-form";

interface ChartsSettingsProps {
  control: Control<any>;
}

const ChartsSettings: React.FC<ChartsSettingsProps> = ({ control }) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-4 text-lg font-semibold text-gray-800">
          Цвета графиков
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">
              Цвет ЧСС плода
            </span>
            <Controller
              control={control}
              name="heartBeatColor"
              render={({ field }) => (
                <ColorPicker
                  {...field}
                  size="small"
                  showText
                  presets={[
                    {
                      label: "Рекомендуемые",
                      colors: [
                        "#3A86FF",
                        "#10B981",
                        "#F59E0B",
                        "#EF4444",
                        "#8B5CF6",
                      ],
                    },
                  ]}
                />
              )}
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">
              Цвет тонуса матки
            </span>
            <Controller
              control={control}
              name="uterineToneColor"
              render={({ field }) => (
                <ColorPicker
                  {...field}
                  size="small"
                  showText
                  presets={[
                    {
                      label: "Рекомендуемые",
                      colors: [
                        "#E94560",
                        "#F59E0B",
                        "#10B981",
                        "#8B5CF6",
                        "#3A86FF",
                      ],
                    },
                  ]}
                />
              )}
            />
          </div>
        </div>
      </div>

      <Divider />

      <div>
        <h3 className="mb-4 text-lg font-semibold text-gray-800">
          Пороговые значения ЧСС
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Минимальная норма (уд/мин)
            </label>
            <Controller
              control={control}
              name="normalHeartRateMin"
              render={({ field }) => (
                <InputNumber
                  {...field}
                  min={80}
                  max={150}
                  className="w-full"
                  placeholder="110"
                />
              )}
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Максимальная норма (уд/мин)
            </label>
            <Controller
              control={control}
              name="normalHeartRateMax"
              render={({ field }) => (
                <InputNumber
                  {...field}
                  min={150}
                  max={200}
                  className="w-full"
                  placeholder="160"
                />
              )}
            />
          </div>
        </div>
      </div>

      <Divider />

      <div>
        <h3 className="mb-4 text-lg font-semibold text-gray-800">
          Частота обновления
        </h3>
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">
            Интервал обновления данных (мс)
          </label>
          <Controller
            control={control}
            name="refreshInterval"
            render={({ field }) => (
              <Slider
                {...field}
                min={500}
                max={5000}
                step={500}
                marks={{
                  500: "0.5с",
                  1000: "1с",
                  2000: "2с",
                  5000: "5с",
                }}
                tooltip={{ formatter: (value) => `${value}мс` }}
              />
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartsSettings;

import { InputNumber } from "antd";
import { Controller, type Control } from "react-hook-form";

interface MedicalSettingsProps {
  control: Control<any>;
}

const MedicalSettings: React.FC<MedicalSettingsProps> = ({ control }) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Нормальные диапазоны лабораторных показателей</h3>
        <div className="grid grid-cols-1 gap-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-800 mb-3">pH</h4>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-gray-600 mb-1">Минимум</label>
                <Controller
                  control={control}
                  name="phMin"
                  render={({ field }) => (
                    <InputNumber
                      {...field}
                      min={7.0}
                      max={7.5}
                      step={0.01}
                      className="w-full"
                      size="small"
                    />
                  )}
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Максимум</label>
                <Controller
                  control={control}
                  name="phMax"
                  render={({ field }) => (
                    <InputNumber
                      {...field}
                      min={7.0}
                      max={7.5}
                      step={0.01}
                      className="w-full"
                      size="small"
                    />
                  )}
                />
              </div>
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-800 mb-3">Глюкоза (ммоль/л)</h4>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-gray-600 mb-1">Минимум</label>
                <Controller
                  control={control}
                  name="gluMin"
                  render={({ field }) => (
                    <InputNumber
                      {...field}
                      min={2.0}
                      max={6.0}
                      step={0.1}
                      className="w-full"
                      size="small"
                    />
                  )}
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Максимум</label>
                <Controller
                  control={control}
                  name="gluMax"
                  render={({ field }) => (
                    <InputNumber
                      {...field}
                      min={2.0}
                      max={6.0}
                      step={0.1}
                      className="w-full"
                      size="small"
                    />
                  )}
                />
              </div>
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-800 mb-3">CO₂ (мм рт.ст.)</h4>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-gray-600 mb-1">Минимум</label>
                <Controller
                  control={control}
                  name="co2Min"
                  render={({ field }) => (
                    <InputNumber
                      {...field}
                      min={30}
                      max={50}
                      step={1}
                      className="w-full"
                      size="small"
                    />
                  )}
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Максимум</label>
                <Controller
                  control={control}
                  name="co2Max"
                  render={({ field }) => (
                    <InputNumber
                      {...field}
                      min={30}
                      max={50}
                      step={1}
                      className="w-full"
                      size="small"
                    />
                  )}
                />
              </div>
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-800 mb-3">BE (ммоль/л)</h4>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-gray-600 mb-1">Минимум</label>
                <Controller
                  control={control}
                  name="beMin"
                  render={({ field }) => (
                    <InputNumber
                      {...field}
                      min={-5}
                      max={5}
                      step={0.1}
                      className="w-full"
                      size="small"
                    />
                  )}
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Максимум</label>
                <Controller
                  control={control}
                  name="beMax"
                  render={({ field }) => (
                    <InputNumber
                      {...field}
                      min={-5}
                      max={5}
                      step={0.1}
                      className="w-full"
                      size="small"
                    />
                  )}
                />
              </div>
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-800 mb-3">Лактат (ммоль/л)</h4>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-gray-600 mb-1">Минимум</label>
                <Controller
                  control={control}
                  name="lacMin"
                  render={({ field }) => (
                    <InputNumber
                      {...field}
                      min={0.1}
                      max={3.0}
                      step={0.1}
                      className="w-full"
                      size="small"
                    />
                  )}
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Максимум</label>
                <Controller
                  control={control}
                  name="lacMax"
                  render={({ field }) => (
                    <InputNumber
                      {...field}
                      min={0.1}
                      max={3.0}
                      step={0.1}
                      className="w-full"
                      size="small"
                    />
                  )}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalSettings;

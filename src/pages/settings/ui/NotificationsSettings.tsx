import { Switch, Slider, Divider } from "antd";
import { Controller, type Control } from "react-hook-form";

interface NotificationsSettingsProps {
  control: Control<any>;
}

const NotificationsSettings: React.FC<NotificationsSettingsProps> = ({ control }) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Типы уведомлений</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm font-medium text-gray-700">Звуковые уведомления</span>
              <p className="text-xs text-gray-500">Воспроизводить звук при критических событиях</p>
            </div>
            <Controller
              control={control}
              name="soundEnabled"
              render={({ field }) => (
                <Switch {...field} checked={field.value} />
              )}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm font-medium text-gray-700">Критические алерты</span>
              <p className="text-xs text-gray-500">Показывать всплывающие уведомления</p>
            </div>
            <Controller
              control={control}
              name="criticalAlertsEnabled"
              render={({ field }) => (
                <Switch {...field} checked={field.value} />
              )}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm font-medium text-gray-700">Email уведомления</span>
              <p className="text-xs text-gray-500">Отправлять уведомления на почту</p>
            </div>
            <Controller
              control={control}
              name="emailNotifications"
              render={({ field }) => (
                <Switch {...field} checked={field.value} />
              )}
            />
          </div>
        </div>
      </div>

      <Divider />

      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Пороги срабатывания</h3>
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">
            Порог риска для уведомлений (%)
          </label>
          <Controller
            control={control}
            name="alertThreshold"
            render={({ field }) => (
              <Slider
                {...field}
                min={50}
                max={95}
                step={5}
                marks={{
                  50: '50%',
                  70: '70%',
                  80: '80%',
                  90: '90%',
                  95: '95%',
                }}
                tooltip={{ formatter: (value) => `${value}%` }}
              />
            )}
          />
          <p className="text-xs text-gray-500">
            Уведомления будут отправляться при превышении этого порога вероятности отклонений
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotificationsSettings;

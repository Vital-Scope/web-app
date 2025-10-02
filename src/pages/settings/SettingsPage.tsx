import { Button } from "antd";
import { AggregationColor } from "antd/es/color-picker/color";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { BellOutlined, LineChartOutlined, ExperimentOutlined } from "@ant-design/icons";
import { ChartsSettings, NotificationsSettings, MedicalSettings } from "./ui";

interface FormFields {
  heartBeatColor: AggregationColor;
  uterineToneColor: AggregationColor;
  normalHeartRateMin: number;
  normalHeartRateMax: number;
  refreshInterval: number;
  
  soundEnabled: boolean;
  criticalAlertsEnabled: boolean;
  emailNotifications: boolean;
  alertThreshold: number;
  
  phMin: number;
  phMax: number;
  gluMin: number;
  gluMax: number;
  co2Min: number;
  co2Max: number;
  beMin: number;
  beMax: number;
  lacMin: number;
  lacMax: number;
}

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState<'charts' | 'notifications' | 'medical'>('charts');
  
  const { control, handleSubmit } = useForm<FormFields>({
    defaultValues: {
      heartBeatColor: new AggregationColor("#3A86FF"),
      uterineToneColor: new AggregationColor("#E94560"),
      normalHeartRateMin: 110,
      normalHeartRateMax: 160,
      refreshInterval: 1000,
      
      soundEnabled: true,
      criticalAlertsEnabled: true,
      emailNotifications: false,
      alertThreshold: 80,
      
      phMin: 7.25,
      phMax: 7.45,
      gluMin: 3.3,
      gluMax: 5.5,
      co2Min: 35,
      co2Max: 45,
      beMin: -2,
      beMax: 2,
      lacMin: 0.5,
      lacMax: 2.2,
    },
  });

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    console.log(data);
  };

  const tabs = [
    { key: 'charts', label: 'Графики', icon: <LineChartOutlined /> },
    { key: 'notifications', label: 'Уведомления', icon: <BellOutlined /> },
    { key: 'medical', label: 'Медицинские', icon: <ExperimentOutlined /> },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'charts':
        return <ChartsSettings control={control} />;
      case 'notifications':
        return <NotificationsSettings control={control} />;
      case 'medical':
        return <MedicalSettings control={control} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="border-b border-gray-200 px-6 py-4">
            <h1 className="text-2xl font-bold text-gray-900">Настройки системы</h1>
            <p className="text-sm text-gray-600 mt-1">
              Настройте параметры мониторинга и уведомлений
            </p>
          </div>

          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as any)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 transition-colors ${
                    activeTab === tab.key
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col h-[600px]">
            <div className="flex-1 p-6 overflow-y-auto">
              {renderContent()}
            </div>

            <div className="border-t border-gray-200 p-6">
              <div className="flex justify-end">
                <Button
                  htmlType="submit"
                  type="primary"
                  size="large"
                  className="px-8"
                >
                  Сохранить настройки
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
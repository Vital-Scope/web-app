import { BarChartOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import React, { useState, useEffect, useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import { updateMonitoring } from "../../../../service/monitoring/api";

interface FormData {
  pregnancyWeek: string | number;
  percent: string | number;
  diagnosis: string;
  notes: string;
  ph: string | number;
  glu: string | number;
  сarbonDioxide: string | number;
  be: string | number;
  lac: string | number;
}

interface MonitoringInfoProps {
  monitoringId?: string;
  dateStart?: number | null;
  dateEnd?: number | null;
  pregnancyWeek?: number | null;
  status?: string | null;
  result?: string | null;
  percent?: number | null;
  diagnosis?: string;
  notes?: string;
  medicalTests?: {
    ph: number | null;
    glu: number | null;
    сarbonDioxide: number | null;
    be: number | null;
    lac: number | null;
  } | null;
}

const MEDICAL_TESTS = [
  { name: "ph", label: "pH", normal: "7.25-7.45" },
  { name: "glu", label: "Glu", normal: "3.3-5.5" },
  { name: "сarbonDioxide", label: "CO₂", normal: "35-45" },
  { name: "be", label: "BE", normal: "-2/+2" },
  { name: "lac", label: "Lac", normal: "0.5-2.2" }
];

const MonitoringInfo: React.FC<MonitoringInfoProps> = ({
  monitoringId,
  dateStart,
  dateEnd,
  pregnancyWeek,
  status,
  result,
  percent,
  diagnosis = "",
  notes = "",
  medicalTests,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const getDefaultValues = useCallback(() => ({
    pregnancyWeek: pregnancyWeek || "",
    percent: percent || "",
    diagnosis,
    notes,
    ph: medicalTests?.ph || "",
    glu: medicalTests?.glu || "",
    сarbonDioxide: medicalTests?.сarbonDioxide || "",
    be: medicalTests?.be || "",
    lac: medicalTests?.lac || "",
  }), [pregnancyWeek, percent, diagnosis, notes, medicalTests]);

  const { control, handleSubmit, reset, formState: { isDirty } } = useForm({
    defaultValues: getDefaultValues(),
  });

  useEffect(() => {
    reset(getDefaultValues());
  }, [getDefaultValues, reset]);

  const formatDateTime = (timestamp: number | null) => {
    if (!timestamp) return { date: "—", time: "" };
    const date = new Date(timestamp * 1000);
    return {
      date: date.toLocaleDateString("ru-RU"),
      time: date.toLocaleTimeString("ru-RU", { hour: '2-digit', minute: '2-digit' })
    };
  };

  const calculateDuration = () => {
    if (dateStart && dateEnd) {
      return `${Math.round((dateEnd - dateStart) / 60)} мин`;
    }
    if (dateStart) {
      return `${Math.round((Date.now() / 1000 - dateStart) / 60)} мин`;
    }
    return "—";
  };

  const getResultColor = (result: string | null) => {
    const colors = {
      Regular: "bg-green-50 border-green-200 text-green-800",
      Risk: "bg-yellow-50 border-yellow-200 text-yellow-800",
      Hypoxia: "bg-red-50 border-red-200 text-red-800",
    };
    return colors[result as keyof typeof colors] || "bg-gray-50 border-gray-200 text-gray-600";
  };

  const getResultText = (result: string | null) => {
    const texts = {
      Regular: "В НОРМЕ",
      Risk: "РИСК",
      Hypoxia: "ГИПОКСИЯ",
    };
    return texts[result as keyof typeof texts] || "НЕ ОПРЕДЕЛЕН";
  };

  const getStatusStyles = (status: string | null) => {
    return status === "Active" 
      ? "bg-blue-100 text-blue-800" 
      : "bg-gray-100 text-gray-600";
  };

  const getStatusText = (status: string | null) => {
    return status === "Active" ? "🟢 АКТИВЕН" : "ЗАВЕРШЁН";
  };

  const getSaveButtonStyles = () => {
    return isDirty && !isLoading 
      ? "bg-blue-600 hover:bg-blue-700 border-blue-600 hover:border-blue-700" 
      : "bg-gray-400 border-gray-400 cursor-not-allowed";
  };

  const transformFormData = (data: FormData) => ({
    dateStart: dateStart || null,
    dateEnd: dateEnd || null,
    pregnancyWeek: data.pregnancyWeek ? Number(data.pregnancyWeek) : null,
    status: status as "Active" | "Completed" | null,
    result: result as "Regular" | "Risk" | "Hypoxia" | null,
    percent: data.percent ? Number(data.percent) : null,
    medicalTests: {
      ph: data.ph ? Number(data.ph) : null,
      glu: data.glu ? Number(data.glu) : null,
      сarbonDioxide: data.сarbonDioxide ? Number(data.сarbonDioxide) : null,
      be: data.be ? Number(data.be) : null,
      lac: data.lac ? Number(data.lac) : null,
    },
    diagnosis: data.diagnosis || "",
    notes: data.notes || null,
  });

  const onSubmit = async (data: FormData) => {
    if (!monitoringId) {
      console.error("Monitoring ID is required");
      return;
    }

    setIsLoading(true);
    try {
      const monitoringData = transformFormData(data);
      const updateResult = await updateMonitoring(monitoringId, monitoringData);
      
      if (updateResult) {
        reset(data);
      }
    } catch (error) {
      console.error("Error updating monitoring:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const startDateTime = formatDateTime(dateStart ?? null);
  const endDateTime = formatDateTime(dateEnd ?? null);
  const duration = calculateDuration();

  return (
    <div className="rounded-lg bg-white border border-gray-200 p-4 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <BarChartOutlined className="text-lg text-blue-600" />
          <h2 className="text-lg font-bold text-gray-900">Мониторинг</h2>
        </div>
        
        <div className="flex items-center gap-2">
          {status && (
            <div className={`px-3 py-1 rounded-md font-medium text-xs ${getStatusStyles(status)}`}>
              {getStatusText(status)}
            </div>
          )}
          
          {result && (
            <div className={`px-3 py-1 rounded-md font-bold text-xs ${getResultColor(result)}`}>
              {getResultText(result)}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 mb-4">
        <div className="bg-gray-50 rounded p-3">
          <div className="text-xs text-gray-600">Начало</div>
          <div className="font-semibold text-sm">{startDateTime.date}</div>
          <div className="text-xs text-gray-500">{startDateTime.time}</div>
        </div>

        <div className="bg-gray-50 rounded p-3">
          <div className="text-xs text-gray-600">Окончание</div>
          <div className="font-semibold text-sm">{endDateTime.date}</div>
          <div className="text-xs text-gray-500">{endDateTime.time}</div>
        </div>

        <div className="bg-gray-50 rounded p-3">
          <div className="text-xs text-gray-600">Длительность</div>
          <div className="font-semibold text-sm">{duration}</div>
        </div>

        <div className="bg-blue-50 rounded p-3">
          <div className="text-xs text-blue-700 mb-1">Неделя</div>
          <Controller
            name="pregnancyWeek"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                size="small"
                placeholder="нед."
                className="text-sm font-semibold"
                type="number"
                min="1"
                max="42"
              />
            )}
          />
        </div>

        <div className="bg-green-50 rounded p-3">
          <div className="text-xs text-green-700 mb-1">Процент</div>
          <Controller
            name="percent"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                size="small"
                placeholder="0.00"
                className="text-sm font-semibold"
                type="number"
                step="0.01"
                min="0"
                max="100"
              />
            )}
          />
        </div>
      </div>

      <div className="mb-4">
        <div className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1">
          🧪 Лабораторные показатели
        </div>
        
        <div className="grid grid-cols-5 gap-2">
          {MEDICAL_TESTS.map((test) => (
            <div key={test.name} className="bg-gray-50 rounded p-2">
              <div className="text-xs font-medium text-gray-700 mb-1">{test.label}</div>
              <Controller
                name={test.name as keyof FormData}
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    size="small"
                    placeholder="—"
                    className="text-sm font-medium"
                    type="number"
                    step="0.01"
                  />
                )}
              />
              <div className="text-xs text-gray-500 mt-1">{test.normal}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="relative">
        <div className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1">
          📝 Клинические данные
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-gray-600 mb-1">Диагноз</label>
            <Controller
              name="diagnosis"
              control={control}
              render={({ field }) => (
                <textarea
                  {...field}
                  className="w-full h-20 p-3 border border-gray-300 rounded text-sm resize-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Введите предварительный диагноз..."
                />
              )}
            />
          </div>

          <div>
            <label className="block text-xs text-gray-600 mb-1">Примечания врача</label>
            <Controller
              name="notes"
              control={control}
              render={({ field }) => (
                <textarea
                  {...field}
                  className="w-full h-20 p-3 border border-gray-300 rounded text-sm resize-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Дополнительные наблюдения, рекомендации..."
                />
              )}
            />
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <Button
            type="primary"
            size="small"
            className={`transition-all duration-200 ${getSaveButtonStyles()}`}
            onClick={handleSubmit(onSubmit)}
            loading={isLoading}
            disabled={!isDirty || isLoading || !monitoringId}
          >
            {isLoading ? "Сохранение..." : "Сохранить"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MonitoringInfo;
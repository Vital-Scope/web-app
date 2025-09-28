import { BarChartOutlined } from "@ant-design/icons";
import { Badge, Button, Input } from "antd";
import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";

interface MonitoringInfoProps {
  dateStart?: number | null;
  dateEnd?: number | null;
  status?: string | null;
  result?: string | null;
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

const MonitoringInfo: React.FC<MonitoringInfoProps> = ({
  dateStart,
  dateEnd,
  status,
  result,
  diagnosis = "",
  notes = "",
  medicalTests,
}) => {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      diagnosis: diagnosis,
      notes: notes,
      ph: medicalTests?.ph || "",
      glu: medicalTests?.glu || "",
      сarbonDioxide: medicalTests?.сarbonDioxide || "",
      be: medicalTests?.be || "",
      lac: medicalTests?.lac || "",
    },
  });

  useEffect(() => {
    reset({
      diagnosis: diagnosis,
      notes: notes,
      ph: medicalTests?.ph || "",
      glu: medicalTests?.glu || "",
      сarbonDioxide: medicalTests?.сarbonDioxide || "",
      be: medicalTests?.be || "",
      lac: medicalTests?.lac || "",
    });
  }, [diagnosis, notes, medicalTests, reset]);

  const onSubmit = (data: any) => {
    console.log("Form data:", data);
  };

  return (
    <div className="rounded-lg border border-[#E5E7EB] bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-center gap-2">
        <BarChartOutlined className="text-[#8B5CF6]" />
        <h2 className="text-lg font-semibold text-[#1F2937]">Мониторинг</h2>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="space-y-4">
          <div>
            <div className="mb-2 text-xs text-[#6B7280]">Временные рамки</div>
            <div className="space-y-2 text-sm">
              <div>
                <div className="text-xs text-[#6B7280]">Дата начала</div>
                <div className="font-medium text-[#1F2937]">
                  {dateStart
                    ? new Date(dateStart * 1000).toLocaleString("ru-RU")
                    : "—"}
                </div>
              </div>
              <div>
                <div className="text-xs text-[#6B7280]">Дата окончания</div>
                <div className="font-medium text-[#1F2937]">
                  {dateEnd
                    ? new Date(dateEnd * 1000).toLocaleString("ru-RU")
                    : "—"}
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="space-y-2">
              {status && (
                <div>
                  <div className="mb-1 text-xs text-[#6B7280]">
                    Статус мониторинга
                  </div>
                  <Badge
                    color={status === "Active" ? "#3B82F6" : "#6B7280"}
                    text={status === "Active" ? "Активен" : "Завершён"}
                    className="w-fit"
                  />
                </div>
              )}
              {result && (
                <div>
                  <div className="mb-1 text-xs text-[#6B7280]">
                    Результат анализа
                  </div>
                  <Badge
                    color={
                      result === "Regular"
                        ? "#10B981"
                        : result === "Risk"
                          ? "#FBBF24"
                          : "#EF4444"
                    }
                    text={
                      result === "Regular"
                        ? "В норме"
                        : result === "Risk"
                          ? "Риск"
                          : "Гипоксия"
                    }
                    className="w-fit"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        <div>
          <div className="mb-2 text-xs text-[#6B7280]">Медицинские тесты</div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <div className="mb-1 text-xs text-[#6B7280]">pH</div>
              <Controller
                name="ph"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    size="small"
                    placeholder="—"
                    className="text-sm"
                  />
                )}
              />
            </div>
            <div>
              <div className="mb-1 text-xs text-[#6B7280]">Glu</div>
              <Controller
                name="glu"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    size="small"
                    placeholder="—"
                    className="text-sm"
                  />
                )}
              />
            </div>
            <div>
              <div className="mb-1 text-xs text-[#6B7280]">CO₂</div>
              <Controller
                name="сarbonDioxide"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    size="small"
                    placeholder="—"
                    className="text-sm"
                  />
                )}
              />
            </div>
            <div>
              <div className="mb-1 text-xs text-[#6B7280]">BE</div>
              <Controller
                name="be"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    size="small"
                    placeholder="—"
                    className="text-sm"
                  />
                )}
              />
            </div>
            <div className="col-span-2">
              <div className="mb-1 text-xs text-[#6B7280]">Lac</div>
              <Controller
                name="lac"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    size="small"
                    placeholder="—"
                    className="text-sm"
                  />
                )}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div>
          <div className="mb-2 text-xs text-[#6B7280]">Диагноз</div>
          <Controller
            name="diagnosis"
            control={control}
            render={({ field }) => (
              <textarea
                {...field}
                className="min-h-[80px] w-full resize-y rounded border border-[#E5E7EB] p-2 text-sm text-[#1F2937] focus:border-[#8B5CF6] focus:outline-none"
                placeholder="Введите диагноз..."
              />
            )}
          />
        </div>

        <div>
          <div className="mb-2 text-xs text-[#6B7280]">Примечания</div>
          <Controller
            name="notes"
            control={control}
            render={({ field }) => (
              <textarea
                {...field}
                className="min-h-[80px] w-full resize-y rounded border border-[#E5E7EB] p-2 text-sm text-[#1F2937] focus:border-[#8B5CF6] focus:outline-none"
                placeholder="Добавьте примечания..."
              />
            )}
          />
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <Button
          type="primary"
          className="h-auto border-[#8B5CF6] bg-[#8B5CF6] px-4 py-1 text-sm hover:border-[#7C3AED] hover:bg-[#7C3AED]"
          onClick={handleSubmit(onSubmit)}
        >
          Сохранить
        </Button>
      </div>
    </div>
  );
};

export default MonitoringInfo;

import { useQuery } from "@tanstack/react-query";
import { getMonitorings } from "../../service/monitoring/api";
import { getPatients } from "../../service/patients";
import { useSessionStore } from "../../store/useSessionStore";
import { Link } from "react-router-dom";
import { useMemo } from "react";
import { HeartIcon, UsersIcon, CheckIcon, DeviceIcon } from "./ui";

const DashboardPage = () => {
  const { data: sessionData, deviceStatus, deviceLoading } = useSessionStore();

  const { data: monitorings = [] } = useQuery({
    queryKey: ["monitorings"],
    queryFn: getMonitorings,
  });

  const { data: patients = [] } = useQuery({
    queryKey: ["patients"],
    queryFn: getPatients,
  });

  const stats = useMemo(() => {
    const activeMonitorings = monitorings.filter(
      (m) => m.status === "Active",
    ).length;
    const completedMonitorings = monitorings.filter(
      (m) => m.status === "Completed",
    ).length;
    const totalPatients = Array.isArray(patients) ? patients.length : 0;

    const results = monitorings.reduce(
      (acc, m) => {
        if (m.result) acc[m.result] = (acc[m.result] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );

    // Мониторинги за сегодня
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayTimestamp = Math.floor(today.getTime() / 1000);
    const todayMonitorings = monitorings.filter(m => 
      m.dateStart && m.dateStart >= todayTimestamp
    ).length;

    return {
      totalPatients,
      activeMonitorings,
      completedMonitorings,
      totalMonitorings: monitorings.length,
      todayMonitorings,
      results,
    };
  }, [monitorings, patients]);

  const recentMonitorings = useMemo(() => {
    return monitorings
      .sort((a, b) => (b.dateStart || 0) - (a.dateStart || 0))
      .slice(0, 5);
  }, [monitorings]);

  const StatCard = ({
    title,
    value,
    subtitle,
    color,
    icon,
  }: {
    title: string;
    value: string | number;
    subtitle?: string;
    color: string;
    icon: React.ReactNode;
  }) => (
    <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm transition-all hover:shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-[#6B7280]">{title}</p>
          <p className={`text-3xl font-bold ${color}`}>{value}</p>
          {subtitle && (
            <p className="mt-1 text-xs text-[#6B7280]">{subtitle}</p>
          )}
        </div>
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-xl ${color.replace("text-", "bg-").replace("[#", "[#").replace("]", "]/10]")}`}
        >
          {icon}
        </div>
      </div>
    </div>
  );


  const formatDate = (timestamp: number | null) => {
    if (!timestamp) return "—";
    return new Date(timestamp * 1000).toLocaleDateString("ru-RU");
  };

  const getResultColor = (result: string | null) => {
    switch (result) {
      case "Regular":
        return "text-[#10B981]";
      case "Risk":
        return "text-[#F59E0B]";
      case "Hypoxia":
        return "text-[#EF4444]";
      default:
        return "text-[#6B7280]";
    }
  };

  const getResultText = (result: string | null) => {
    switch (result) {
      case "Regular":
        return "Норма";
      case "Risk":
        return "Риск";
      case "Hypoxia":
        return "Гипоксия";
      default:
        return "—";
    }
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#1F2937]">Дашборд</h1>
          <p className="mt-2 text-[#6B7280]">Обзор системы мониторинга</p>
        </div>

        {sessionData?.status === "Active" && (
          <div className="mb-8 rounded-2xl border border-[#3B82F6] bg-gradient-to-r from-[#3B82F6]/5 to-[#8B5CF6]/5 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-[#3B82F6]">
                  Активный мониторинг
                </h3>
                <p className="text-[#6B7280]">
                  Пациент: {sessionData.lastName} {sessionData.firstName}
                </p>
              </div>
              <Link
                to={`/monitoring/${sessionData.monitoringId}`}
                className="rounded-lg bg-[#3B82F6] px-4 py-2 text-white transition hover:bg-[#2563EB]"
              >
                Перейти к мониторингу
              </Link>
            </div>
          </div>
        )}

        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Всего пациентов"
            value={stats.totalPatients}
            color="text-[#3B82F6]"
            icon={<UsersIcon />}
          />
          <StatCard
            title="Мониторинги за сегодня"
            value={stats.todayMonitorings}
            subtitle="новых сессий"
            color="text-[#10B981]"
            icon={<HeartIcon />}
          />
          <StatCard
            title="Завершенные"
            value={stats.completedMonitorings}
            color="text-[#8B5CF6]"
            icon={<CheckIcon />}
          />
          <StatCard
            title="Всего мониторингов"
            value={stats.totalMonitorings}
            color="text-[#F472B6]"
            icon={<HeartIcon />}
          />
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm">
              <h3 className="mb-6 text-lg font-semibold text-[#1F2937]">
                Последние мониторинги
              </h3>
              <div className="space-y-4">
                {recentMonitorings.length > 0 ? (
                  recentMonitorings.map((monitoring) => (
                    <Link
                      key={monitoring.id}
                      to={`/monitoring/${monitoring.id}`}
                      className="block rounded-lg border border-[#E5E7EB] p-4 transition hover:bg-[#F9FAFB]"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-[#1F2937]">
                            {monitoring.fullName}
                          </p>
                          <p className="text-sm text-[#6B7280]">
                            {formatDate(monitoring.dateStart)}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          {monitoring.result && (
                            <span
                              className={`text-sm font-medium ${getResultColor(monitoring.result)}`}
                            >
                              {getResultText(monitoring.result)}
                            </span>
                          )}
                          {monitoring.percent && (
                            <span className="rounded-full bg-[#F59E0B]/10 px-2 py-1 text-xs font-medium text-[#F59E0B]">
                              {(monitoring.percent * 100).toFixed(1)}%
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))
                ) : (
                  <p className="py-8 text-center text-[#6B7280]">
                    Нет данных о мониторингах
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-semibold text-[#1F2937]">
                Статус системы
              </h3>
              <div className="flex items-center justify-between rounded-lg bg-[#F9FAFB] p-4">
                <div className="flex items-center gap-3">
                  <div className={`${deviceStatus ? "text-[#10B981]" : "text-[#EF4444]"}`}>
                    <DeviceIcon />
                  </div>
                  <div>
                    <p className="font-medium text-[#1F2937]">Оборудование</p>
                    <p className="text-sm text-[#6B7280]">
                      {deviceStatus ? "Подключение активно" : "Нет соединения"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {deviceLoading ? (
                    <div className="h-3 w-3 animate-pulse rounded-full bg-[#6B7280]"></div>
                  ) : (
                    <div className={`h-3 w-3 rounded-full ${deviceStatus ? "bg-[#10B981]" : "bg-[#EF4444]"}`}></div>
                  )}
                  <span className={`text-sm font-medium ${deviceStatus ? "text-[#10B981]" : "text-[#EF4444]"}`}>
                    {deviceLoading ? "Проверка..." : (deviceStatus ? "Готово" : "Отключено")}
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-semibold text-[#1F2937]">
                Распределение результатов
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#6B7280]">Норма</span>
                  <span className="font-medium text-[#10B981]">
                    {stats.results.Regular || 0}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#6B7280]">Риск</span>
                  <span className="font-medium text-[#F59E0B]">
                    {stats.results.Risk || 0}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#6B7280]">Гипоксия</span>
                  <span className="font-medium text-[#EF4444]">
                    {stats.results.Hypoxia || 0}
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-semibold text-[#1F2937]">
                Быстрые действия
              </h3>
              <div className="space-y-3">
                <Link
                  to="/patients/create"
                  className="block rounded-lg bg-[#3B82F6] px-4 py-3 text-center text-white transition hover:bg-[#2563EB]"
                >
                  Добавить пациента
                </Link>
                <Link
                  to="/monitoring"
                  className="block rounded-lg border border-[#8B5CF6] px-4 py-3 text-center text-[#8B5CF6] transition hover:bg-[#8B5CF6]/5"
                >
                  Все мониторинги
                </Link>
                <Link
                  to="/settings"
                  className="block rounded-lg border border-[#6B7280] px-4 py-3 text-center text-[#6B7280] transition hover:bg-[#F3F4F6]"
                >
                  Настройки
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

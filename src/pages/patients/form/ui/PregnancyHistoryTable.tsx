import React from "react";
import { Table } from "antd";
import InfoLabel from "../../../../components/ui/InfoLabel";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

export type PregnancyHistoryRow = {
  id: string;
  number: number;
  dateStart: number;
  dateEnd: number | null;
  pregnancyWeek: number;
  status: "active" | "completed" | null;
  result: string | null;
  percent: number | null;
};

const statusMap: Record<string, { label: string; color: "blue" | "gray" }> = {
  active: {
    label: "Активен",
    color: "blue",
  },
  completed: {
    label: "Завершён",
    color: "gray",
  },
};

const resultLabelMap: Record<
  string,
  { label: string; color: "green" | "red" | "orange" }
> = {
  Regular: { label: "В норме", color: "green" },
  Hypoxia: { label: "Гипоксия", color: "red" },
  Risk: { label: "Риск", color: "orange" },
};

const columns = [
  {
    title: "№",
    dataIndex: "number",
    key: "number",
    width: 60,
    render: (value: number) => (
      <span className="font-semibold text-[#1F2937]">{value}</span>
    ),
  },
  {
    title: "Дата начала",
    dataIndex: "dateStart",
    key: "dateStart",
    render: (value: number) => (
      <span className="text-[#6B7280]">
        {value ? new Date(value * 1000).toLocaleDateString("ru-RU") : "-"}
      </span>
    ),
  },
  {
    title: "Дата окончания",
    dataIndex: "dateEnd",
    key: "dateEnd",
    render: (value: number | null) => (
      <span className="text-[#6B7280]">
        {value ? new Date(value * 1000).toLocaleDateString("ru-RU") : "-"}
      </span>
    ),
  },
  {
    title: "Неделя беременности",
    dataIndex: "pregnancyWeek",
    key: "pregnancyWeek",
    render: (value: number) => (
      <span className="font-medium text-[#1F2937]">{value} нед.</span>
    ),
  },
  {
    title: "Статус мониторинга",
    dataIndex: "status",
    key: "status",
    render: (status: string) => {
      const info = status ? statusMap[status] : undefined;
      return info ? (
        <div className="flex flex-col gap-1">
          <InfoLabel color={info.color}>{info.label}</InfoLabel>
          <span className="text-xs text-[#6B7280]">Статус</span>
        </div>
      ) : (
        <span className="text-[#6B7280]">-</span>
      );
    },
  },
  {
    title: "Результат анализа",
    dataIndex: "result",
    key: "result",
    render: (value: string | null) => {
      const info = value && resultLabelMap[value];
      return info ? (
        <div className="flex flex-col gap-1">
          <InfoLabel color={info.color}>{info.label}</InfoLabel>
          <span className="text-xs text-[#6B7280]">Результат</span>
        </div>
      ) : (
        <span className="text-[#6B7280]">-</span>
      );
    },
  },
  {
    title: "Процент",
    dataIndex: "percent",
    key: "percent",
    render: (value: number | null) => (
      <span className="font-medium text-[#1F2937]">
        {value !== null ? `${value.toFixed(2)}%` : "-"}
      </span>
    ),
  },
];

interface Props {
  data: PregnancyHistoryRow[];
}

const PregnancyHistoryTable: React.FC<Props> = ({ data }) => {
  const navigate = useNavigate();
  return (
    <div className="overflow-hidden rounded-xl border border-[#E5E7EB] bg-white">
      <Table
        columns={columns}
        dataSource={data}
        rowKey="number"
        pagination={false}
        bordered={false}
        showHeader={true}
        className="monitoring-table"
        style={{
          background: "#fff",
        }}
        locale={{
          emptyText: (
            <div className="py-8 text-center">
              <div className="text-sm text-[#6B7280]">
                Нет данных для отображения
              </div>
              <div className="mt-1 text-xs text-[#9CA3AF]">
                Добавьте первый мониторинг
              </div>
            </div>
          ),
          filterConfirm: "ОК",
          filterReset: "Сбросить",
          selectAll: "Выбрать все",
          selectInvert: "Инвертировать выбор",
          sortTitle: "Сортировка",
          triggerDesc: "Сортировать по убыванию",
          triggerAsc: "Сортировать по возрастанию",
          cancelSort: "Отменить сортировку",
        }}
        onRow={(record: any) => ({
          onClick: () => {
            if (record.id) {
              navigate(`/monitoring/${record.id}`);
            }
          },
          className:
            "hover:bg-[#F9FAFB] transition-colors duration-150 cursor-pointer",
        })}
        components={{
          header: {
            cell: (props: any) => (
              <th
                {...props}
                className="border-b border-[#E5E7EB] bg-[#F9FAFB] px-4 py-3 text-left text-xs font-semibold tracking-wider text-[#6B7280] uppercase"
              />
            ),
          },
          body: {
            cell: (props: any) => (
              <td
                {...props}
                className="border-b border-[#F3F4F6] px-4 py-3 text-sm"
              />
            ),
          },
        }}
      />
    </div>
  );
};

export default PregnancyHistoryTable;

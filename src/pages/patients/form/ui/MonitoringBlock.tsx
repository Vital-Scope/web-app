import React from "react";
import { BarChartOutlined } from "@ant-design/icons";
import PregnancyHistoryTable, { type PregnancyHistoryRow } from "./PregnancyHistoryTable";

interface Props {
  data: PregnancyHistoryRow[];
}

const MonitoringBlock: React.FC<Props> = ({ data }) => (
  <div className="w-full max-w-6xl bg-white rounded-2xl border-2 border-[#E5E7EB] p-6 shadow transition-colors duration-200 hover:border-[#8B5CF6] focus-within:border-[#8B5CF6]">
    <div className="mb-6 flex items-center gap-3">
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#8B5CF6] text-lg text-white shadow-sm">
        <BarChartOutlined />
      </span>
      <div>
        <h3 className="font-bold text-[#8B5CF6] text-xl">Мониторинги</h3>
        <p className="text-sm text-[#6B7280]">История мониторинга беременности</p>
      </div>
    </div>
    
    <PregnancyHistoryTable data={data} />
  </div>
);

export default MonitoringBlock;

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useMemo, useState } from "react";
import Plot from "react-plotly.js";
import type { MonitoringModel } from "../../models/Monitoring";
import mapMonitoring from "../../models/Monitoring";

const Monitoring = () => {
  const { data: Data } = useQuery({
    queryKey: ["getMonitoringData"],
    queryFn: async () => {
      try {
        const url = import.meta.env.VITE_API_URL + `/id`;
        const res = await axios.get<MonitoringModel>(url, {
          params: {
            id: "6c1e77c0-2ad9-48f2-b9cf-112e9a596f70",
          },
        });
        return mapMonitoring(res.data).values.filter((val) => val.value);
      } catch (error) {
        console.error(error);
      }
    },
  });

  const first_xarr = useMemo(() => {
    return Data?.filter((val) => !val.channelType).map((val) => val.date);
  }, [Data]);

  const first_yarr = useMemo(() => {
    return Data?.filter((val) => !val.channelType).map((val) => val.value);
  }, [Data]);

  const second_xarr = useMemo(() => {
    return Data?.filter((val) => !val.channelType).map((val) => val.date);
  }, [Data]);

  const second_yarr = useMemo(() => {
    return Data?.filter((val) => val.channelType).map((val) => val.value);
  }, [Data]);

  const [layout, setLayout] = useState<any>({
      title: { text: "Мониторинг", font: { color: "white" } },
    paper_bgcolor: "rgba(255, 255, 255, 0.3)",
    plot_bgcolor: "transparent",
    xaxis: {
      showgrid: true,
      linecolor: "white",
      tickfont: { color: "white" }, // ← Цвет цифр по X
      title: { font: { color: "green" } }, // Цвет названия оси X
    },
    yaxis: {
      showgrid: true,
      linecolor: "white",
      tickfont: { color: "white" }, // ← Цвет цифр по Y
      title: { font: { color: "orange" } }, // Цвет названия оси Y
    },
    shapes: [
      {
        type: "rect",
        xref: "paper", // используем относительные координаты по оси X
        yref: "y", // используем абсолютные значения по оси Y
        x0: 0, // начало по X (левая граница графика)
        x1: 1, // конец по X (правая граница графика)
        y0: 110, // нижняя граница референсной зоны
        y1: 160, // верхняя граница референсной зоны
        fillcolor: "rgba(0, 255, 0, 0.3)", // зеленый с прозрачностью
        line: {
          width: 0, // убираем границу
        },
        layer: "below", // рисуем под графиком
      },
      {
        type: "rect",
        xref: "paper", // используем относительные координаты по оси X
        yref: "y", // используем абсолютные значения по оси Y
        x0: 0, // начало по X (левая граница графика)
        x1: 1, // конец по X (правая граница графика)
        y0: 160, // нижняя граница референсной зоны
        y1: 300, // верхняя граница референсной зоны
        fillcolor: "rgba(255, 0, 0, 0.3)", // зеленый с прозрачностью
        line: {
          width: 0, // убираем границу
        },
        layer: "below", // рисуем под графиком
      },
      {
        type: "rect",
        xref: "paper", // используем относительные координаты по оси X
        yref: "y", // используем абсолютные значения по оси Y
        x0: 0, // начало по X (левая граница графика)
        x1: 1, // конец по X (правая граница графика)
        y0: 0, // нижняя граница референсной зоны
        y1: 110, // верхняя граница референсной зоны
        fillcolor: "rgba(255, 0, 0, 0.3)", // зеленый с прозрачностью
        line: {
          width: 0, // убираем границу
        },
        layer: "below", // рисуем под графиком
      },
    ],
  });

  const handleRelayout = (figure: Plotly.PlotRelayoutEvent) => {
    setLayout((prev: any) => ({
      ...prev,
      xaxis: {
        ...prev.xaxis,
        range: [
          figure["xaxis.range[0]"] ?? prev.xaxis?.range?.[0],
          figure["xaxis.range[1]"] ?? prev.xaxis?.range?.[1],
        ],
      },
      yaxis: {
        ...prev.yaxis,
        range: [
          figure["yaxis.range[0]"] ?? prev.yaxis?.range?.[0],
          figure["yaxis.range[1]"] ?? prev.yaxis?.range?.[1],
        ],
      },
    }));
  };

  return (
    <div className="flex justify-center bg-sky-800">
      <Plot
        data={[
          {
            name: "ЧСС Плода",
            x: first_xarr,
            y: first_yarr,
            type: "scatter",
            line: {
              color: "rgba(255, 255, 0, 0.8)",
            },
          },
          {
            name: "Тонус матки",
            x: second_xarr,
            y: second_yarr,
            type: "scatter",
            line: {
              color: "rgba(255, 100, 0, 0.8)",
            },
          },
        ]}
        layout={layout}
        config={{ scrollZoom: true, displaylogo: false }}
        onRelayout={handleRelayout}
        className="w-full"
      />
    </div>
  );
};

export default Monitoring;

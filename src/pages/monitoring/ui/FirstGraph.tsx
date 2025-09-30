import React, { useState } from "react";
import Plot from "react-plotly.js";

interface Props {
  x_arr?: number[];
  y_arr?: number[];
}

const FirstGraph = ({ x_arr, y_arr }: Props) => {
  const [layout, setLayout] = useState<any>({
    title: {
      text: "Мониторинг",
      font: { color: "#F9FAFB", size: 28, family: 'Inter, sans-serif', weight: 700 },
      x: 0.05,
      xanchor: 'left',
    },
    paper_bgcolor: "#111827", // карточка чуть светлее фона
    plot_bgcolor: "#1F2937", // глубокий темный фон
    height: 520,
    margin: { l: 60, r: 30, t: 60, b: 50 },
    xaxis: {
      showgrid: true,
      gridcolor: "#374151", // сетка темно-серая
      zeroline: false,
      linecolor: "#6B7280", // ось
      tickfont: { color: "#F3F4F6", size: 14, family: 'Inter, sans-serif' },
      title: {
        text: "Время",
        font: { color: "#8B5CF6", size: 16, family: 'Inter, sans-serif', weight: 600 },
        standoff: 10,
      },
    },
    yaxis: {
      showgrid: true,
      gridcolor: "#374151",
      zeroline: false,
      linecolor: "#6B7280",
      tickfont: { color: "#F3F4F6", size: 14, family: 'Inter, sans-serif' },
      title: {
        text: "Показатель",
        font: { color: "#8B5CF6", size: 16, family: 'Inter, sans-serif', weight: 600 },
        standoff: 10,
      },
    },
    shapes: [
      // Референсная зона (норма)
      {
        type: "rect",
        xref: "paper",
        yref: "y",
        x0: 0,
        x1: 1,
        y0: 110,
        y1: 160,
        fillcolor: "rgba(16,185,129,0.10)", // зелёный (акцент) с прозрачностью
        line: { width: 0 },
        layer: "below",
      },
      // Верхняя зона (опасно)
      {
        type: "rect",
        xref: "paper",
        yref: "y",
        x0: 0,
        x1: 1,
        y0: 160,
        y1: 300,
        fillcolor: "rgba(139,92,246,0.10)", // фиолетовый (акцент) с прозрачностью
        line: { width: 0 },
        layer: "below",
      },
      // Нижняя зона (опасно)
      {
        type: "rect",
        xref: "paper",
        yref: "y",
        x0: 0,
        x1: 1,
        y0: 0,
        y1: 110,
        fillcolor: "rgba(244,114,182,0.10)", // розовый (акцент) с прозрачностью
        line: { width: 0 },
        layer: "below",
      },
    ],
    showlegend: false,
    dragmode: "pan",
    hovermode: "x unified",
    font: { color: "#F3F4F6", family: 'Inter, sans-serif' },
    // Скругление и тень для карточки (визуально через Tailwind, но для Plotly — только цвет)
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
    <div className="rounded-2xl shadow-xl bg-[#111827] p-6 transition-all duration-300">
      <Plot
        data={[
          {
            x: x_arr,
            y: y_arr,
            type: "scatter",
            mode: "lines+markers",
            line: { color: "#8B5CF6", width: 3, shape: "spline" },
            marker: {
              size: 6,
              color: "#3B82F6",
              line: { color: "#F9FAFB", width: 1 },
              symbol: "circle",
            },
            name: "channel 0",
            hoverlabel: {
              bgcolor: "#111827",
              bordercolor: "#8B5CF6",
              font: { color: "#F9FAFB", family: 'Inter, sans-serif' },
            },
          },
        ]}
        layout={layout}
        config={{
          scrollZoom: true,
          displaylogo: false,
          responsive: true,
          modeBarButtonsToRemove: ["zoom2d", "zoomIn2d", "zoomOut2d", "autoScale2d"],
        }}
        onRelayout={handleRelayout}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
};

export default React.memo(FirstGraph);

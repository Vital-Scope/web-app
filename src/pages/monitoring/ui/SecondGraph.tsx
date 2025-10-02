import React, { useMemo, useState } from "react";
import Plot from "react-plotly.js";
import useSignalRSensors from "../../../hooks/useSignalRSensors";

interface Props {
  x_arr?: number[];
  y_arr?: number[];
  monitoringId?: string;
}

const SecondGraph = ({ x_arr, y_arr, monitoringId }: Props) => {
  // Подготавливаем данные из API для передачи в хук
  const initialData = useMemo(() => {
    if (x_arr && y_arr) {
      return { uc: { x: x_arr, y: y_arr } };
    }
    return undefined;
  }, [x_arr, y_arr]);

  const { ucData, isConnected } = useSignalRSensors({ initialData, monitoringId });

  const [layout, setLayout] = useState<any>({
    title: {
      text: "Тонус матки",
      font: {
        color: "#F9FAFB",
        size: 28,
        family: "Inter, sans-serif",
        weight: 700,
      },
      x: 0.05,
      xanchor: "left",
    },
    paper_bgcolor: "#111827",
    plot_bgcolor: "#1F2937",
    height: 400,
    margin: { l: 50, r: 15, t: 60, b: 50 },
    xaxis: {
      showgrid: true,
      gridcolor: "#374151",
      zeroline: false,
      linecolor: "#6B7280",
      tickfont: { color: "#F3F4F6", size: 14, family: "Inter, sans-serif" },
      title: {
        text: "Время",
        font: {
          color: "#F472B6",
          size: 16,
          family: "Inter, sans-serif",
          weight: 600,
        },
        standoff: 10,
      },
    },
    yaxis: {
      showgrid: true,
      gridcolor: "#374151",
      zeroline: false,
      linecolor: "#6B7280",
      tickfont: { color: "#F3F4F6", size: 14, family: "Inter, sans-serif" },
      title: {
        text: "Тонус (мм рт.ст.)",
        font: {
          color: "#F472B6",
          size: 16,
          family: "Inter, sans-serif",
          weight: 600,
        },
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
        y0: 0,
        y1: 20,
        fillcolor: "rgba(16,185,129,0.10)",
        line: { width: 0 },
        layer: "below",
      },
      // Зона повышенного тонуса
      {
        type: "rect",
        xref: "paper",
        yref: "y",
        x0: 0,
        x1: 1,
        y0: 20,
        y1: 50,
        fillcolor: "rgba(245,158,11,0.10)",
        line: { width: 0 },
        layer: "below",
      },
      // Зона высокого тонуса
      {
        type: "rect",
        xref: "paper",
        yref: "y",
        x0: 0,
        x1: 1,
        y0: 50,
        y1: 100,
        fillcolor: "rgba(244,114,182,0.10)",
        line: { width: 0 },
        layer: "below",
      },
    ],
    showlegend: false,
    dragmode: "pan",
    hovermode: "x unified",
    font: { color: "#F3F4F6", family: "Inter, sans-serif" },
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
    <div>
      <Plot
        data={[
          {
            x: ucData.x,
            y: ucData.y,
            type: "scatter",
            mode: "lines+markers",
            line: { color: "#F472B6", width: 3, shape: "spline" },
            marker: {
              size: 6,
              color: "#E94560",
              line: { color: "#F9FAFB", width: 0.5 },
              symbol: "dot",
            },
            name: "channel 1",
            hoverlabel: {
              bgcolor: "#111827",
              bordercolor: "#F472B6",
              font: { color: "#F9FAFB", family: "Inter, sans-serif" },
            },
          },
        ]}
        layout={layout}
        config={{
          scrollZoom: true,
          displaylogo: false,
          responsive: true,
          modeBarButtonsToRemove: [
            "zoom2d",
            "zoomIn2d",
            "zoomOut2d",
            "autoScale2d",
          ],
        }}
        onRelayout={handleRelayout}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
};

export default React.memo(SecondGraph);


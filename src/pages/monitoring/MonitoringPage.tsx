import { useEffect, useRef, useState } from "react";
import Plot from "react-plotly.js";

const Monitoring = () => {
  const timerRef = useRef<number>(0);
  const [data, setData] = useState<{ x: number[]; y: number[] }>({
    x: [],
    y: [],
  });
  const [layout, setLayout] = useState<any>({
    title: { text: "ГРАФИК" },
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

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setData((prev) => ({
        x: [...prev.x, prev.x.length],
        y: [
          ...prev.y,
          prev.y.length % 2 === 0 ? 2 : 0,
        ],
      }));
    }, 3000);
    return () => clearInterval(timerRef.current);
  }, []);

  return (
    <div className="flex justify-center">
      <Plot
        data={[
          {
            x: data.x,
            y: data.y,
            type: "scatter",
            line: {
              color: "yellow",
            },
          },
        ]}
        layout={layout}
        config={{ scrollZoom: true, displaylogo: false }}
        onRelayout={handleRelayout}
      />
    </div>
  );
};

export default Monitoring;

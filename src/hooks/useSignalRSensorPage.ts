import React, { useEffect, useRef, useState } from "react";
import * as signalR from "@microsoft/signalr";

interface Sensor {
  type: 0 | 1;
  time: number;
  value: number;
}

const useSignalRSensorPage = () => {
  const [data, setData] = useState<{ x: number[]; y: number[] }>({
    x: [],
    y: [],
  });
  const connectionRef = useRef<signalR.HubConnection | null>(null);

  useEffect(() => {
    const url = `${import.meta.env.VITE_API_URL}/sensor-page`;
    const connection = new signalR.HubConnectionBuilder()
      .withUrl(url, {
        transport: signalR.HttpTransportType.WebSockets,
      })
      .withAutomaticReconnect()
      .build();

    connectionRef.current = connection;

    connection
      .start()
      .then(() => {
        // Connection started
        // You can add listeners here
      })
      .catch((err) => {
        console.error("SignalR Connection Error:", err);
      });

    connection.on("ReceiveSensor", (message: Sensor) => {
      console.log(message);
      if (message.type === 0) {
        const x = message.time;
        const y = message.value;
        setData((prev) => ({
          x: prev.x.concat(x),
          y: prev.y.concat(y),
        }));
      }
    });

    return () => {
      connection.stop();
    };
  }, []);

  return data;
};

export default useSignalRSensorPage;

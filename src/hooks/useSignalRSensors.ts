import { useEffect, useRef, useState } from "react";
import * as signalR from "@microsoft/signalr";
import { useSessionStore } from "../store/useSessionStore";

interface Sensor {
  type: 0 | 1;
  time: number;
  value: number;
}

interface SensorData {
  x: number[];
  y: number[];
}

interface UseSignalRSensorsProps {
  initialData?: {
    fhr?: { x: number[]; y: number[] }; // ЧСС плода (type 0)
    uc?: { x: number[]; y: number[] };  // Тонус матки (type 1)
  };
  monitoringId?: string;
}

interface UseSignalRSensorsReturn {
  fhrData: SensorData;  // Данные ЧСС плода
  ucData: SensorData;   // Данные тонуса матки
  isConnected: boolean;
  error: string | null;
}

const useSignalRSensors = ({ initialData, monitoringId }: UseSignalRSensorsProps = {}): UseSignalRSensorsReturn => {
  const { data: sessionData } = useSessionStore();
  const [fhrData, setFhrData] = useState<SensorData>({
    x: initialData?.fhr?.x || [],
    y: initialData?.fhr?.y || [],
  });
  
  const [ucData, setUcData] = useState<SensorData>({
    x: initialData?.uc?.x || [],
    y: initialData?.uc?.y || [],
  });

  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const connectionRef = useRef<signalR.HubConnection | null>(null);
  const isInitializedRef = useRef(false);

  useEffect(() => {
    if (initialData && !isInitializedRef.current) {
      if (initialData.fhr) {
        setFhrData({
          x: initialData.fhr.x,
          y: initialData.fhr.y,
        });
      }
      
      if (initialData.uc) {
        setUcData({
          x: initialData.uc.x,
          y: initialData.uc.y,
        });
      }
      
      isInitializedRef.current = true;
    }
  }, [initialData]);

  useEffect(() => {
    return () => {
      isInitializedRef.current = false;
    };
  }, []);

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
        setIsConnected(true);
        setError(null);
        console.log("SignalR Connected");
      })
      .catch((err) => {
        setIsConnected(false);
        setError(err.message || "Connection failed");
        console.error("SignalR Connection Error:", err);
      });

    connection.onreconnecting(() => {
      setIsConnected(false);
      console.log("SignalR Reconnecting...");
    });

    connection.onreconnected(() => {
      setIsConnected(true);
      setError(null);
      console.log("SignalR Reconnected");
    });

    connection.onclose(() => {
      setIsConnected(false);
      console.log("SignalR Disconnected");
    });

    connection.on("ReceiveSensor", (message: Sensor) => {
      const isActiveMonitoring = !monitoringId || 
        (sessionData?.monitoringId === monitoringId && sessionData?.status === "Active");
      
      if (!isActiveMonitoring) {
        console.log(`Ignoring sensor data for monitoring ${monitoringId} - not active session`);
        return;
      }

      const x = message.time;
      const y = message.value;

      if (message.type === 0) {
        setFhrData((prev) => ({
          x: prev.x.concat(x),
          y: prev.y.concat(y),
        }));
      } else if (message.type === 1) {
        setUcData((prev) => ({
          x: prev.x.concat(x),
          y: prev.y.concat(y),
        }));
      }
    });

    return () => {
      connection.stop();
    };
  }, [sessionData, monitoringId]);

  return {
    fhrData,
    ucData,
    isConnected,
    error,
  };
};

interface UseSignalRSensorPageProps {
  initialData?: { x: number[]; y: number[] };
  monitoringId?: string;
}

export const useSignalRSensorPage = ({ initialData, monitoringId }: UseSignalRSensorPageProps = {}) => {
  const fhrInitialData = initialData ? { fhr: initialData } : undefined;
  const { fhrData } = useSignalRSensors({ initialData: fhrInitialData, monitoringId });
  return fhrData;
};

export default useSignalRSensors;


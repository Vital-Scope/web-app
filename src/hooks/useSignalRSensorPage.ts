import { useEffect, useRef } from 'react';
import * as signalR from '@microsoft/signalr';

const useSignalRSensorPage = () => {
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

    connection.start()
      .then(() => {
        // Connection started
        // You can add listeners here
      })
      .catch((err) => {
        console.error('SignalR Connection Error:', err);
      });

    return () => {
      connection.stop();
    };
  }, []);

  return connectionRef;
};

export default useSignalRSensorPage;

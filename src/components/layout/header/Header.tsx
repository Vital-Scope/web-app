import MonitoringStatus from "./ui/MonitoringStatus";
import Logo from "./ui/Logo";
import { useEffect, useRef, useState } from "react";
import { useSessionStore } from "../../../store/useSessionStore";
import axios from "axios";

const Header = () => {
  const { data, loading, startPolling, stopPolling } = useSessionStore();
  const [deviceStatus, setDeviceStatus] = useState(true);

  const deviceRef = useRef(undefined);

  useEffect(() => {
    startPolling();
    return () => stopPolling();
  }, [startPolling, stopPolling]);

  useEffect(() => {
    const getStatus = async () => {
      const url = import.meta.env.VITE_API_URL + "/api/health";
      const resp = await axios.get(url);
      console.log(resp);
    }

    getStatus();
  }, []);

  const patientName =
    data && (data.lastName || data.firstName)
      ? `${data.lastName || "—"} ${data.firstName || "—"}`.trim()
      : "—";

  return (
    <header className="z-10 flex h-[60px] w-full items-center border-b border-[#E5E7EB] bg-[#FFFFFF] shadow-md">
      <div className="flex w-full items-center justify-between px-6">
        <div className="flex items-center gap-3 select-none">
          <Logo className="h-10 w-10" />
          <span className="font-sans text-2xl font-extrabold tracking-tight">
            <span className="text-[#F472B6]">Vital</span>
            <span className="ml-1 font-light text-[#3B82F6]">Scope</span>
          </span>
        </div>
        <MonitoringStatus
          patient={patientName}
          isActive={data?.status === "Active"}
          monitoringId={data?.monitoringId}
        />
      </div>
    </header>
  );
};

export default Header;

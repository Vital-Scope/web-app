import MonitoringStatus from "./ui/MonitoringStatus";
import Logo from "./ui/Logo";
import { useEffect } from "react";
import { useSessionStore } from "../../../store/useSessionStore";

const Header = () => {
  const { data, startPolling, stopPolling, deviceStatus } = useSessionStore();

  useEffect(() => {
    startPolling();
    return () => stopPolling();
  }, [startPolling, stopPolling]);

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
          deviceStatus={deviceStatus}
        />
      </div>
    </header>
  );
};

export default Header;

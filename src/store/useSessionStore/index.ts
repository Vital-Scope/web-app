import axios from "axios";
import { create } from "zustand";

interface Session {
  status: "Active" | "Completed";
  monitoringId: string | null;
  patientId: string | null;
  firstName: string | null;
  lastName: string | null;
  middleName: string | null;
}

interface SessionStore {
  data: Session | null;
  loading: boolean;
  error: string | null;
  startPolling: () => void;
  stopPolling: () => void;
  updateSession: (monitoringId: string) => void;
}

export const useSessionStore = create<SessionStore>((set, get) => {
  let intervalId: any = null;

  const fetchData = async () => {
    try {
      set({ loading: true, error: null });
      const url = import.meta.env.VITE_API_URL + "/api/session/active";
      const res = await axios.get<Session>(url);
      set({ data: res.data, loading: false });
    } catch (e: any) {
      set({ data: null, loading: false });
    }
  };

  const updateSession = async (targetId: string) => {
    try {
      set({ loading: true, error: null });
      const url = import.meta.env.VITE_API_URL + "/api/session/status";
      const monitoringId = get().data?.monitoringId;
      const status = monitoringId === targetId ? "Completed" : "Active";
  
      const res = await axios.patch<Session>(url, {
        monitoringId: targetId,
        status,
      }); 
      if (res.data.status === "Completed") {
        set({ data: null, loading: false });
      } else {
        set({ data: res.data, loading: false });
      }
    } catch (error) {}
  };

  return {
    data: null,
    loading: false,
    error: null,

    startPolling: () => {
      if (intervalId) return;
      fetchData();
      intervalId = setInterval(fetchData, 5000);
    },

    stopPolling: () => {
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }
    },

    updateSession,
  };
});

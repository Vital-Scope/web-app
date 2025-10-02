import axios from "axios";

export const getStatus = async () => {
  try {
    const url = import.meta.env.VITE_API_URL + "/api/health";
    const resp = await axios.get<boolean>(url);
    return resp.data;
  } catch {
    return false;
  }
};

export const startStreaming = async (monitoringId: string) => {
  try {
    const url = import.meta.env.VITE_PROXY_URL + "/proxy/random";
    const response = await axios.post(url, {
      monitoringId: monitoringId,
    });
    return response.data;
  } catch (error) {
    console.error("Error posting to proxy/random:", error);
    throw error;
  }
};

export const stopStreaming = async (monitoringId: string) => {
  try {
    const url = import.meta.env.VITE_PROXY_URL + "/proxy/stop";
    const response = await axios.post(url, {
      monitoringId: monitoringId,
    });
    return response.data;
  } catch (error) {
    console.error("Error posting to proxy/stop:", error);
    throw error;
  }
};
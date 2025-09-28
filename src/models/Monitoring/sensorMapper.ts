// Маппер для сенсоров мониторинга (графики)
import dayjs from "dayjs";

export interface SensorValue {
  channelType: number;
  value: number;
  date: string;
}

export function mapSensors(sensors: any[]): SensorValue[] {
  if (!Array.isArray(sensors)) return [];
  return sensors.map((sensor) => ({
    channelType: sensor.channelType ?? 0,
    value: sensor.value,
    date: sensor.date ? dayjs(sensor.date).format("HH:mm:ss") : "",
  }));
}
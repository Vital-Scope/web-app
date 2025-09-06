import dayjs from "dayjs";
import type { MonitoringModel } from "./types";

dayjs.locale("ru-ru")

const mapMonitoring = (data: MonitoringModel) => ({
  metaInformation: data.metaInformation,
  values: data.values.map((val) => ({
    channelType: val.channelType,
    value: val.value,
    date: dayjs(val.date).format("HH:mm:ss"),
  })),
});

export default mapMonitoring;

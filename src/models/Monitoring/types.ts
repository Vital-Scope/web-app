interface MetaInformation {
  age: number;
  id: string;
  name: string;
  samplingFrequency: number;
}

const channelType = {
  FETAL_HEARTBEAT: 0,
  UTERINE_TONE: 1,
} as const;

type ChannelType = typeof channelType;

export interface MonitoringValue {
  channelType: ChannelType;
  date: string;
  value: number;
}

export interface MonitoringModel {
  metaInformation: MetaInformation;
  values: MonitoringValue[];
}

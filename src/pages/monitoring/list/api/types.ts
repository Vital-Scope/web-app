type MonitoringResult = "Regular" | "Risk" | "Hypoxia";
type MonitoringStatus = "Active" | "Completed";

interface Sensor {
  id: string;
  time: number;
  channel: number; // 0 - чсс, 1 - тонус матки
  value: number;
}

export interface Monitoring {
  id: string;
  dateStart: number | null;
  dateEnd: number | null;
  pregnancyWeek: number | null;
  status: MonitoringStatus | null;
  result: MonitoringResult | null;
  medicalTests: {
    ph: number | null;
    glu: number | null;
    сarbonDioxide: number | null;
    be: number | null;
    lac: number | null;
  } | null;
  diagnosis: string;
  patientId: string;
  notes: string | null;
  sensors: Sensor[];
  createdAt: number | null;
  updatedAt: number | null;
  fullName: string;
}

export type MonitoringListItem = Omit<Monitoring, "sensors">;

// Monitoring list item types (migrated from monitoringList/api/types.ts)
type MonitoringResult = "Regular" | "Risk" | "Hypoxia";
type MonitoringStatus = "Active" | "Completed";

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
  notes: string;
  sensors: any[];
  createdAt: number | null;
  updatedAt: number | null;
}

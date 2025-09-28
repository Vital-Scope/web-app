import React from "react";
import { Avatar, Spin } from "antd";
import {
  UserOutlined,
} from "@ant-design/icons";

interface PatientInfoProps {
  patient: any;
  isLoading: boolean;
}

const PatientInfo: React.FC<PatientInfoProps> = ({ patient, isLoading }) => {
  return (
    <div className="rounded-lg border border-[#E5E7EB] bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-center gap-2">
        <UserOutlined className="text-[#3B82F6]" />
        <h2 className="text-lg font-semibold text-[#1F2937]">Пациент</h2>
      </div>

      {isLoading ? (
        <div className="flex h-32 items-center justify-center">
          <Spin />
        </div>
      ) : patient ? (
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            {patient.avatar ? (
              <Avatar src={patient.avatar} size={48} />
            ) : (
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#3B82F6] font-semibold text-white">
                {patient.firstName?.[0] || "П"}
              </div>
            )}
            <div>
              <div className="font-semibold text-[#1F2937]">
                {patient.lastName} {patient.firstName}{" "}
                {patient.middleName || ""}
              </div>
              <div className="text-sm text-[#6B7280]">
                {patient.birthDate
                  ? new Date(
                      Number(patient.birthDate) * 1000,
                    ).toLocaleDateString("ru-RU")
                  : "—"}
              </div>
            </div>
          </div>

          {/* Акушерские данные */}
          {(patient.pregnancyWeek || patient.pregnancyNumber) && (
            <div className="grid grid-cols-2 gap-3 text-sm">
              {patient.pregnancyWeek && (
                <div>
                  <div className="text-xs text-[#6B7280]">
                    Срок беременности
                  </div>
                  <div className="font-medium text-[#1F2937]">
                    {patient.pregnancyWeek} нед.
                  </div>
                </div>
              )}
              {patient.pregnancyNumber && (
                <div>
                  <div className="text-xs text-[#6B7280]">
                    Номер беременности
                  </div>
                  <div className="font-medium text-[#1F2937]">
                    {patient.pregnancyNumber}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Медицинская информация */}
          <div className="space-y-2 text-sm">
            <div>
              <div className="mb-1 text-xs text-[#6B7280]">Анамнез</div>
              <div className="leading-relaxed text-[#1F2937]">
                {patient.anamnesis || "—"}
              </div>
            </div>
            <div>
              <div className="mb-1 text-xs text-[#6B7280]">
                Примечания врача
              </div>
              <div className="leading-relaxed text-[#1F2937]">
                {patient.doctorNotes || "—"}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="py-4 text-center">
          <div className="text-sm text-[#6B7280]">Нет данных о пациенте</div>
        </div>
      )}
    </div>
  );
};

export default PatientInfo;

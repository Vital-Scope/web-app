import React from "react";

const COLORS = ["#3B82F6", "#10B981", "#F472B6", "#8B5CF6"];

export const WomanMock: React.FC = () => {
  return (
    <svg
      width={60}
      height={60}
      viewBox="0 0 128 128"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-labelledby="title desc"
    >
      <title id="title">Иконка женщины</title>
      <desc id="desc">
        Нейтральная плоская иконка женщины с волосами (голова и плечи)
      </desc>

      {/* Круглый фон/тень */}
      <circle cx="64" cy="64" r="60" fill="#E5E7EB" />

      <g
        stroke="#1F2937"
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Волосы (силуэт) */}
        <path
          d="M92 66c6-24-7-42-28-42s-34 18-28 42c-4 3-6 8-6 13 0 12 9 22 22 22h24c13 0 22-10 22-22 0-5-2-10-6-13Z"
          fill="#1F2937"
        />

        {/* Лицо (овал) */}
        <path
          d="M64 84c-12 0-22-10-22-22s10-22 22-22 22 10 22 22-10 22-22 22Z"
          fill="#F3F4F6"
        />

        {/* Чёлка/контур волос поверх лба */}
        <path d="M42 58c4-10 14-16 22-16s18 6 22 16" fill="none" />

        {/* Плечи/одежда */}
        <path d="M32 106c4-14 18-22 32-22s28 8 32 22v8H32v-8Z" fill={COLORS[0]} />
      </g>
    </svg>
  );
};

export default WomanMock;

"use client";
import { useWeather } from "@/hook/useWeather";
import { Sun } from "lucide-react";

export default function WeatherItem() {
  // (1) 날씨 훅 사용
  const { weather, loading, error } = useWeather(); // 서울 마포구 기준

  // (2) 값 해석 (없으면 기본값)
  const TMP = weather?.find((f) => f.category === "TMP");
  const SKY = weather?.find((f) => f.category === "SKY");
  const PTY = weather?.find((f) => f.category === "PTY");

  // (3) 하늘 상태 해석
  function getSkyText(val?: string) {
    if (!val) return "-";
    if (val === "1") return "맑음";
    if (val === "3") return "구름많음";
    if (val === "4") return "흐림";
    return "-";
  }

  // (4) 강수형태 해석
  function getPtyText(val?: string) {
    if (!val || val === "0") return "";
    if (val === "1") return " / 비";
    if (val === "2") return " / 비/눈";
    if (val === "3") return " / 눈";
    if (val === "4") return " / 소나기";
    return "";
  }

  return (
    <>
      {/* === 날씨 데이터로 대체 === */}
      <div className="absolute flex items-center gap-1 right-6 top-6 text-14">
        <Sun className="w-4 h-4 mr-1" />
        {loading && "불러오는 중..."}
        {error && "날씨 오류"}
        {!loading && !error && (
          <>
            {getSkyText(SKY?.fcstValue)}
            {getPtyText(PTY?.fcstValue)}
            {TMP ? ` ${TMP.fcstValue}°C` : ""}
          </>
        )}
      </div>
      {/* ======================== */}
    </>
  );
}

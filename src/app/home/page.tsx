"use client";
import { CalendarDays, ThumbsUp, MapPin, Sun, NotebookPen } from "lucide-react";
import DayItem from "@/components/ui/dayItem";
import RandomItem from "@/components/ui/randomItem";
import LocationDrawer from "@/components/feature/drawerItem";
import { useWeather } from "@/hook/useWeather";
import { useState } from "react";
import Link from "next/link";

export default function HomePage() {
  const [drawerOpen, setDrawerOpen] = useState(false);

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
    <div className="min-h-screen w-full flex flex-col items-center bg-[url(/images/bg-default.png)] bg-center bg-cover bg-no-repeat">
      <div className="relative w-full px-4 pt-10 pb-6 text-white">
        <div className="flex flex-col gap-1 mt-2 ">
          <div className="flex items-center gap-1 text-16">
            <MapPin className="w-4 h-4 mr-1" />
            서울시 마포구
          </div>
          <div className="font-bold text-24">2025년 7월 10일 (수)</div>
        </div>

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
      </div>

      <div className="w-full flex-1 px-4 py-7 bg-white/65 rounded-t-2xl shadow-[0_0_8px_0_rgba(0,0,0,0.12)] flex flex-col space-y-8">
        <div className="space-y-3">
          <div className="flex items-center gap-2 mb-2 font-bold text-18 text-travel-text100">
            <CalendarDays className="size-6" />
            예정된 여행
          </div>
          <DayItem place="제주도" period="2025.07.12 ~ 2025.07.15." dday={3} />
          <DayItem />
        </div>
        <div className="space-y-3">
          <div className="flex items-center gap-2 mb-2 font-bold text-18 text-travel-text100">
            <NotebookPen className="size-6" />
            이전에 다녀온 여행을 기록해보세요!
          </div>
          <Link href="/review">
            <DayItem place="부산" period="2025.05.08 ~ 2025.05.12." />
          </Link>
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2 mb-2 font-bold text-18 text-travel-text100">
            <ThumbsUp className="size-6" />
            랜덤 여행지 추천
          </div>
          <RandomItem
            image="/images/sea.png"
            title="무슨해변"
            location="제주특별자치도 서귀포시"
            desc="기차에서 바다를 감상하는 특별한 해변! 인생사진 남기기 좋은 스팟."
          />
        </div>
      </div>
    </div>
  );
}

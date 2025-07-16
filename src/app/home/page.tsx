"use client";
import { CalendarDays, PencilLine, ThumbsUp, MapPin, Sun } from "lucide-react";
import DayItem from "@/components/ui/dayItem";
import RandomItem from "@/components/ui/randomItem";
import LocationDrawer from "@/components/ui/drawerItem";
import { useState } from "react";

export default function HomePage() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-travel-bg200">
      <div className="w-full max-w-xl px-6 pt-10 pb-6 relative">
        <div className="flex flex-col gap-1 mt-2">
          <div className="flex items-center gap-1 text-14 text-travel-text100">
            <MapPin className="w-4 h-4 mr-1" />
            서울시 마포구
          </div>
          <div className="text-20 font-bold text-travel-text100 mt-1">
            2025년 7월 10일 (수)
          </div>
        </div>
        <div className="absolute right-6 top-6 flex items-center gap-1 text-14 text-travel-text100">
          <Sun className="w-4 h-4 mr-1" />
          맑음 28°C
        </div>
      </div>

      <div className="w-full max-w-xl flex-1 px-6 py-7 bg-white rounded-2xl shadow-[0_0_8px_0_rgba(0,0,0,0.12)] mt-6 flex flex-col space-y-8">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-14 font-bold mb-2 text-travel-text100">
            <CalendarDays className="w-6 h-6" />
            예정된 여행
          </div>
          <DayItem name="제주도" period="2025.07.12 ~ 2025.07.15." dday="D-2" />
          <DayItem empty />
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-14 font-bold mb-2 text-travel-text100">
            <PencilLine className="w-6 h-6" />
            이전에 다녀온 여행을 기록해보세요!
          </div>
          <DayItem name="부산" period="2025.05.08 ~ 2025.05.12." />
          <DayItem empty />
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-14 font-bold mb-2 text-travel-text100">
            <ThumbsUp className="w-5 h-5" />
            랜덤 여행지 추천
          </div>
          <RandomItem
            image="/sea.img"
            title="무슨해변"
            location="제주특별자치도 서귀포시"
            desc="기차에서 바다를 감상하는 특별한 해변! 인생사진 남기기 좋은 스팟."
            onMoreClick={() => setDrawerOpen(true)}
          />
        </div>
      </div>
      <LocationDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title="무슨해변"
        location="제주특별자치도 서귀포시"
        imageUrl="/sea.img"
        description="섬 전체가 하나의 거대한 관광자원인 제주도. 이 해변은 제주도의 에메랄드빛 물빛이 인상적인..."
      />
    </div>
  );
}

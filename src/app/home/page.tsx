import { CalendarDays, ThumbsUp, MapPin, NotebookPen } from "lucide-react";
import DayItem from "@/components/ui/dayItem";
import RandomItem from "@/components/ui/randomItem";
import Link from "next/link";
import { todayString } from "@/lib/api/todayString";
import LocationWeatherBox from "@/components/feature/LocationWeatherBox";

export default function HomePage() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-[url(/images/bg-default.png)] bg-center bg-cover bg-no-repeat">
      <div className="relative w-full px-4 pt-10 pb-6 text-white">
        <div className="flex flex-col gap-1 mt-2 ">
          <LocationWeatherBox />
          <div className="font-bold text-24 text-white">{todayString()}</div>
        </div>
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

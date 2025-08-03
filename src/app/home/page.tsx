import { ThumbsUp } from "lucide-react";
import RandomItem from "@/components/home/randomItem";
import { todayString } from "@/lib/todayString";
import HomePlanItem from "@/components/home/homePlanItem";
import LocationWeatherBox from "@/components/home/locationWeatherBox";

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
        <HomePlanItem />
        <div className="space-y-2">
          <div className="flex items-center gap-2 mb-2 font-bold text-18 text-travel-text100">
            <ThumbsUp className="size-6" />
            랜덤 여행지 추천
          </div>
          <RandomItem />
        </div>
      </div>
    </div>
  );
}

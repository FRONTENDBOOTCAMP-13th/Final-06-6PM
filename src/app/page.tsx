import { CalendarDays, PencilLine, ThumbsUp } from "lucide-react";
import DayItem from "@/components/ui/dayItem";
import RandomItem from "@/components/ui/randomItem";

export default function HomePage() {
  return (
    <div className="p-1 max-w-xl mx-auto min-h-screen flex flex-col gap-y-10">
      <div>
        <div className="flex items-center gap-1 text-14 font-bold mb-2">
          <CalendarDays className="w-6 h-6" />
          예정된 여행
        </div>
        <DayItem name="제주도" period="2025.07.12 ~ 2025.07.15." dday="D-2" />
        <DayItem empty />
      </div>
      <div>
        <div className="flex items-center gap-2 text-14 font-bold mb-4">
          <PencilLine className="w-6 h-6" />
          이전에 다녀온 여행을 기록해보세요!
        </div>
        <DayItem name="부산" period="2025.05.08 ~ 2025.05.12." />
        <DayItem empty />
      </div>
      <div>
        <div className="flex items-center gap-2 text-14 font-bold mb-3">
          <ThumbsUp className="w-5 h-5" />
          랜덤 여행지 추천
        </div>
        <RandomItem
          image="/sea.img"
          title="무슨해변"
          location="제주특별자치도 서귀포시"
          desc="기차에서 바다를 감상하는 특별한 해변! 인생사진 남기기 좋은 스팟."
        />
      </div>
    </div>
  );
}

import ButtonRounded from "@/components/ui/btnRound";
import { CircleCheckBig } from "lucide-react";

// 여행기록_일정선택하기
export default function ReviewSuccessPage() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 overflow-hidden h-dvh">
      {/* 참고 : 현재 상위요소 레이아웃 border로 인한 success 페이지 세로스크롤 생김 */}
      <div className="font-medium text-center text-travel-text100">
        <CircleCheckBig className="mx-auto w-14 h-14 text-travel-success100" />
        <h2 className="my-2 font-semibold text-28 text-travel-primary200">
          기록 완료!
        </h2>
        <p>여행 기록이 도감에 잘 저장되었어요!</p>
        <p>누군가에게 큰 도움이 될 거예요🥰</p>
      </div>
      <ButtonRounded variant="primary" size="lg">
        작성한 후기 보기
      </ButtonRounded>
      <ButtonRounded variant="outline" size="lg">
        새 후기 등록하기
      </ButtonRounded>
    </div>
  );
}

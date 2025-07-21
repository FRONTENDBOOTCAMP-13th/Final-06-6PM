import ButtonRounded from "@/components/ui/btnRound";
import { CircleCheckBig } from "lucide-react";
import Link from "next/link";

// 여행기록_일정선택하기
export default function PlanSuccessPage() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 overflow-hidden h-dvh">
      {/* 참고 : 현재 상위요소 레이아웃 border로 인한 success 페이지 세로스크롤 생김 */}
      <div className="font-medium text-center text-travel-text100">
        <CircleCheckBig className="mx-auto w-14 h-14 text-travel-primary200" />
        <h2 className="my-2 font-semibold text-28 text-travel-primary200">
          일정 등록 완료!
        </h2>
        <p>일정이 도감에 잘 저장되었어요!</p>
        <p>즐거운 여행 되시길 바라요. 😊</p>
      </div>
      <Link href="/plan/view">
        <ButtonRounded variant="primary" size="lg">
          등록한 여행 일정 보러가기
        </ButtonRounded>
      </Link>
    </div>
  );
}

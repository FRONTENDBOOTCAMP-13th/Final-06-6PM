import ButtonRounded from "@/components/ui/btnRound";
import { CircleCheckBig } from "lucide-react";
import Link from "next/link";

export default function PlanSuccessPage() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 overflow-hidden h-dvh">
      <div className="font-medium text-center text-travel-text100">
        <CircleCheckBig className="mx-auto w-14 h-14 text-travel-primary200" />
        <h2 className="my-2 font-semibold text-28 text-travel-primary200">일정 등록 완료!</h2>
        <p>일정이 도감에 잘 저장되었어요!</p>
        <p>즐거운 여행 되세요. 😊</p>
      </div>

      <div className="flex flex-col gap-3 items-center w-full max-w-xs px-4">
        <Link href="/mypage" className="w-full">
          <ButtonRounded variant="primary" size="lg" className="w-full">
            등록한 여행 일정 보러가기
          </ButtonRounded>
        </Link>

        <Link href="/" className="w-full">
          <ButtonRounded variant="outline" size="lg" className="w-full">
            홈으로 돌아가기
          </ButtonRounded>
        </Link>
      </div>
    </div>
  );
}

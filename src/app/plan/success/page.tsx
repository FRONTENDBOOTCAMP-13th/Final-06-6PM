import LoginStatusConfirm from "@/components/feature/loginStatusConfirm";
import PlanSuccessButton from "@/components/plan/planSuccessButton";
import SuccessLottie from "@/components/plan/successLottie";

export default function PlanSuccessPage() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 overflow-hidden h-dvh">
      <div className="flex flex-col items-center font-medium text-travel-text100">
        <SuccessLottie />
        <h1 className="my-2 font-semibold text-28 text-travel-primary200">일정 등록 완료!</h1>
        <p>일정이 도감에 잘 저장되었어요!</p>
        <p>즐거운 여행 되세요. 😊</p>
      </div>

      <PlanSuccessButton />

      {/* 로그인 확인 */}
      <LoginStatusConfirm />
    </div>
  );
}

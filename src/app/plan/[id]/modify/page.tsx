import BackButton from "@/components/feature/backButton";
import PlanReplyForm from "@/components/form/plan/planReplyForm";
import ModifyScheduleContent from "@/components/plan/modifyScheduleContent";
import LoginStatusConfirm from "@/components/feature/loginStatusConfirm";

export default function PlanModifyPage() {
  return (
    <div>
      <div className="w-full relative py-5 px-4">
        <BackButton />
        <p className="text-center">여행일정 수정하기</p>
      </div>

      <ModifyScheduleContent />
      <PlanReplyForm />
      {/* 로그인 확인 */}
      <LoginStatusConfirm />
    </div>
  );
}

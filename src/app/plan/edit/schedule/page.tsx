import ScheduleContent from "@/components/plan/scheduleContent";
import BackButton from "@/components/feature/backButton";
import PlanReplyForm from "@/components/form/plan/planReplyForm";

export default function SchedulePage() {
  return (
    <div>
      <h1 className="bg-white sr-only">여행 세부일정 생성</h1>
      <div className="w-full relative py-5 px-4">
        <BackButton path="/plan/dates" />
        <p className="text-center" aria-hidden="true">
          여행일정만들기
        </p>
      </div>

      <ScheduleContent />

      <PlanReplyForm />
    </div>
  );
}

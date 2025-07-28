import ScheduleContent from "@/components/plan/scheduleContent";
import BackButton from "@/components/feature/backButton";
import PlanReplyForm from "@/components/form/plan/planReplyForm";

export default function SchedulePage() {
  return (
    <div>
      <div className="w-full relative py-5 px-4">
        <BackButton path="/plan/dates" />
        <p className="text-center">여행일정만들기</p>
      </div>

      <ScheduleContent />

      <PlanReplyForm />
    </div>
  );
}

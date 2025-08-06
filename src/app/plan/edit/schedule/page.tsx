import ScheduleContent from "@/components/plan/scheduleContent";
import BackButton from "@/components/feature/backButton";
import PlanReplyForm from "@/components/form/plan/planReplyForm";

export default function SchedulePage() {
  return (
    <div>
      <div className="w-full relative py-5 px-4">
        <BackButton path="/plan/dates" />
        <h1 className="text-center">여행일정만들기</h1>
      </div>

      <ScheduleContent />

      <PlanReplyForm />
    </div>
  );
}

import ScheduleContent from "@/components/plan/scheduleContent";
import BackButton from "@/components/feature/backButton";
import NextButton from "@/components/feature/nextButton";

export default function SchedulePage() {
  return (
    <div>
      <div className="w-full relative py-5 px-4">
        <BackButton path="/plan/dates" />
        <p className="text-center">여행일정만들기</p>
      </div>

      <ScheduleContent />

      <NextButton path="/plan/edit/preview" />
    </div>
  );
}

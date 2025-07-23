import ScheduleRegisterPlus from "@/components/ui/scheduleRegisterPlus";
import { TravelData } from "@/components/plan/planContainer";
import BackButton from "@/components/feature/backButton";
import NextButton from "@/components/feature/nextButton";

interface StepScheduleProps {
  onNext: (stepData: any) => void;
  data: TravelData;
}

export default function StepSchedule({ onNext }: StepScheduleProps) {
  return (
    <div>
      <div className="w-full relative py-5 px-4">
        <BackButton path="/plan/dates" />
        <p className="text-center">여행일정만들기</p>
      </div>
      
      <div className="relative w-full px-4 pb-25">
        <div>
          <h2 className="text-28 text-travel-primary200 font-semibold">
            울산
          </h2>
          <p className="text-16 text-travel-gray700">
            2025.08.03 ~ 2025.08.05
          </p>
        </div>
        
        <div className="flex flex-col justify-between pt-7 gap-5">
          <ScheduleRegisterPlus day={1} date="2025.05.08"/>
          <ScheduleRegisterPlus day={2} date="2025.05.09"/>
          <ScheduleRegisterPlus day={3} date="2025.05.10"/>
        </div>
      </div>
      
      <NextButton onNext={onNext} />
    </div>
  );
}
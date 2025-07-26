import ScheduleRegisterPlus from "@/components/ui/dayScheduleCard";
import BackButton from "@/components/feature/backButton";
import Link from "next/link";
import NextButton from "@/components/feature/nextButton";

export default function previewPage() {
  return (
    <div>
      <div className="w-full relative py-5 px-4">
        <BackButton path="/plan/edit/search"/>
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
          <ScheduleRegisterPlus 
            day={1} 
            date="2025.05.08" 
            daylist={[{id: 1, title: "더미데이터", tag: "중요"}]}/>
          <ScheduleRegisterPlus day={2} date="2025.05.09"/>
        </div>
      </div>
      
      <NextButton path="/plan/success"/>   
    </div>
  );
}
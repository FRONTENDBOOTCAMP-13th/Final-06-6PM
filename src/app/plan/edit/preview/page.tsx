import ScheduleRegisterPlus from "@/components/ui/scheduleRegisterPlus";

export default function TravelRegisterPage() {
  return (
    <>
      <div className="flex flex-col justify-between pt-7 gap-5">

      <ScheduleRegisterPlus 
        day={1} 
        date="2025.05.08" 
        daylist={[{id: 1, title: "더미데이터", tag: "중요"}]}/>
      <ScheduleRegisterPlus day={2} date="2025.05.09"/>
       
      </div>
    </>
  );
}
import ScheduleView from "@/components/ui/scheduleView";


export default function TravelViewPage() {
  return (
    <>
      <div className="flex flex-col justify-between pt-7 gap-5">

        <ScheduleView day={1} date="2025.05.08" daylist={[{id: 1, title: "더미데이터", tag: "중요"}]}/>
        <ScheduleView day={2} date="2025.05.09" />
        <ScheduleView day={3} date="2025.05.10" daylist={[{id: 2, title: "더미데이터", tag: "중요"}]}/>
      </div>
    </>
  );
}
import ProfileCard from "@/components/ui/profileItem";
import DrawerItem from "@/components/ui/drawerItem";
import PlanList from "@/components/ui/planList";
import ScheduleRegister from "@/components/ui/scheduleRegister";

export default function ComponentPage() {
  return (
    <div className="flex flex-col gap-8 items-center">
      <div className="w-full">
        <h2 className="mb-2">ProfileItem</h2>
        <ProfileCard userName="여행덕후"></ProfileCard>
      </div>

      <div className="w-full">
        <h2 className="mb-2">DrawerItem</h2>
        <DrawerItem />
      </div>

      <div className="w-full">
        <h2 className="mb-2">ScheduleRegister</h2>
        <ScheduleRegister />
      </div>

      <div className="w-full">
        <h2 className="mb-2">PlanList</h2>
        <PlanList />
      </div>
    </div>
  );
}

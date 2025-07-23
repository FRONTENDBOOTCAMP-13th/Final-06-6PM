import ProfileItem from "@/components/ui/profileItem";
import ScheduleRegister from "@/components/feature/scheduleRegister";
import DrawerBtn from "@/components/feature/drawerBtn";
import DrawerSelectImg from "@/components/feature/drawerSelectImg";
import PlacePlusItem from "@/components/feature/placePlusItem";
import PlanListItem from "@/components/ui/planListItem";
import PlanList from "@/components/feature/planList";
import ReviewWrite from "@/components/ui/reviewItem";

export default function ComponentPage() {
  return (
    <div className="flex flex-col items-center">
      <div className="w-full py-4 space-y-4">
        <h2 className="font-bold">ProfileItem</h2>
        <ProfileItem />
      </div>

      {/* DrawerBtn */}
      <div className="w-full py-4 space-y-4">
        <h2 className="font-bold">DrawerBtn</h2>
        <DrawerBtn />
      </div>

      {/* DrawerSelectImg */}
      <div className="w-full py-4 space-y-4">
        <h2 className="font-bold">DrawerSelectImg</h2>
        <DrawerSelectImg title={"부산"} />
      </div>

      {/* PlacePlusItem */}
      <div className="w-full py-4 space-y-4">
        <h2 className="font-bold">PlacePlusItem</h2>
        <PlacePlusItem reviewRating={3} reviewCount={12} />
      </div>

      {/* ScheduleRegister */}
      <div className="w-full py-4 space-y-4">
        <h2 className="font-bold">ScheduleRegister</h2>
        <ScheduleRegister />
      </div>

      {/* PlanListItem */}
      <div className="w-full py-4 space-y-4">
        <h2 className="font-bold">PlanListItem</h2>
        <PlanListItem number={1} place="성산일출봉" tag={"관광지"} />
      </div>

      {/* PlanList */}
      <div className="w-full py-4 space-y-4">
        <h2 className="font-bold">PlanList</h2>
        <PlanList />
      </div>

      {/* ReviewWrite */}
      <div className="w-full py-4 space-y-4">
        <h2 className="font-bold">ReviewWrite</h2>
        <ReviewWrite />
      </div>
    </div>
  );
}

import DayItem from "@/components/ui/dayItem";
import ProfileCard from "@/components/ui/profileItem";
import SelectMenu2 from "@/components/ui/selectMenu2";

export default function MypagePage() {
  return (
    <div className="flex flex-col gap-8 items-center">
      <div className="w-full">
        <ProfileCard userName="여행덕후"></ProfileCard>
      </div>
      <div className="w-full">
        <SelectMenu2 />
      </div>
      <div className="w-full">
        <div className="space-y-4 w-full">
          <DayItem name="제주도" period="2025.07.12 ~ 2025.07.15." dday="D-2" />
          <DayItem name="제주도" period="2025.07.12 ~ 2025.07.15." dday="D-2" />
          <DayItem name="제주도" period="2025.07.12 ~ 2025.07.15." dday="D-2" />
        </div>
      </div>
    </div>
  );
}

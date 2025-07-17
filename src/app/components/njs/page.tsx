import BookmarkItem from "@/components/ui/bookmarkItem";
import DayItem from "@/components/ui/dayItem";
import DrawerItem from "@/components/feature/drawerItem";

export default function ComponentPage() {
  return (
    <div className="flex flex-col items-center">
      {/* BookmarkItem */}
      <div className="w-full py-4 space-y-4">
        <h2 className="font-bold">BookmarkItem</h2>
        <div className="w-full space-y-4">
          <BookmarkItem type="bookmark" count={2} />
          <BookmarkItem type="review" count={4} />
        </div>
      </div>

      {/* DayItem */}
      <div className="w-full py-4 space-y-4">
        <h2 className="font-bold">DayItem</h2>
        <div className="w-full space-y-4">
          <DayItem
            imgUrl="/images/user3.png"
            place="제주도"
            period="2025.07.12 ~ 2025.07.15."
            dday={2}
          />
          <DayItem />
        </div>
      </div>

      {/* DrawerItem */}
      <div className="w-full py-4 space-y-4">
        <h2 className="font-bold">DrawerItem</h2>
        <DrawerItem
          title={"이호태우해변"}
          location={"제주특별자치도"}
          imgUrl={"/images/user1.png"}
          desc={
            "섬 전체가 하나의 거대한 관광자원인 제주도. 이 해변은 제주도의 에메랄드빛 물빛이 인상적인 섬 전체가 하나의 거대한 관광자원인 제주도. 이 해변은 제주도의 에메랄드빛 물빛이 인상적인가 하나의 거대한 관광자원인 제주도. 이 해변은 제주도의 섬 전체가 하나의 거대한 관광자원인 제주도"
          }
        />
      </div>
    </div>
  );
}

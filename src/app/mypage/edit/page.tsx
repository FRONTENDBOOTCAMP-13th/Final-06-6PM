"use client";

import DayItem from "@/components/ui/dayItem";
import SelectMenu2 from "@/components/feature/selectMenu2";
import BookmarkItem from "@/components/ui/bookmarkItem";
import ProfileItemEdit from "@/components/form/profileItemEdit";

export default function MypagePage() {
  return (
    <>
      <div className="flex flex-col items-center gap-5">
        <div className="w-full">
          <ProfileItemEdit userName="여행덕후"></ProfileItemEdit>
        </div>
        <div className="flex flex-col w-full gap-5">
          <BookmarkItem type="bookmark" count={2} />
          <BookmarkItem type="review" count={4} />
        </div>
      </div>
      <div className="mt-5 overflow-hidden bg-white shadow-xl rounded-2xl">
        <SelectMenu2 />
        <div className="grid grid-cols-1 gap-2 p-4">
          <DayItem place="제주도" period="2025.07.12 ~ 2025.07.15." dday={2} />
          <DayItem place="제주도" period="2025.07.12 ~ 2025.07.15." dday={12} />
          <DayItem place="제주도" period="2025.07.12 ~ 2025.07.15." dday={20} />
          <DayItem place="제주도" period="2025.07.12 ~ 2025.07.15." dday={21} />
        </div>
      </div>
    </>
  );
}

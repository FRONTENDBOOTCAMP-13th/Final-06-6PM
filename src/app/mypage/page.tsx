"use client";

import ProfileItem from "@/components/ui/profileItem";
import SelectMenu2 from "@/components/ui/selectMenu2";
import BookmarkItem from "@/components/ui/bookmarkItem";
import DayItem from "@/components/ui/dayItem";
import Link from "next/link";

export default function MypagePage() {
  return (
    <>
      <div className="flex flex-col gap-5 items-center">
        <div className="w-full">
          <ProfileItem userName="여행덕후" />
        </div>
        <div className="w-full flex flex-col gap-5">
          <Link href="/mypage/bookmark">
            <BookmarkItem type="bookmark" count={2} />
          </Link>
          <Link href="/mypage/review">
            <BookmarkItem type="review" count={4} />
          </Link>
        </div>
      </div>
      <div className="bg-white shadow-xl rounded-2xl overflow-hidden mt-5">
        <SelectMenu2 />
        <div className="p-4 grid grid-cols-1 gap-2">
          <DayItem name="제주도" period="2025.07.12 ~ 2025.07.15." dday="D-2" />
          <DayItem name="제주도" period="2025.07.12 ~ 2025.07.15." dday="D-2" />
          <DayItem name="제주도" period="2025.07.12 ~ 2025.07.15." dday="D-2" />
          <DayItem name="제주도" period="2025.07.12 ~ 2025.07.15." dday="D-2" />
        </div>
      </div>
    </>
  );
}

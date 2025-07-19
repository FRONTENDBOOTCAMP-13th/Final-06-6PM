"use client";

import ProfileItem from "@/components/ui/profileItem";
import SelectMenu2 from "@/components/feature/selectMenu2";
import BookmarkItem from "@/components/ui/bookmarkItem";
import DayItem from "@/components/ui/dayItem";
import Link from "next/link";
import SelectMypage from "@/components/feature/selectMypage";

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
        <SelectMypage/>
      </div>
    </>
  );
}

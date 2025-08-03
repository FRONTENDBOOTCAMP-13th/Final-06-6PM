"use client";
import DayItem from "@/components/ui/dayItem";
import DropdownItem from "@/components/feature/dropdownItem";
import { useEffect, useState } from "react";
import useUserStore from "@/zustand/userStore";
import { getPlanListUser } from "@/lib/api/plan";
import { GetPlanDetailProps } from "@/types/plan";
import { getDday } from "@/lib/getDday";
import Link from "next/link";

type SortType = "latest" | "oldest";

// 여행기록_일정선택하기
export default function ReviewNew() {
  const [sortType, setSortType] = useState<SortType>("latest");

  const token = useUserStore((state) => state.token);
  const [plan, setPlan] = useState<GetPlanDetailProps[]>([]);

  const handleSortChange = (type: SortType) => {
    setSortType(type);
  };

  const sortedPlan = [...plan].sort((a, b) => {
    const getDate = (item: GetPlanDetailProps) => {
      const dateStr = item.extra?.startDate || item.createdAt;
      const date = new Date(dateStr);
      return isNaN(date.getTime()) ? 0 : date.getTime();
    };

    const dateA = getDate(a);
    const dateB = getDate(b);

    return sortType === "latest" ? dateB - dateA : dateA - dateB;
  });

  useEffect(() => {
    const planListUserData = async () => {
      const res = await getPlanListUser(token);
      // console.log("API 응답:", res);
      if (res.ok) {
        setPlan(res.item);
      }
    };
    planListUserData();
  }, [token]);

  // console.log("전체 여행 목록", plan);

  return (
    <>
      <div className="relative flex flex-row-reverse my-3">
        <DropdownItem currentSort={sortType} onSortChange={handleSortChange} />
      </div>

      <div className="flex flex-col gap-4">
        {sortedPlan.length > 0 ? (
          sortedPlan.map((item) => {
            const dday = getDday(item.extra?.startDate);
            if (dday >= 0) return null;

            return (
              <Link href={`/review/${item._id}?place=${item.title}`} key={item._id}>
                <DayItem place={item.title} period={`${item.extra?.startDate} ~ ${item.extra?.endDate}`} dday={dday} />
              </Link>
            );
          })
        ) : (
          <Link href="/plan">
            <DayItem />
          </Link>
        )}
      </div>
    </>
  );
}

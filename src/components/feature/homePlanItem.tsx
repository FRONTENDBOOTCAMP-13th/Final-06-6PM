"use client";

import { CalendarDays, NotebookPen } from "lucide-react";
import { useEffect, useState } from "react";
import DayItem from "@/components/ui/dayItem";
import Link from "next/link";
import { GetPlanDetailProps } from "@/types/plan";
import { getPlanListUser } from "@/lib/api/plan";
import useUserStore from "@/zustand/userStore";
import { getDday } from "@/lib/getDday";

export default function HomePlanItem() {
  const token = useUserStore((state) => state.token);
  const [plan, setPlan] = useState<GetPlanDetailProps[]>([]);

  useEffect(() => {
    const planListUserData = async () => {
      const res = await getPlanListUser(token);
      if (res.ok) {
        setPlan(res.item);
      }
    };
    planListUserData();
  }, [token]);

  // D-day 기준으로 데이터 필터링
  const getUpcomingTrips = () => {
    return plan
      .filter((item) => {
        const dday = getDday(item.extra?.startDate);
        return dday >= 0;
      })
      .sort((a, b) => {
        const dday1 = getDday(a.extra?.startDate);
        const dday2 = getDday(b.extra?.startDate);
        return dday1 - dday2; // 오름차순 정렬
      });
  };

  const getCompletedTrips = () => {
    return plan
      .filter((item) => {
        const dday = getDday(item.extra?.startDate);
        return dday < 0;
      })
      .sort((a, b) => {
        const dday1 = getDday(a.extra?.startDate);
        const dday2 = getDday(b.extra?.startDate);
        return dday2 - dday1; // 내림차순 정렬
      });
  };
  const maxUpcomingTrips = 2;
  const maxCompletedTrips = 2;
  const showUpcomingTrips = getUpcomingTrips().slice(0, maxUpcomingTrips);
  const showCompletedTrips = getCompletedTrips().slice(0, maxCompletedTrips);

  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <div className="flex items-center gap-2 mb-2 font-bold text-18 text-travel-text100">
          <CalendarDays className="size-6" />
          예정된 여행
        </div>
        {showUpcomingTrips.length > 0 ? (
          showUpcomingTrips.map((item) => {
            const dday = getDday(item.extra?.startDate);
            return (
              <Link href={`/plan/${item._id}`} key={item._id}>
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
      <div className="space-y-3">
        <div className="flex items-center gap-2 mb-2 font-bold text-18 text-travel-text100">
          <NotebookPen className="size-6" />
          이전에 다녀온 여행을 기록해보세요!
        </div>

        <div className="flex flex-col gap-3">
          {showCompletedTrips.length > 0 ? (
            showCompletedTrips.map((item) => (
              <Link href={`/review/${item._id}?place=${item.title}`} key={item._id}>
                <DayItem place={item.title} period={`${item.extra?.startDate} ~ ${item.extra?.endDate}`} />
              </Link>
            ))
          ) : (
            <Link href="/plan">
              <DayItem place="완료된 여행이 없어요" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

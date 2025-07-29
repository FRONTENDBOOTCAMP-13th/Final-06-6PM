"use client";

import { CalendarDays, NotebookPen } from "lucide-react";
import { useEffect, useState } from "react";
import DayItem from "@/components/ui/dayItem";
import Link from "next/link";
import { GetPlanDetailProps } from "@/types/plan";
import { getPlanListUser } from "@/lib/api/plan";
import useUserStore from "@/zustand/userStore";
import { getDday } from "@/lib/getDday";

export default function TripPage() {
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
    return plan.filter((item) => {
      const dday = getDday(item.extra?.startDate);
      return dday >= 0;
    });
  };

  const getCompletedTrips = () => {
    return plan.filter((item) => {
      const dday = getDday(item.extra?.startDate);
      return dday < 0;
    });
  };

  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <div className="flex items-center gap-2 mb-2 font-bold text-18 text-travel-text100">
          <CalendarDays className="size-6" />
          예정된 여행
        </div>
        {getUpcomingTrips().length > 0 ? (
          getUpcomingTrips().map((item) => {
            const dday = getDday(item.extra?.startDate);
            return (
              <DayItem
                key={item._id}
                place={item.title}
                period={`${item.extra?.startDate} ~ ${item.extra?.endDate}`}
                dday={dday}
              />
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
        {getCompletedTrips().length > 0 ? (
          getCompletedTrips().map((item) => (
            <Link href="/review" key={item._id}>
              <DayItem place={item.title} period={`${item.extra?.startDate} ~ ${item.extra?.endDate}`} />
            </Link>
          ))
        ) : (
          <div className="text-center text-black py-8">완료된 여행이 없습니다.</div>
        )}
      </div>
    </div>
  );
}

"use client";

import { MapPinned } from "lucide-react";
import { useEffect, useState } from "react";
import DayItem, { DayItemProps } from "../ui/dayItem";
import { GetPlanDetailProps } from "@/types/plan";
import { getPlanListUser } from "@/lib/api/plan";
import useUserStore from "@/zustand/userStore";
import { getDday } from "@/lib/getDday";

export default function SelectMypage() {
  const [tab, setTab] = useState(0);
  const token = useUserStore((state) => state.token);
  const [plan, setPlan] = useState<GetPlanDetailProps[]>([]);

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

  // D-day 기준으로 데이터 필터링
  const FilterPlanData = (tabId: number) => {
    return plan.filter((item) => {
      const dday = getDday(item.extra?.startDate);
      if (tabId === 0) {
        return dday >= 0;
      } else {
        return dday < 0;
      }
    });
  };

  const tabData = [
    {
      id: 0,
      title: "다가오는 여행",
      description: FilterPlanData(0),
    },
    {
      id: 1,
      title: "완료된 여행",
      description: FilterPlanData(1),
    },
  ];

  return (
    <div>
      <div className="grid grid-cols-2">
        {tabData.map((item) => (
          <div
            key={item.id}
            className={`text-14 flex flex-col items-center p-1.5 gap-1.5 cursor-pointer ${
              tab === item.id
                ? "text-white bg-travel-secondary100  border-b border-b-travel-secondary200"
                : "text-travel-gray400 bg-white border-b border-b-travel-gray200"
            }`}
            onClick={() => setTab(item.id)}
          >
            <MapPinned className="w-[1.25rem] h-[1.25rem]" />
            <span>{item.title}</span>
          </div>
        ))}
      </div>

      <div className="space-y-4 p-4">
        {tabData[tab].description.length > 0 ? (
          tabData[tab].description.map((item) => {
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
          <DayItem />
        )}
      </div>
    </div>
  );
}

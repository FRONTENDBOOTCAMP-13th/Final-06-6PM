"use client";
import DayItem from "@/components/ui/dayItem";
import DropdownItem from "@/components/feature/dropdownItem";
import { useEffect, useState } from "react";
import useUserStore from "@/zustand/userStore";
import { getPlanListUser } from "@/lib/api/plan";
import { GetPlanDetailProps } from "@/types/plan";
import { getDday } from "@/lib/getDday";
import Link from "next/link";

const dummyList = [
  {
    title: "최신순",
  },
  {
    title: "오래된순",
  },
];

// 여행기록_일정선택하기
export default function ReviewNew() {
  const [selectOpen, setSelectOpen] = useState(false);
  const [selectData, setSelectData] = useState(dummyList[0].title);

  const token = useUserStore((state) => state.token);
  const [plan, setPlan] = useState<GetPlanDetailProps[]>([]);

  const listData = (
    <>
      {dummyList.map((item, idx) => (
        <li
          key={idx}
          onClick={() => {
            setSelectData(item.title);
            setSelectOpen((prev) => !prev);
          }}
          className="hover:bg-travel-primary200 hover:text-white py-1 px-3 text-[13px]"
        >
          {item.title}
        </li>
      ))}
    </>
  );

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

  console.log(plan);

  return (
    <>
      <div className="relative flex flex-row-reverse my-3">
        <DropdownItem label={selectData} openModal={() => setSelectOpen((prev) => !prev)} />

        {selectOpen && (
          <ul className="flex flex-col bg-white absolute top-[28px] right-0 w-24 border border-travel-gray400 rounded">
            {listData}
          </ul>
        )}
      </div>
      <div className="flex flex-col gap-4">
        {plan.length > 0 ? (
          plan.map((item) => {
            const dday = getDday(item.extra?.startDate);
            if (dday >= 0) return null;

            return (
              <Link
                href={`/review/${item._id}?place=${item.title}&startDate=${item.extra?.startDate}&endDate=${item.extra?.endDate}`}
                key={item._id}
              >
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

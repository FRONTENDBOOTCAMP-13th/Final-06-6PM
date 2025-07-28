"use client";

import { CalendarDays, LayoutList, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import ViewItem from "./viewItem";
import useUserStore from "@/zustand/userStore";
import { GetReviewDetailProps } from "@/types/review";
import { getReviewAllUser, getReviewDailyUser, getReviewPlaceUser } from "@/lib/api/review";
import { useSearchParams } from "next/navigation";

interface FetchProps {
  all: boolean;
  daily: boolean;
  place: boolean;
}

export default function SelectReview() {
  const [tab, setTab] = useState(0);
  const token = useUserStore((state) => state.token);

  const [reviewAll, setReviewAll] = useState<GetReviewDetailProps[]>([]);
  const [reviewDaily, setReviewDaily] = useState<GetReviewDetailProps[]>([]);
  const [reviewPlace, setReviewPlace] = useState<GetReviewDetailProps[]>([]);

  const [fetched, setFetched] = useState<FetchProps>({
    all: false,
    daily: false,
    place: false,
  });

  const searchParams = useSearchParams();
  const planIdParam = searchParams.get("plan_id");

  useEffect(() => {
    if (!token) return;

    const fetchData = async () => {
      if (tab === 0 && !fetched.all) {
        const res = await getReviewAllUser(token);
        if (res.ok) {
          setReviewAll(res.item);
          setFetched((prev) => ({ ...prev, all: true }));
        }
      } else if (tab === 1 && !fetched.daily) {
        const res = await getReviewDailyUser(token);
        if (res.ok) {
          setReviewDaily(res.item);
          setFetched((prev) => ({ ...prev, daily: true }));
        }
      } else if (tab === 2 && !fetched.place) {
        const res = await getReviewPlaceUser(token);
        if (res.ok) {
          setReviewPlace(res.item);
          setFetched((prev) => ({ ...prev, place: true }));
        }
      }
    };

    fetchData();
  }, [tab, token]);

  const tabData = [
    {
      id: 0,
      title: "일정전체",
      icon: <LayoutList className="w-[1.25rem] h-[1.25rem]" />,
      description: reviewAll,
    },
    {
      id: 1,
      title: "일자별",
      icon: <CalendarDays className="w-[1.25rem] h-[1.25rem]" />,
      description: reviewDaily,
    },
    {
      id: 2,
      title: "장소별",
      icon: <MapPin className="w-[1.25rem] h-[1.25rem]" />,
      description: reviewPlace,
    },
  ];

  // 쿼리스트링(plan_id)이 있으면 필터링
  const filterReview = planIdParam
    ? tabData[tab].description.filter((item) => item.extra.plan_id === Number(planIdParam))
    : tabData[tab].description;

  return (
    <div>
      <div className="grid grid-cols-3 divide-x divide-travel-gray100">
        {tabData.map((item) => (
          <div
            key={item.id}
            className={`text-14 flex flex-col items-center p-1.5 gap-1.5 cursor-pointer ${
              tab === item.id
                ? "text-white bg-travel-secondary100 border-b border-b-travel-secondary200"
                : "text-travel-gray400 bg-white border-b border-b-travel-gray200"
            }`}
            onClick={() => setTab(item.id)}
          >
            {item.icon}
            <span>{item.title}</span>
          </div>
        ))}
      </div>

      <div className="space-y-4 p-4 min-h-25 content-center">
        {filterReview.length > 0 ? (
          filterReview.map((item) => <ViewItem key={item._id} {...item} />)
        ) : (
          <div className="text-center text-travel-gray300 text-sm">리뷰가 없습니다.</div>
        )}
      </div>
    </div>
  );
}

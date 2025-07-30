"use client";

import { useEffect, useState } from "react";
import useUserStore from "@/zustand/userStore";
import { useSearchParams } from "next/navigation";

import { GetReviewDetailProps } from "@/types/review";
import { getReviewAllUser, getReviewDailyUser, getReviewPlaceUser } from "@/lib/api/review";
import { CalendarDays, LayoutList, MapPin } from "lucide-react";
import ViewItem from "./viewItem";

// 리뷰 타입별 요청
interface ReviewTypeProps {
  all: boolean;
  daily: boolean;
  place: boolean;
}

export default function SelectReview() {
  const token = useUserStore((state) => state.token);
  const searchParams = useSearchParams();
  const planIdParam = searchParams.get("plan_id");

  const [tab, setTab] = useState(0);
  const [reviewAll, setReviewAll] = useState<GetReviewDetailProps[]>([]);
  const [reviewDaily, setReviewDaily] = useState<GetReviewDetailProps[]>([]);
  const [reviewPlace, setReviewPlace] = useState<GetReviewDetailProps[]>([]);
  const [deleteReviewId, setDeleteReviewId] = useState<number | null>(null);

  const [reviewType, setReviewType] = useState<ReviewTypeProps>({
    all: false,
    daily: false,
    place: false,
  });

  // 삭제 성공 시 데이터 새로고침하는 콜백 함수
  const handleDelete = (reviewId: number) => {
    setDeleteReviewId(reviewId);

    // 현재 탭에 따라 해당하는 상태에서 리뷰 제거
    if (tab === 0) {
      setReviewAll((prev) => prev.filter((item) => item._id !== reviewId));
    } else if (tab === 1) {
      setReviewDaily((prev) => prev.filter((item) => item._id !== reviewId));
    } else if (tab === 2) {
      setReviewPlace((prev) => prev.filter((item) => item._id !== reviewId));
    }
  };

  // 탭에 해당하는 리뷰데이터 요청
  useEffect(() => {
    if (!token) return;

    const fetchData = async () => {
      if (tab === 0 && !reviewType.all) {
        const res = await getReviewAllUser(token);
        if (res.ok) {
          setReviewAll(res.item);
          setReviewType((prev) => ({ ...prev, all: true }));
        }
      } else if (tab === 1 && !reviewType.daily) {
        const res = await getReviewDailyUser(token);
        if (res.ok) {
          setReviewDaily(res.item);
          setReviewType((prev) => ({ ...prev, daily: true }));
        }
      } else if (tab === 2 && !reviewType.place) {
        const res = await getReviewPlaceUser(token);
        if (res.ok) {
          setReviewPlace(res.item);
          setReviewType((prev) => ({ ...prev, place: true }));
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
          filterReview.map((item) => <ViewItem key={`${item.type}-${item._id}`} {...item} onDelete={handleDelete} />)
        ) : (
          <div className="text-center text-travel-gray300 text-sm">리뷰가 없습니다.</div>
        )}
      </div>
    </div>
  );
}

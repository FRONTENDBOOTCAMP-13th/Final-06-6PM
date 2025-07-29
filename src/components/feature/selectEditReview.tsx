"use client";

import ReviewDetailForm from "@/components/form/reviewDetailForm";
import ReviewFormAll from "@/components/form/reviewFormAll";
import { DayItem } from "@/components/form/reviewSelect";
import { getPlanDetail } from "@/data/functions/plan";
import { PlanReply } from "@/types/plan";
import { CalendarDays, LayoutList, MapPin } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export default function SelectEditReview() {
  const [tab, setTab] = useState(0);
  const [planReply, setPlanReply] = useState<PlanReply[]>([]);
  const params = useParams();
  const planId = Number(params?.id);
  const [selectItem, setSelectItem] = useState<DayItem | null>(null);

  // reviewDaily
  const reviewDaily: DayItem[] = useMemo(() => {
    return planReply.map((day) => ({
      days: day.planDate,
      place: day.locations.map((location) => location.title),
    }));
  }, [planReply]);

  // reviewPlace
  const reviewPlace: DayItem[] = useMemo(() => {
    const places: DayItem[] = [];
    planReply.forEach((day) => {
      day.locations.forEach((location) => {
        places.push({
          days: day.planDate,
          place: location.title,
        });
      });
    });
    return places;
  }, [planReply]);

  const data = [
    {
      id: 0,
      title: "일정전체",
      icon: <LayoutList className="w-[1.25rem] h-[1.25rem]" />,
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

  useEffect(() => {
    if (tab === 0) {
      setSelectItem(null); // 일정전체는 선택 항목 없음
      return;
    }

    const targetList = tab === 1 ? reviewDaily : reviewPlace;
    if (targetList.length > 0) {
      setSelectItem(targetList[0]);
    }
  }, [tab, reviewDaily, reviewPlace]);

  // API 데이터 로드
  useEffect(() => {
    const fetchPlanData = async () => {
      try {
        const res = await getPlanDetail(planId);
        console.log(res);
        if (res.ok) {
          setPlanReply(res.item.replies);
        }
      } catch (error) {
        console.error("Plan 데이터 로드 실패:", error);
      }
    };

    if (planId) {
      fetchPlanData();
    }
  }, [planId]);

  return (
    <div>
      {/* 탭 네비게이션 */}
      <div className="grid grid-cols-3 divide-x divide-travel-gray100">
        {data.map((item) => (
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

      {/* 컨텐츠 영역 */}
      {tab === 0 && <ReviewFormAll />}

      {tab === 1 && selectItem && reviewDaily.length > 0 && (
        <ReviewDetailForm
          list={reviewDaily}
          selected={selectItem}
          onChange={setSelectItem}
          reviewType="reviewDaily" // 일자별
        />
      )}

      {tab === 2 && selectItem && reviewPlace.length > 0 && (
        <ReviewDetailForm
          list={reviewPlace}
          selected={selectItem}
          onChange={setSelectItem}
          reviewType="reviewPlace" // 장소별
        />
      )}

      {/* 로딩 상태나 빈 데이터 처리 */}
      {tab === 1 && reviewDaily.length === 0 && (
        <div className="p-4 text-center text-travel-gray400">일자별 데이터가 없습니다.</div>
      )}

      {tab === 2 && reviewPlace.length === 0 && (
        <div className="p-4 text-center text-travel-gray400">장소별 데이터가 없습니다.</div>
      )}
    </div>
  );
}

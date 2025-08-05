"use client";

import DayItem from "@/components/ui/dayItem";
import DropdownItem from "@/components/feature/dropdownItem";
import { useEffect, useState } from "react";
import useUserStore from "@/zustand/userStore";
import { getPlanListUser } from "@/lib/api/plan";
import { GetPlanDetailProps } from "@/types/plan";
import { getDday } from "@/lib/getDday";
import Link from "next/link";
import TagItem from "@/components/feature/tagItem";

type SortType = "latest" | "oldest";

// 여행기록 일정선택하기
export default function ReviewNew() {
  const [sortType, setSortType] = useState<SortType>("latest");
  const [plan, setPlan] = useState<GetPlanDetailProps[]>([]);

  const token = useUserStore((state) => state.token);

  // 정렬 변경 핸들러
  const handleSortChange = (type: SortType) => {
    setSortType(type);
  };

  // 날짜 추출 함수
  const getDate = (item: GetPlanDetailProps) => {
    const dateStr = item.extra?.startDate || item.createdAt;
    const date = new Date(dateStr);
    return isNaN(date.getTime()) ? 0 : date.getTime();
  };

  // 여행 계획 정렬
  const sortedPlan = [...plan].sort((a, b) => {
    const dateA = getDate(a);
    const dateB = getDate(b);
    return sortType === "latest" ? dateB - dateA : dateA - dateB;
  });

  // 여행 분류
  const planDivide = (plans: GetPlanDetailProps[]) => {
    const pastPlan = plans.filter((item) => getDday(item.extra?.startDate) < 0);
    const upcomingPlan = plans.filter((item) => getDday(item.extra?.startDate) >= 0);
    return { pastPlan, upcomingPlan };
  };

  // 다가오는 여행(비활성화)
  const renderUpcomingPlan = (item: GetPlanDetailProps) => {
    const dday = getDday(item.extra?.startDate);

    return (
      <div key={item._id} className="relative rounded-xl overflow-hidden border border-travel-gray300/50 shadow-md">
        <div className="opacity-50 pointer-events-none">
          <DayItem place={item.title} period={`${item.extra?.startDate} ~ ${item.extra?.endDate}`} dday={dday} />
        </div>

        <div className="absolute inset-0 flex items-center gap-2 justify-center bg-travel-gray100/10 backdrop-blur-xs px-4 text-center">
          <p className="text-14 font-medium">
            다녀온 여행지의 경우에만
            <br />
            여행 후기 기록이 가능합니다
          </p>
          <TagItem variant="fill" className="min-w-[54px]">
            D-{dday}
          </TagItem>
        </div>
      </div>
    );
  };

  // 다녀온 여행(활성화)
  const renderPastPlan = (item: GetPlanDetailProps) => {
    const dday = getDday(item.extra?.startDate);

    return (
      <Link href={`/review/${item._id}?place=${item.title}`} key={item._id}>
        <DayItem place={item.title} period={`${item.extra?.startDate} ~ ${item.extra?.endDate}`} dday={dday} />
      </Link>
    );
  };

  // 여행 계획 렌더링 로직
  const renderTravelPlan = () => {
    // 계획이 없는 경우
    if (sortedPlan.length === 0) {
      return (
        <Link href="/plan">
          <DayItem />
        </Link>
      );
    }

    const { pastPlan, upcomingPlan } = planDivide(sortedPlan);

    // 과거 여행이 있으면 과거 여행만 보여주기
    if (pastPlan.length > 0) {
      return pastPlan.map(renderPastPlan);
    }

    // 과거 여행이 없으면 미래 여행 보여주기(비활성화)
    return upcomingPlan.map(renderUpcomingPlan);
  };

  // 여행 계획 데이터 가져오기
  useEffect(() => {
    const fetchPlanList = async () => {
      try {
        const res = await getPlanListUser(token);
        if (res.ok) {
          setPlan(res.item);
        }
      } catch (error) {
        console.error("여행 계획 목록을 가져오는데 실패했습니다:", error);
      }
    };

    if (token) {
      fetchPlanList();
    }
  }, [token]);

  return (
    <>
      <div className="relative flex flex-row-reverse my-3">
        <DropdownItem currentSort={sortType} onSortChange={handleSortChange} />
      </div>

      <div className="flex flex-col gap-4">{renderTravelPlan()}</div>
    </>
  );
}

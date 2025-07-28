"use client";
import SelectReview from "@/components/feature/selectReview";
import { getPlanListUser } from "@/lib/api/plan";
import { GetPlanDetailProps } from "@/types/plan";
import useUserStore from "@/zustand/userStore";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

// 마이페이지/리뷰
export default function MypageReviewPage() {
  const token = useUserStore((state) => state.token);
  const router = useRouter();
  const searchParams = useSearchParams();

  const [userPlan, setUserPlan] = useState<GetPlanDetailProps[]>([]);
  const [selectPlan, setSelectPlan] = useState<string>(searchParams.get("plan_id") || "");

  useEffect(() => {
    const UserPlanData = async () => {
      if (!token) return;
      try {
        const res = await getPlanListUser(token);
        if (res.ok) {
          setUserPlan(res.item);
        }
      } catch (error) {
        console.error("계획 데이터 로드 실패:", error);
      }
    };

    UserPlanData();
  }, [token]);

  // 셀렉트박스 변경 핸들러
  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectPlan(value);
    const query = value ? `?plan_id=${value}` : "";
    router.replace(`/mypage/review${query}`);
  };

  return (
    <>
      <div className="relative mb-2">
        <label htmlFor="daily-review" className="sr-only">
          일정선택
        </label>
        <select
          name="daily-review"
          id="daily-review"
          value={selectPlan}
          onChange={handleSelect}
          className="w-full border border-travel-gray400 py-3 px-4 rounded-lg 
            bg-white text-travel-text100 text-14
               focus:outline-none focus:border-travel-primary100 focus:ring-2 focus:ring-travel-primary100
               hover:border-travel-primary100
               appearance-none cursor-pointer"
        >
          <option value="" className="text-travel-gray500">
            필터링하고 싶은 일정을 선택하세요
          </option>
          {userPlan.map((plan) => (
            <option key={plan._id} value={String(plan._id)} className="py-2">
              {plan.title} ({plan.extra.startDate} ~ {plan.extra.endDate})
            </option>
          ))}
        </select>

        <div className="absolute top-4 right-0 flex items-center px-3 pointer-events-none">
          <ChevronDown className="w-4 h-4 text-travel-gray600" />
        </div>
      </div>
      <div className="bg-white rounded-2xl overflow-hidden">
        <SelectReview />
      </div>
    </>
  );
}

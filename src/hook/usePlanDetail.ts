"use client";
import { useState, useEffect } from "react";
import { getPlanDetail } from "@/data/functions/plan";
import { GetPlanDetailProps } from "@/types/plan";
import usePlanStore from "@/zustand/planStore";
import { destinationList } from "@/lib/data/destinationList";

export function usePlanDetail(postId: number) {
  const [planData, setPlanData] = useState<GetPlanDetailProps | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasReplies, setHasReplies] = useState(false);

  const { setDailyPlans, setPostId, setSelectedArea, setStartDate, setEndDate } = usePlanStore();

  useEffect(() => {
    const loadData = async () => {
      if (!postId || isNaN(postId)) {
        setIsLoading(false);
        return;
      }

      try {
        const res = await getPlanDetail(postId);

        if (res.ok && res.item) {
          setPlanData(res.item);

          const hasRepliesData = res.item.replies && Array.isArray(res.item.replies) && res.item.replies.length > 0;
          setHasReplies(hasRepliesData);

          // Zustand 저장
          setPostId(res.item._id);
          setStartDate(res.item.extra?.startDate);
          setEndDate(res.item.extra?.endDate);

          const foundArea = destinationList.find((dest) => dest.name === res.item.title);
          if (foundArea) {
            setSelectedArea(foundArea);
          }

          if (hasRepliesData) {
            const convertedDailyPlans = res.item.replies.map((reply) => ({
              day: reply.day,
              planDate: reply.planDate,
              replyId: reply._id,
              places: Array.isArray(reply.locations)
                ? reply.locations.map((location) => ({
                    id: parseInt(location.contentId),
                    name: location.title,
                    category: location.types,
                    mapx: location.mapx ? parseFloat(location.mapx.toString()) : undefined,
                    mapy: location.mapy ? parseFloat(location.mapy.toString()) : undefined,
                  }))
                : [],
            }));
            setDailyPlans(convertedDailyPlans);
          } else {
            setDailyPlans([]);
          }
        }
      } catch (error) {
        console.error("데이터 로딩 실패:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [postId, setDailyPlans, setPostId, setSelectedArea, setStartDate, setEndDate]);

  return { planData, isLoading, hasReplies };
}

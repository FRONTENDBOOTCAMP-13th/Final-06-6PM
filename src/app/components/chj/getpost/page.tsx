"use client";

import { useEffect, useState } from "react";
import { GetPlanDetailProps } from "@/types/plan";
import { getPlanDetail } from "@/data/functions/plan";

export default function PostPage() {
  const [planData, setPlanData] = useState<GetPlanDetailProps | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getPlanDetail(2);
      if (res?.ok) {
        setPlanData(res.item);
        console.log("일정 데이터:", res.item);
      }
    };

    fetchData();
  }, []);

  if (!planData) {
    return <div>일정 정보가 없습니다</div>;
  }

  return (
    <div>
      <h1>{planData.title}</h1>
      <p>{planData.user.name}</p>
      <p>{planData.views}회</p>

      {planData.replies.map((reply) => (
        <div key={reply._id}>
          <h3>{reply.day}일차</h3>
          {reply.locations.map((location, index) => (
            <p key={index}>{location.title}</p>
          ))}
        </div>
      ))}
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { PlanItem } from "./types/plan";
import { fetchPlanDetail } from "./devide/fetchPlanDetail";

export default function PostPage() {
  const [planData, setPlanData] = useState<PlanItem | null>(null);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchPlanDetail();
      setPlanData(data);
    };
    loadData();
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

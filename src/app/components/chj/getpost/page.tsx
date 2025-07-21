"use client";

import { useEffect, useState } from "react";

interface PlanResponse {
  ok: number;
  item: PlanItem;
}
interface PlanItem {
  _id: number;
  type: string;
  views: number;
  user: User;
  title: string;
  createdAt: string;
  updatedAt: string;
  extra: PlanExtra;
  replies: PlanReply[];
}
interface User {
  _id: number;
  name: string;
  image: string;
}
interface PlanExtra {
  startDate: string;
  endDate: string;
}
interface PlanReply {
  _id: number;
  content: string;
  day: number;
  planDate: string;
  locations: Location[];
}
interface Location {
  title: string;
  types: string;
  contentId: string;
  mapx: string;
  mapy: string;
}

export default function PostPage() {
  const api_url =
    process.env.NEXT_PUBLIC_API_SERVER || "https://fesp-api.koyeb.app/market";
  const client_id = process.env.NEXT_PUBLIC_CLIENT_ID || "febc13-final06-emjf";

  const [planData, setPlanData] = useState<PlanItem | null>(null);

  const fetchPlanDetail = async () => {
    try {
      const response = await fetch(`${api_url}/posts/2`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "client-id": client_id,
        },
      });

      const data: PlanResponse = await response.json();

      if (data.ok) {
        setPlanData(data.item);
        console.log("일정 데이터:", data.item);
      }
    } catch (error) {
      console.error("일정 조회 실패:", error);
    }
  };

  useEffect(() => {
    fetchPlanDetail();
  }, []);

  if (!planData) {
    return <div>일정 정보가 없습니다</div>;
  }
  return (
    <div>
      <>
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
      </>
    </div>
  );
}

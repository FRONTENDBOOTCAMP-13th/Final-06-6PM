"use client";

import DrawerMypage from "@/components/mypage/drawerMypage";
import { getUser } from "@/data/functions/user";
import { getUserStats, UserStats } from "@/data/functions/userStats";
import { User } from "@/types/user";
import useUserStore from "@/zustand/userStore";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export interface ProfileItemProps {
  postsCount?: number;
  likesCount?: number;
  totalLikes?: number;
}

export default function ProfileItem({
  postsCount: propPostsCount,
  likesCount: propLikesCount,
  totalLikes: propTotalLikes,
}: ProfileItemProps) {
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [stats, setStats] = useState<UserStats>({
    postsCount: propPostsCount || 0,
    totalBookmarks: propLikesCount || 0,
    totalViews: propTotalLikes || 0,
  });
  const [loading, setLoading] = useState(true);

  const user = useUserStore((state) => state.userInfo);
  const token = useUserStore((state) => state.token);
  const imgUrl = user?.image || "/images/user-default.webp";

  // 회원 정보 및 통계
  useEffect(() => {
    const fetchUserData = async () => {
      if (!user?._id || !token) return;

      setLoading(true);
      try {
        const [userResponse, statsResponse] = await Promise.all([
          getUser(user._id),
          getUserStats(user._id, token || ""),
        ]);

        if (userResponse.ok) {
          setUserInfo(userResponse.item);
        }

        if (statsResponse.ok && statsResponse.item) {
          setStats(statsResponse.item);
        }
      } catch (error) {
        console.error("데이터 로딩 오류:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user?._id, token]);

  return (
    <div className="relative flex flex-col items-center gap-4 px-5 py-8 font-sans text-center bg-white shadow rounded-xl">
      <DrawerMypage />

      {/* 프로필이미지 */}
      <div className="overflow-hidden rounded-full w-25 h-25 bg-travel-gray200 aspect-square">
        <Image
          width={100}
          height={100}
          src={imgUrl}
          alt={user?.name || "사용자"}
          className="object-cover w-full h-full"
        />
      </div>

      {/* 프로필기본내용 */}
      <div className="space-y-1">
        <h2 className="font-semibold text-20">{user?.name}</h2>
        <p className="px-3 break-keep text-travel-gray700 line-clamp-3">{userInfo?.desc || "소개글이 없습니다."}</p>
      </div>

      {/* 작성한글/좋아요/조회수 */}
      <div className="flex items-center justify-center gap-8">
        <div className="space-y-1">
          <p className="font-semibold text-24 text-travel-success200" aria-hidden="true">
            {loading ? "-" : stats.postsCount}
          </p>
          <p className="text-14 text-travel-gray700" aria-label={`작성한 글 ${stats.postsCount}개`}>
            작성한 글
          </p>
        </div>
        <div className="space-y-1">
          <p className="font-semibold text-24 text-travel-like100" aria-hidden="true">
            {loading ? "-" : stats.totalBookmarks}
          </p>
          <p className="text-14 text-travel-gray700" aria-label={`받은 좋아요 ${stats.totalBookmarks}개`}>
            받은 좋아요
          </p>
        </div>
        <div className="space-y-1">
          <p className="font-semibold text-24 text-travel-warn100" aria-hidden="true">
            {loading ? "-" : stats.totalViews}
          </p>
          <p className="text-14 text-travel-gray700" aria-label={`총 조회수 ${stats.totalViews}개`}>
            총 조회수
          </p>
        </div>
      </div>
    </div>
  );
}

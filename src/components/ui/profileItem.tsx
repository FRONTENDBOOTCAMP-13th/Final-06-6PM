"use client";

import DrawerMypage from "@/components/feature/drawerMypage";
import { getUser } from "@/data/functions/user";
import { User } from "@/types/user";
import useUserStore from "@/zustand/userStore";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_SERVER;

export interface ProfileItemProps {
  postsCount?: number;
  likesCount?: number;
  totalLikes?: number;
}

export default function ProfileItem({
  postsCount = 0,
  likesCount = 0,
  totalLikes = 0,
}: ProfileItemProps) {
  const [userInfo, setUserInfo] = useState<User | null>(null);

  const user = useUserStore((state) => state.userInfo);
  const imgUrl = user?.image?.startsWith("http")
    ? user.image
    : `${API_URL}/${user?.image}`;

  // 사용자 정보
  useEffect(() => {
    const userId = user!._id;
    const userData = async () => {
      const res = await getUser(userId);
      setUserInfo(res.item);
    };
    userData();
  }, []);

  return (
    <div className="relative flex flex-col items-center gap-4 px-5 py-8 font-sans text-center bg-white shadow rounded-xl">
      <DrawerMypage />

      {/* 프로필이미지 */}
      <div className="overflow-hidden rounded-full w-25 h-25 bg-travel-gray200 aspect-square">
        {imgUrl && (
          <Image
            width={100}
            height={100}
            src={imgUrl || "/images/user1.png"}
            alt={user?.name || "사용자"}
            className="object-cover w-full h-full"
          />
        )}
      </div>

      {/* 프로필기본내용 */}
      <div className="space-y-1">
        <h2 className="font-semibold text-20">{user?.name}</h2>
        <p className="px-3 break-keep text-travel-gray700 line-clamp-3">
          {userInfo?.desc || "소개글이 없습니다."}
        </p>
      </div>

      {/* 작성한글/좋아요/조회수 */}
      <div className="flex items-center justify-center gap-8">
        <div className="space-y-1">
          <p className="font-semibold text-24 text-travel-success100">
            {postsCount}
          </p>
          <p className="text-14 text-travel-gray700">작성한 글</p>
        </div>
        <div className="space-y-1">
          <p className="font-semibold text-24 text-travel-info100">
            {likesCount}
          </p>
          <p className="text-14 text-travel-gray700">받은 좋아요</p>
        </div>
        <div className="space-y-1">
          <p className="font-semibold text-24 text-travel-warn100">
            {totalLikes}
          </p>
          <p className="text-14 text-travel-gray700">총 조회수</p>
        </div>
      </div>
    </div>
  );
}

import { Settings } from "lucide-react";
import Image from "next/image";
import React from "react";

interface ProfileCardProps {
  profileImage?: string;
  userName: string;
  description?: string;
  postsCount?: number;
  likesCount?: number;
  totalLikes?: number;
}

export default function ProfileCard({
  profileImage = "/gwak.png",
  userName = "사용자",
  description = "새로운 곳을 발견하는 것을 좋아하는 자유로운 여행자 입니다. 어디로든 떠나요~",
  postsCount = 100,
  likesCount = 100,
  totalLikes = 100,
}: ProfileCardProps) {
  return (
    <div className="relative bg-white rounded-2xl py-8 px-5 text-center font-sans flex flex-col items-center gap-4 shadow">
      <div className="absolute top-4 right-4 text-16 cursor-pointer text-travel-gray700">
        <Settings></Settings>
      </div>
      <div className="w-25 h-25">
        {profileImage ? (
          <Image
            width={100}
            height={100}
            src={profileImage}
            alt="프로필"
            className="w-full h-full rounded-full object-cover"
          />
        ) : (
          <div className="w-full h-full rounded-full"></div>
        )}
      </div>

      <h2 className="text-24 font-semibold">{userName}</h2>
      <p className="break-keep text-16 text-travel-gray700">{description}</p>

      <div className="flex justify-center items-center gap-8">
        <div className="space-y-1">
          <p className="text-24 font-semibold text-travel-success100">
            {postsCount}
          </p>
          <p className="text-14 text-travel-gray700">작성한 글</p>
        </div>
        <div className="space-y-1">
          <p className="text-24 font-semibold text-travel-info100">
            {likesCount}
          </p>
          <p className="text-14 text-travel-gray700">받은 좋아요</p>
        </div>
        <div className="space-y-1">
          <p className="text-24 font-semibold text-travel-warn100">
            {totalLikes}
          </p>
          <p className="text-14 text-travel-gray700">총 조회수</p>
        </div>
      </div>
    </div>
  );
}

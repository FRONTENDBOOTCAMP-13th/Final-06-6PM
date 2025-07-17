import { Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export interface ProfileItemProps {
  profileImage?: string;
  userName: string;
  description?: string;
  postsCount?: number;
  likesCount?: number;
  totalLikes?: number;
}

export default function ProfileItem({
  profileImage = "/images/user2.png",
  userName = "사용자",
  description = "사용자 소개글입니다. 사용자 소개글입니다. 사용자 소개글입니다. 사용자 소개글입니다.",
  postsCount = 0,
  likesCount = 0,
  totalLikes = 0,
}: ProfileItemProps) {
  return (
    <div className="relative flex flex-col items-center gap-4 px-5 py-8 font-sans text-center bg-white shadow rounded-xl">
      <Link
        href="/mypage/edit"
        className="absolute top-6 right-5 text-travel-gray700"
      >
        <Settings className="size-6" />
      </Link>

      <div className="overflow-hidden rounded-full w-25 h-25 bg-travel-gray200 aspect-square">
        {profileImage && (
          <Image
            width={100}
            height={100}
            src={profileImage}
            alt={userName}
            className="object-cover w-full h-full"
          />
        )}
      </div>

      <div className="space-y-1">
        <h2 className="font-semibold text-24">{userName}</h2>
        <p className="px-3 break-keep text-travel-gray700 line-clamp-3">
          {description}
        </p>
      </div>

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

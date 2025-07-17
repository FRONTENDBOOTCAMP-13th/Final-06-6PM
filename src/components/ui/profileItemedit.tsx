import Image from "next/image";
import React, { useState } from "react";
import Input from "@/components/ui/input";
import { Camera } from "lucide-react";
import Link from "next/link";

interface ProfileCardProps {
  profileImage?: string;
  userName: string;
  description?: string;
  postsCount?: number;
  likesCount?: number;
  totalLikes?: number;
}

export default function ProfileCardEdit({
  profileImage = "/gwak.png",
  userName = "사용자",
  description = "새로운 곳을 발견하는 것을 좋아하는 자유로운 여행자 입니다. 어디로든 떠나요~",
}: ProfileCardProps) {
  const [userNameValue, setUserNameValue] = useState(userName);
  const [descriptionValue, setDescriptionValue] = useState(description);

  return (
    <div className="relative bg-white rounded-xl py-8 px-5 text-center flex flex-col items-center gap-4 shadow">
      <div className="absolute top-4 right-4 flex gap-1.5">
        <Link href="/mypage">
          <button className="px-3 py-1 bg-white text-black border border-travel-gray400 text-xs rounded-full cursor-pointer">
            취소
          </button>
        </Link>
        <Link href="/mypage">
          <button className="px-3 py-1 bg-black text-white text-xs rounded-full cursor-pointer">
            완료
          </button>
        </Link>
      </div>

      <div className="w-25 h-25 relative cursor-pointer">
        {profileImage ? (
          <>
            <Image
              width={100}
              height={100}
              src={profileImage}
              alt="프로필"
              className="w-full h-full rounded-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
              <Camera className="w-6 h-6 stroke-2 text-white" />
            </div>
          </>
        ) : (
          <div className="w-full h-full rounded-full"></div>
        )}
      </div>

      <div className="w-full">
        <label htmlFor="username" className="sr-only">
          닉네임
        </label>
        <Input
          size="md"
          placeholder="닉네임"
          value={userNameValue}
          onChange={(e) => setUserNameValue(e.target.value)}
        />
      </div>

      <div className="w-full">
        <label htmlFor="description" className="sr-only">
          한줄소개
        </label>
        <Input
          size="md"
          placeholder="한줄소개"
          value={descriptionValue}
          onChange={(e) => setDescriptionValue(e.target.value)}
        />
      </div>

      <button className="w-full bg-travel-secondary100 hover:bg-travel-secondary200 text-white text-14 font-medium py-3.5 rounded-lg">
        비밀번호 수정
      </button>
    </div>
  );
}

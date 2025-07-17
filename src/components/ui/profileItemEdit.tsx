import Image from "next/image";
import React, { useState } from "react";
import Input from "@/components/feature/input";
import { Camera } from "lucide-react";
import Link from "next/link";
import { ProfileItemProps } from "@/components/ui/profileItem";

export default function ProfileItemEdit({
  profileImage = "/gwak.png",
  userName = "사용자",
  description = "새로운 곳을 발견하는 것을 좋아하는 자유로운 여행자 입니다. 어디로든 떠나요~",
}: ProfileItemProps) {
  const [userNameValue, setUserNameValue] = useState(userName);
  const [descriptionValue, setDescriptionValue] = useState(description);

  return (
    <>
      <div className="relative flex flex-col items-center gap-4 px-5 py-8 font-sans text-center bg-white shadow rounded-xl">
        <div className="absolute top-6 right-5 text-travel-gray700">
          <Link href="/mypage">
            <button className="px-3 py-1 text-xs text-black bg-white border rounded-full cursor-pointer border-travel-gray400">
              취소
            </button>
          </Link>
          <Link href="/mypage">
            <button className="px-3 py-1 text-xs text-white bg-black rounded-full cursor-pointer">
              완료
            </button>
          </Link>
        </div>

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

        <div className="w-full">
          <label htmlFor="username" className="sr-only">
            닉네임
          </label>
          <Input
            size="sm"
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
            size="sm"
            placeholder="한줄소개"
            value={descriptionValue}
            onChange={(e) => setDescriptionValue(e.target.value)}
          />
        </div>

        <button className="w-full bg-travel-secondary100 hover:bg-travel-secondary200 text-white text-14 font-medium py-3.5 rounded-lg">
          비밀번호 수정
        </button>
      </div>
    </>
  );
}

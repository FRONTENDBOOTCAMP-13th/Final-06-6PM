"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Camera } from "lucide-react";
import Input from "@/components/ui/input";
import { ProfileItemProps } from "@/components/ui/profileItem";
import ButtonRounded from "@/components/ui/btnRound";

export default function ProfileItemEdit({
  imgUrl = "/images/user2.png",
  userName = "사용자",
  desc = "사용자 소개글입니다. 사용자 소개글입니다. 사용자 소개글입니다. 사용자 소개글입니다.",
}: ProfileItemProps) {
  const router = useRouter();
  const [userNameValue, setUserNameValue] = useState(userName);
  const [descValue, setDescValue] = useState(desc);

  const formSubmit = () => {
    console.log("폼 제출");
    router.push("/mypage");
  };

  const imageClick = () => {
    console.log("이미지 클릭");
  };

  return (
    <form
      action={formSubmit}
      className="relative flex flex-col items-center gap-4 px-5 py-8 text-center bg-white shadow rounded-xl"
    >
      {/* 프로필이미지 */}
      <div className="relative overflow-hidden rounded-full cursor-pointer w-25 h-25 bg-travel-gray200 aspect-square group">
        {imgUrl && (
          <Image
            width={100}
            height={100}
            src={imgUrl}
            alt={userName}
            className="object-cover w-full h-full"
          />
        )}

        <div
          className="absolute inset-0 flex items-center justify-center bg-black/60"
          onClick={() => imageClick()}
        >
          <Camera className="text-white size-7" />
        </div>
      </div>

      {/* 프로필기본내용 */}
      <div className="space-y-1">
        <h2 className="font-semibold text-20">{userName}</h2>
        <p className="px-3 break-keep text-travel-gray700 line-clamp-3">
          {desc}
        </p>
      </div>

      {/* 닉네임 */}
      <div className="w-full">
        <label htmlFor="username" className="sr-only">
          닉네임
        </label>
        <Input
          size="sm"
          id="username"
          name="username"
          defaultValue={userNameValue}
        />
      </div>

      {/* 한줄소개 */}
      <div className="w-full">
        <label htmlFor="description" className="sr-only">
          한줄소개
        </label>
        <Input
          size="sm"
          id="description"
          name="description"
          defaultValue={descValue}
        />
      </div>

      {/* 비밀번호 */}
      <div className="w-full">
        <label htmlFor="password" className="sr-only">
          새 비밀번호
        </label>
        <Input
          size="sm"
          id="password"
          name="password"
          type="password"
          placeholder="새 비밀번호"
        />
      </div>

      <div className="w-full">
        <label htmlFor="passwordConfirm" className="sr-only">
          비밀번호 재확인
        </label>
        <Input
          size="sm"
          id="passwordConfirm"
          name="passwordConfirm"
          type="password"
          placeholder="비밀번호 재확인"
        />
      </div>

      <div className=" text-travel-gray700 flex gap-1.5">
        <Link href="/mypage">
          <ButtonRounded size="md" variant="outline">
            취소
          </ButtonRounded>
        </Link>
        <ButtonRounded size="md" variant="fill" type="submit">
          수정
        </ButtonRounded>
      </div>
    </form>
  );
}

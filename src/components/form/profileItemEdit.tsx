"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Camera } from "lucide-react";
import Input from "@/components/ui/input";
import ButtonRounded from "@/components/ui/btnRound";
import useUserStore from "@/zustand/userStore";
import { User } from "@/types/user";
import { getUser } from "@/data/functions/user";

const API_URL = process.env.NEXT_PUBLIC_API_SERVER;

export default function ProfileItemEdit() {
  const router = useRouter();
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

        <div
          className="absolute inset-0 flex items-center justify-center bg-black/60"
          onClick={() => imageClick()}
        >
          <Camera className="text-white size-7" />
        </div>
      </div>

      {/* 프로필기본내용 */}
      <div className="space-y-1">
        <h2 className="font-semibold text-20">{user?.name}</h2>
        <p className="px-3 break-keep text-travel-gray700 line-clamp-3">
          {userInfo?.desc || "소개글이 없습니다."}
        </p>
      </div>

      {/* 닉네임 */}
      <div className="w-full">
        <Input
          size="sm"
          id="username"
          name="username"
          defaultValue={user?.name}
        />
      </div>

      {/* 한줄소개 */}
      <div className="w-full">
        <Input
          size="sm"
          id="description"
          name="description"
          defaultValue={userInfo?.desc}
        />
      </div>

      {/* 비밀번호 */}
      {/* <div className="w-full">
        <Input
          size="sm"
          id="password"
          name="password"
          type="password"
          placeholder="새 비밀번호"
        />
      </div>

      <div className="w-full">
        <Input
          size="sm"
          id="passwordConfirm"
          name="passwordConfirm"
          type="password"
          placeholder="비밀번호 재확인"
        />
      </div> */}

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

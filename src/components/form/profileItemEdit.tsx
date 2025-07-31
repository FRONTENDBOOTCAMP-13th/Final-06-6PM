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
  const imgUrl = user?.image?.startsWith("http") ? user.image : `${API_URL}/${user?.image}`;

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
      className="relative flex flex-col items-center w-full gap-6 px-5 py-8 text-center bg-white shadow rounded-xl"
    >
      {/* 프로필이미지 */}
      <div className="relative overflow-hidden rounded-full cursor-pointer w-25 h-25 bg-travel-gray200 aspect-square group">
        <div className="relative w-25 h-25 bg-travel-gray200 aspect-square">
          {imgUrl && (
            <Image
              fill
              src={imgUrl || "/images/user-default.webp"}
              alt={user?.name || "사용자"}
              className="object-cover w-full h-full"
            />
          )}
        </div>

        <div className="absolute inset-0 flex items-center justify-center bg-black/60" onClick={() => imageClick()}>
          <Camera className="text-white size-7" />
        </div>
      </div>

      {/* 닉네임 */}
      <div className="w-full">
        <Input size="sm" id="username" name="username" defaultValue={user?.name} />
      </div>

      {/* 한줄소개 */}
      <div className="w-full">
        <Input size="sm" id="description" name="description" defaultValue={userInfo?.desc} />
      </div>

      <div className="grid grid-cols-2 gap-1.5 w-full">
        <Link href="/mypage" className="w-full">
          <ButtonRounded size="md" variant="outline" className="w-full">
            취소
          </ButtonRounded>
        </Link>
        <ButtonRounded size="md" variant="fill" type="submit" className="w-full">
          수정
        </ButtonRounded>
      </div>
    </form>
  );
}

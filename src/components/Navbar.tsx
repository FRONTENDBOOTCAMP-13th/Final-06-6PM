"use client";

import { useRouter } from "next/navigation";
import useUserStore from "@/zustand/userStore";
import Link from "next/link";
import { UserRound, Home, LayoutList, SquarePen, Map } from "lucide-react";

export default function Navbar() {
  const { user } = useUserStore();
  const router = useRouter();

  const userStatusCheck = (e: React.MouseEvent) => {
    if (!user) {
      e.preventDefault();
      router.push("/login");
    }
  };

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] p-4 bg-travel-primary-light100 max-h-21 z-20">
      <div className="grid items-center grid-cols-5 gap-3 mx-auto w-fit">
        <Link
          href="/home"
          className="flex flex-col items-center gap-2 text-white text-14 max-[500px]:text-12"
        >
          <Home />
          <span className="whitespace-nowrap">홈</span>
        </Link>
        <Link
          href="/feed"
          className="flex flex-col items-center gap-2 text-white text-14 max-[500px]:text-12"
        >
          <LayoutList />
          <span className="whitespace-nowrap">살펴보기</span>
        </Link>
        <Link
          href="/plan"
          onClick={userStatusCheck}
          className="flex flex-col items-center gap-2 text-white text-14 max-[500px]:text-12"
        >
          <SquarePen />
          <span className="whitespace-nowrap">기록하기</span>
        </Link>
        <Link
          href="/photomap"
          onClick={userStatusCheck}
          className="flex flex-col items-center gap-2 text-white text-14 max-[500px]:text-12"
        >
          <Map />
          <span className="whitespace-nowrap">지도생성</span>
        </Link>
        <Link
          href="/mypage"
          onClick={userStatusCheck}
          className="flex flex-col items-center gap-2 text-white text-14 max-[500px]:text-12"
        >
          <UserRound />
          <span className="whitespace-nowrap">마이페이지</span>
        </Link>
      </div>
    </nav>
  );
}

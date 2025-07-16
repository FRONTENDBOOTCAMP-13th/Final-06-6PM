import { Home, LayoutList, Map, SquarePen, UserRound } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
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
          className="flex flex-col items-center gap-2 text-white text-14 max-[500px]:text-12"
        >
          <SquarePen />
          <span className="whitespace-nowrap">기록하기</span>
        </Link>
        <Link
          href="/photomap"
          className="flex flex-col items-center gap-2 text-white text-14 max-[500px]:text-12"
        >
          <Map />
          <span className="whitespace-nowrap">지도생성</span>
        </Link>
        <Link
          href="/mypage"
          className="flex flex-col items-center gap-2 text-white text-14 max-[500px]:text-12"
        >
          <UserRound />
          <span className="whitespace-nowrap">마이페이지</span>
        </Link>
      </div>
    </nav>
  );
}

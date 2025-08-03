"use client";

import { useRouter } from "next/navigation";
import { Plane } from "lucide-react";
import ButtonRounded from "@/components/ui/btnRound";
import useUserStore from "@/zustand/userStore";
import usePlanStore from "@/zustand/planStore";

export default function LoginCheck() {
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);
  const { clearAllData } = usePlanStore();
  const router = useRouter();

  const handleClick = () => {
    console.log("로그인 상태:", isLoggedIn);

    if (isLoggedIn) {
      clearAllData();
      router.push("/plan");
    } else {
      router.replace("/login");
    }
  };

  return (
    <div className="fixed z-30 translate-x-full xs:translate-x-[112%] right-1/2 bottom-25">
      <ButtonRounded
        size="lg"
        variant="primary"
        onClick={handleClick}
        className="flex items-center gap-1 shadow-sm shadow-travel-gray700"
      >
        <Plane className="text-white size-6" />
        <span>여행 일정만들기</span>
      </ButtonRounded>
    </div>
  );
}

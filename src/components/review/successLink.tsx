"use client";

import ButtonRounded from "@/components/ui/btnRound";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function SuccessLink() {
  const searchParams = useSearchParams();
  const reviewId = searchParams.get("reviewId");

  return (
    <div className="grid grid-cols-2 gap-3 items-center">
      <Link href={`/feed/${reviewId}`} className="col-span-2">
        <ButtonRounded variant="primary" size="lg" className="w-full">
          작성한 후기 보기
        </ButtonRounded>
      </Link>
      <Link href="/review">
        <ButtonRounded variant="outline" size="lg" className="w-full">
          새 후기 등록하기
        </ButtonRounded>
      </Link>
      <Link href="/home">
        <ButtonRounded variant="outline" size="lg" className="w-full">
          홈으로
        </ButtonRounded>
      </Link>
    </div>
  );
}

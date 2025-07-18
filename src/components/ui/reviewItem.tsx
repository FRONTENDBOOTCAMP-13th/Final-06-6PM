import Button from "@/components/ui/btn";
import Link from "next/link";

export default function ReviewWrite() {
  return (
    <div className="w-full py-8">
      <div className="flex flex-col items-center gap-2 text-travel-text100">
        <h3>작성된 리뷰가 없습니다.</h3>
        <p>여행의 추억을 리뷰로 남겨보세요!</p>
        <Link href="/review">
          <Button size="md" variant="outline" className="mt-2">
            리뷰 작성하기
          </Button>
        </Link>
      </div>
    </div>
  );
}

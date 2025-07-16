import Button from "@/components/ui/btn";
import { MinusCircle, PlusCircle } from "lucide-react";

// 지도생성 뷰
export default function PhotoMapViewPage() {
  return (
    <>
      <div className="w-full min-h-[400px] bg-amber-200 my-4">
        지도 들어올 공간
      </div>
      <div className="space-y-4 text-travel-text100">
        <h3 className="font-semibold text-18">이미지 조정</h3>
        <div className="flex flex-col items-center gap-6 px-20">
          <div className="flex justify-between w-full gap-4">
            <MinusCircle />
            이미지 크기
            <PlusCircle />
          </div>
          <div className="flex justify-between w-full gap-4">
            <MinusCircle />
            사진 회전
            <PlusCircle />
          </div>
          <div className="flex justify-between w-full gap-4">
            <MinusCircle />
            좌우 이동
            <PlusCircle />
          </div>
          <div className="flex justify-between w-full gap-4">
            <MinusCircle />
            상하 이동
            <PlusCircle />
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] p-4  max-h-21 z-20 shadow-[0_-8px_16px_-4px_rgba(0,0,0,0.1)]">
        <Button className="w-full text-16">사진 편집완료</Button>
      </div>
    </>
  );
}

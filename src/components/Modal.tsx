"use client";
import Button from "@/components/ui/btn";
import { MapPin, X } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";

// onClose={() => setSelectItem(null)}
export default function ModalItem({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="w-full bg-white rounded-2xl shadow-lg p-6 max-w-100 relative">
        {/* 화살표 */}
        <button
          className="cursor-pointer absolute right-4 top-4"
          onClick={onClose}
        >
          <X className="w-6 h-6 text-travel-gray600" />
        </button>

        <div className="flex flex-col gap-4">
          {/* 제목 */}
          <div>
            <h2 className="text-24 font-bold text-travel-text200 mb-1.5">
              제주도해변
            </h2>
            <div className="flex items-center text-travel-gray600">
              <MapPin className="w-4 h-4 mr-1" />
              <span className="text-14">제주특별자치도 서귀포시</span>
            </div>
          </div>

          {/* 이미지 */}
          <Image
            width={200}
            height={190}
            src={"/images/place.png"}
            alt={"광주"}
            className="max-h-[190px] aspect-[5/3] w-full object-cover rounded-lg overflow-hidden bg-travel-gray200" // 이미지 못불러올시 회색
          />

          {/* 설명 */}
          <p className="text-14 text-travel-text100 line-clamp-4">
            섬 전체가 하나의 거대한 관광자원인 제주도. 이 해변은 제주도의
            에메랄드빛 물빛이 인상적인 섬 전체가 하나의 거대한 관광자원인
            제주도. 이 해변은 제주도의 에메랄드빛 물빛이 인상적인 섬 전체가
            하나의 거대한 관광자원인 제주도. 이 해변은 제주도의 이 해변 ...
          </p>
        </div>

        {/* 버튼 */}
        <Button size="lg" variant="primary" className="w-full mt-7">
          북마크 저장하기
        </Button>
      </div>
    </div>
  );
}

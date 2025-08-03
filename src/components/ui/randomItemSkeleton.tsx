import { MapPin } from "lucide-react";

export default function RandomItemSkeleton() {
  return (
    <div className="relative rounded-xl overflow-hidden shadow-lg w-full flex items-center min-h-[200px] bg-gray-400/80">
      {/* 콘텐츠 텍스트 */}
      <div className="relative z-10 w-full p-5 text-travel-text100">
        <div className="mb-3 space-y-1">
          {/* 타이틀 */}
          <div className="h-6 w-2/3 bg-white/30 rounded" />
          {/* 위치 */}
          <div className="flex items-center gap-1">
            <div className="h-4 w-1/3 bg-white/30 rounded" />
          </div>
          {/* 설명 */}
          <div className="space-y-1">
            <div className="h-4 w-full bg-white/20 rounded" />
            <div className="h-4 w-full bg-white/20 rounded" />
            <div className="h-4 w-3/4 bg-white/20 rounded" />
          </div>
        </div>

        {/* 하단 안내 문구 */}
        <p className="text-14 text-white/80 flex items-center gap-2 justify-end">
          <MapPin className="w-4 h-4 text-white" />
          <span>여행지를 찾고 있습니다..</span>
        </p>
      </div>
    </div>
  );
}

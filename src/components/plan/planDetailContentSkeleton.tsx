import { MapPin } from "lucide-react";

export default function PlanDetailContentSkeleton() {
  return (
    <div className="flex flex-col gap-7">
      <div className="space-y-4">
        <div className="bg-gray-200 animate-pulse w-[100px] h-10"></div>
        <div className="bg-gray-200 animate-pulse w-[300px] h-6"></div>
      </div>
      <div className="border-travel-gray200 w-full rounded-2xl border bg-white p-5 relative space-y-4">
        <div className="w-[300px] h-7 bg-gray-200 animate-pulse rounded"></div>
        <div className="w-full h-60 bg-gray-200 animate-pulse rounded content-center text-center text-travel-gray700">
          <p className="flex items-center justify-center gap-2">
            <MapPin className="size-5" />
            여행 정보를 불러오는 중...
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <div className="w-30 h-5 bg-gray-200 animate-pulse rounded"></div>
          <div className="w-50 h-5 bg-gray-200 animate-pulse rounded"></div>
          <div className="w-60 h-5 bg-gray-200 animate-pulse rounded"></div>
        </div>
      </div>
    </div>
  );
}

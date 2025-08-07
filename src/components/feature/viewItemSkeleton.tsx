"use client";
import { usePathname } from "next/navigation";

export default function ViewItemSkeleton() {
  const pathname = usePathname();

  // 경로가 '/feed' 일때만 스타일 적용 (/feed와 /feed/view 구분을 위함)
  const isDetailView = pathname.startsWith("/feed/");
  const listClass = `relative w-full space-y-2 ${isDetailView ? "" : "rounded-xl bg-white shadow p-4"}`;

  return (
    <div className={listClass}>
      {/* 상단 사용자 정보 */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-travel-gray200 animate-pulse" />
        <div className="space-y-1 flex-1">
          <div className="h-4 w-1/2 bg-travel-gray200 animate-pulse rounded" />
          <div className="h-3 w-1/3 bg-travel-gray200 animate-pulse rounded" />
        </div>
      </div>

      {/* 방문일자 */}
      <div className="grid grid-cols-[3.4375rem_auto] gap-2 text-14">
        <div className="h-4 bg-travel-gray200 animate-pulse rounded col-span-1" />
        <div className="h-4 bg-travel-gray200 animate-pulse rounded col-span-1" />
      </div>

      {/* 방문장소 */}
      <div className="grid grid-cols-[3.4375rem_auto] gap-2 text-14">
        <div className="h-4 bg-travel-gray200 animate-pulse rounded col-span-1" />
        <div className="flex gap-1 flex-wrap">
          <div className="h-4 w-16 bg-travel-gray200 animate-pulse rounded" />
          <div className="h-4 w-12 bg-travel-gray200 animate-pulse rounded" />
        </div>
      </div>

      {/* 이미지 2칸 */}
      {isDetailView ? (
        <div className="w-full aspect-square bg-travel-gray200 animate-pulse rounded-lg" />
      ) : (
        <div className="grid grid-cols-2 gap-3">
          <div className="aspect-square bg-travel-gray200 animate-pulse rounded-lg" />
          <div className="aspect-square bg-travel-gray200 animate-pulse rounded-lg" />
        </div>
      )}

      {/* 텍스트 내용 */}
      <div className="space-y-2">
        <div className="h-4 w-4/5 bg-travel-gray200 animate-pulse rounded" />
      </div>

      {/* 태그 */}
      <div className="flex gap-2 flex-wrap">
        <div className="h-4 w-10 bg-travel-gray200 animate-pulse rounded" />
        <div className="h-4 w-14 bg-travel-gray200 animate-pulse rounded" />
      </div>

      {/* 별점 및 날짜 */}
      <div className="flex justify-between items-center">
        <div className="flex gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="w-4 h-4 bg-travel-gray200 animate-pulse rounded-full" />
          ))}
        </div>
        <div className="h-4 w-16 bg-travel-gray200 animate-pulse rounded" />
      </div>

      {/* 하단 리뷰요소 */}
      <div className="flex justify-between items-center">
        <div className="flex gap-4">
          <div className="h-4 w-8 bg-travel-gray200 animate-pulse rounded" />
          <div className="h-4 w-8 bg-travel-gray200 animate-pulse rounded" />
          <div className="h-4 w-8 bg-travel-gray200 animate-pulse rounded" />
        </div>
        <div className="h-4 w-6 bg-travel-gray200 animate-pulse rounded" />
      </div>
    </div>
  );
}

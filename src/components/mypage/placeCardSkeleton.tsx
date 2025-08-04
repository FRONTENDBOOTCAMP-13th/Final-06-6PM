export default function PlaceCardSkeleton() {
  return (
    <div className="w-full bg-white rounded-2xl shadow-[0_0_6px_rgba(0,0,0,0.3)] py-4 px-3 grid grid-cols-[auto_1fr_auto] items-center gap-2 animate-pulse">
      {/* 이미지 영역 */}
      <div className="w-[70px] h-[70px] rounded-2xl bg-travel-gray200" />

      {/* 텍스트 + 별점 영역 */}
      <div className="max-w-[240px] xs:max-w-[270px] space-y-2">
        {/* 제목 + 태그 */}
        <div className="flex items-center justify-between gap-2">
          <div className="w-[140px] h-4 bg-travel-gray200 rounded" />
          <div className="w-[40px] h-5 bg-travel-gray200 rounded" />
        </div>

        {/* 설명 */}
        <div className="w-[180px] h-3 bg-travel-gray200 rounded" />

        {/* 별점 */}
        {/* <div className="flex items-center gap-1">
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="w-4 h-4 bg-travel-gray200 rounded" />
            ))}
          </div>
          <div className="w-[60px] h-3 bg-travel-gray200 rounded" />
        </div> */}
      </div>

      {/* 우측 버튼 영역 */}
      <div className="w-5 h-5 bg-travel-gray200 rounded-full" />
    </div>
  );
}

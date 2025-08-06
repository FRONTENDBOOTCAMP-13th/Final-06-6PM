export default function CommentItemSkeleton() {
  return (
    <div className="rounded-lg text-16 animate-pulse">
      <div className="flex items-start gap-3">
        {/* 프로필 이미지 스켈레톤 */}
        <div className="w-[50px] h-[50px] rounded-full bg-travel-gray200 animate-pulse flex-shrink-0" />

        <div className="flex-1 min-w-0 space-y-2">
          {/* 작성자명 + 액션버튼 자리 */}
          <div className="flex items-center justify-between">
            <div className="w-[100px] h-[16px] bg-travel-gray200 animate-pulse rounded" />
            <div className="w-[60px] h-[16px] bg-travel-gray200 animate-pulse rounded" />
          </div>

          {/* 날짜 */}
          <div className="w-[80px] h-[14px] bg-travel-gray200 animate-pulse rounded" />

          {/* 댓글 내용 */}
          <div className="space-y-1">
            <div className="w-full h-[14px] bg-travel-gray200 animate-pulse rounded" />
            <div className="w-[90%] h-[14px] bg-travel-gray200 animate-pulse rounded" />
            <div className="w-[60%] h-[14px] bg-travel-gray200 animate-pulse rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}

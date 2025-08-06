"use client";

import DrawerBtn from "@/components/feature/drawerBtn";
import ModalItem from "@/components/feature/locationModal";
import ToggleIcon from "@/components/feature/toggleComponents";
import { Eye, Heart, MessageCircleMore, Star } from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { GetReviewDetailProps, ReviewLocation } from "@/types/review";
import useUserStore from "@/zustand/userStore";
import { useState } from "react";
import ShareBtn from "@/components/feature/shareBtn";

export type ViewItemProps = GetReviewDetailProps & {
  onClick?: () => void;
  onDelete?: (reviewId: number) => void;
};

export default function ViewItem({
  _id,
  type,
  title,
  content,
  user,
  extra,
  views,
  bookmarks,
  myBookmarkId,
  repliesCount,
  createdAt,
  onClick,
  onDelete,
}: ViewItemProps) {
  const pathname = usePathname();
  const router = useRouter();

  // 경로가 '/feed' 일때만 스타일 적용 (/feed와 /feed/view 구분을 위함)
  const isDetailView = pathname.startsWith("/feed/");
  const listClass = `relative w-full space-y-2 ${
    isDetailView ? "" : "rounded-xl bg-white shadow-md border border-travel-gray100/50 p-4"
  }`;
  const listTextClass = `text-14 text-travel-text100 ${isDetailView ? "" : "line-clamp-3"}`;

  const [bookmarkCount, setBookmarkCount] = useState(bookmarks || 0);
  // 수정/삭제버튼 show-hidden 여부
  const loginUserInfo = useUserStore((state) => state.userInfo);
  // console.log(loginUserInfo);
  // console.log(user)
  const sameUser = loginUserInfo?._id === user._id;

  // 사용자 정보
  const userName = user.name;
  const userImgURL = user.image;
  // console.log(user.image);

  // 글 타입
  const reviewType = type;

  // 별점 및 태그
  const starRate = extra.starRate ?? 0;
  const tags = extra.tags ?? [];

  // 이미지 관련
  const contentImg = extra.images ?? [];
  const maxImg = 2;
  const showImg = isDetailView ? contentImg : contentImg.slice(0, maxImg);
  const moreCount = isDetailView ? 0 : contentImg.length - maxImg;

  // 방문 장소
  const locationList: ReviewLocation[] = Array.isArray(extra.location)
    ? extra.location
    : extra.location
    ? [extra.location]
    : [];
  // console.log(locationList);

  // 방문 지역
  const place = extra.place;

  // 리뷰 타입에 따른 방문일자 처리
  const visitDate = type === "reviewAll" ? `${extra.startDate} ~ ${extra.endDate}` : `${extra.visitDate}`;

  // 작성일자
  const regdate = createdAt;

  // 상세페이지로 이동하는 함수
  const handleItemClick = () => {
    if (!isDetailView) {
      router.push(`/feed/${_id}`);
    }
  };
  // 토글아이콘이랑 연결
  const handleBookmarkChange = (newBookmarkState: boolean) => {
    setBookmarkCount((prev) => {
      // 북마크 추가되면 하트가 +1 제거되면 -1
      const newCount = newBookmarkState ? prev + 1 : prev - 1;
      return newCount;
    });
  };

  return (
    <div
      className={`${listClass} ${
        !isDetailView ? "cursor-pointer hover:border-travel-gray200/60 hover:shadow-lg transition-shadow" : ""
      }`}
      onClick={handleItemClick}
    >
      <div className="flex items-center justify-between">
        {/* 사용자이미지/타이틀/닉네임 */}
        <div className="flex items-center gap-3">
          <Image
            width={40}
            height={40}
            src={userImgURL || "/images/user-default.webp"}
            alt={userName}
            className="w-10 h-10 rounded-full bg-travel-gray300"
          />
          <div className="text-travel-text100">
            <p className="font-medium line-clamp-1">{title}</p>
            <p className="text-14 text-travel-gray700">{userName}</p>
          </div>
        </div>

        {/* 수정/삭제 모달창 버튼*/}
        {sameUser && (
          <div onClick={(e) => e.stopPropagation()}>
            <DrawerBtn reviewId={_id} reviewType={reviewType} onDelete={onDelete} />
          </div>
        )}
      </div>

      {/* 방문일자 */}
      <div className="grid grid-cols-[3.4375rem_auto] items-center gap-2 text-14">
        <p>방문일자</p>
        <p className="text-travel-gray700">{visitDate}</p>
      </div>

      {/* 방문장소 */}
      <div className="grid grid-cols-[3.4375rem_auto] gap-2 text-14">
        <p>방문장소</p>
        <div className="flex flex-wrap gap-1" onClick={(e) => e.stopPropagation()}>
          {type === "reviewAll" ? (
            <span className="text-travel-gray700">{place}</span>
          ) : (
            locationList.map((location, idx) => <ModalItem key={`${idx}-${location.contentId}`} location={location} />)
          )}
        </div>
      </div>

      {/* 리뷰사진 및 내용 */}
      <div className="space-y-2 text-14">
        {isDetailView ? (
          // 게시물 상세페이지일 때 보이는 이미지
          <Swiper
            pagination={true}
            modules={[Pagination]}
            className="overflow-hidden rounded-lg custom-swiper-pagination"
          >
            {showImg.map((img, idx) => (
              <SwiperSlide key={idx}>
                <div className="aspect-square bg-travel-gray200">
                  <Image
                    width={400}
                    height={400}
                    src={img}
                    alt={`Review image ${idx + 1}`}
                    className="object-cover w-full h-full"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          // 리스트페이지 일 때 보이는 이미지
          <div className={`grid gap-3 ${showImg?.length === 1 ? "grid-cols-1" : "grid-cols-2"}`}>
            {showImg.map((img, idx) => {
              const overlay = idx === 1 && moreCount > 0;

              return (
                <div
                  key={idx}
                  className={`relative rounded-lg bg-travel-gray200 overflow-hidden ${
                    showImg.length === 1 ? "aspect-[3/2]" : "aspect-square"
                  }`}
                >
                  <Image
                    width={400}
                    height={300}
                    src={img}
                    alt={`Review image ${idx + 1}`}
                    className="object-cover w-full h-full"
                  />
                  {!isDetailView && overlay && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                      <span className="font-bold text-white text-20">+{moreCount}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
        <div className={listTextClass}>{content}</div>

        {/* 태그 */}
        <div className="flex flex-wrap gap-1">
          {tags.map((tag) => (
            <span key={tag} className="text-travel-info100">
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* 별점 및 방문날짜 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              fill="currentColor"
              stroke="currentColor"
              className={`size-4 ${i < Math.floor(starRate) ? "text-travel-warn100" : "text-travel-gray400"}`}
            />
          ))}
        </div>
        <span className="text-gray-600 text-14">{regdate}</span>
      </div>

      {/* 리뷰관련요소 */}
      <div className="flex items-center justify-between text-travel-gray600 text-14">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <Eye className="w-4 h-4" />
            {views}
          </span>
          <span className="flex items-center gap-1">
            <Heart className="w-4 h-4" />
            {bookmarkCount}
          </span>
          <span className="flex items-center gap-1">
            <MessageCircleMore className="w-4 h-4" />
            {repliesCount}
          </span>
        </div>

        <div onClick={(e) => e.stopPropagation()}>
          <ToggleIcon onBookmarkChange={handleBookmarkChange} reviewId={_id} myBookmarkId={myBookmarkId} />
        </div>
      </div>
    </div>
  );
}

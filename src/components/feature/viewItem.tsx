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
import { GetReviewDetailProps } from "@/types/review";

const API_URL = process.env.NEXT_PUBLIC_API_SERVER;

export type ViewItemProps = GetReviewDetailProps & {
  onClick?: () => void; // 필요 시 추가
};

export default function ViewItem({
  _id,
  title,
  user,
  content,
  extra,
  views,
  bookmarks,
  repliesCount,
  createdAt,
  onClick,
}: ViewItemProps) {
  const pathname = usePathname();
  const router = useRouter();

  const userName = user.name;
  const userImgURL = user?.image?.startsWith("http") ? user.image : `${API_URL}/${user?.image}`;

  console.log(user.image);

  const starRate = extra.starRate ?? 0;
  const tags = extra.tags ?? [];
  const contentImg = extra.images ?? [];
  const locationList = Array.isArray(extra.location) ? extra.location : [extra.location ?? ""];
  const visitDate = extra.startDate ?? "";
  const regdate = createdAt;

  // 경로가 '/feed' 일때만 스타일 적용 (/feed와 /feed/view 구분을 위함)
  const isDetailView = pathname.startsWith("/feed/");
  const listClass = `relative w-full space-y-2 ${isDetailView ? "" : "rounded-xl bg-white shadow p-4"}`;
  const listTextClass = `text-14 text-travel-text100 ${isDetailView ? "" : "line-clamp-3"}`;

  // 이미지 갯수 제한
  const maxImg = 2;
  const showImg = isDetailView ? contentImg : contentImg.slice(0, maxImg);
  const moreCount = isDetailView ? 0 : contentImg.length - maxImg;

  // 이미지 URL설정 필요
  const getImageURL = (imgPath: string) => {
    if (!imgPath) return "/images/user4.png";
    return imgPath.startsWith("http") ? imgPath : `${API_URL}/${imgPath}`;
  };

  return (
    <div className={listClass}>
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
        <DrawerBtn />
      </div>

      {/* 방문일자 */}
      <div className="grid grid-cols-[55px_auto] items-center gap-2 text-14">
        <p>방문일자</p>
        <p className="text-travel-gray700">{visitDate}</p>
      </div>

      {/* 방문장소 */}
      <div className="grid grid-cols-[55px_auto] gap-2 text-14">
        <p>방문장소</p>
        <div className="flex flex-wrap gap-1">
          {locationList.map((location, idx) => (
            <ModalItem key={idx} location={location} />
          ))}
        </div>
      </div>

      {/* 리뷰사진 및 내용 */}
      <div className="space-y-2 text-14">
        {isDetailView ? (
          // 게시물 상세페이지일 때 보이는 이미지
          <Swiper pagination={true} modules={[Pagination]} className="rounded-lg overflow-hidden">
            {showImg.map((img, idx) => (
              <SwiperSlide key={idx}>
                <div className="aspect-[3/2] bg-travel-gray200">
                  <Image
                    width={600}
                    height={400}
                    src={getImageURL(img)}
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
                    src={getImageURL(img)}
                    alt={`Review image ${idx + 1}`}
                    className="object-cover w-full h-full"
                  />
                  {!isDetailView && overlay && (
                    <div
                      className="absolute inset-0 bg-black/60 flex items-center justify-center cursor-pointer"
                      onClick={() => router.push(`/feed/${_id}`)}
                    >
                      <span className="text-white font-bold text-20">+{moreCount}</span>
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
            {bookmarks}
          </span>
          <span className="flex items-center gap-1">
            <MessageCircleMore className="w-4 h-4" />
            {repliesCount}
          </span>
        </div>

        <ToggleIcon type="book" />
      </div>
    </div>
  );
}

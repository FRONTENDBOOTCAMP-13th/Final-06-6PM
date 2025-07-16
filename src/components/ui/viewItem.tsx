"use client";

import {
  MapPin,
  Eye,
  Heart,
  MessageCircleMore,
  Bookmark,
  EllipsisVertical,
  Star,
} from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";

export type ViewItemProps = {
  userName: string;
  userImgURL?: string;
  location: string;
  content: string;
  tags: string[];
  views: number;
  likes: number;
  comments: number;
  date: string;
  onClick?: () => void;
};

export default function ViewItem({
  userName,
  userImgURL = "/gwak.png",
  location,
  content,
  tags,
  views,
  likes,
  comments,
  date,
  onClick,
}: ViewItemProps) {
  const [isBookmarkToggled, setIsBookmarkToggled] = useState(false);

  // 모달
  const openModal = () => {
    if (typeof onClick === "function") {
      onClick();
    }
  };

  // 드로워
  const slideDrawer = () => {
    console.log("드로워");
  };

  // 북마크 클릭 토글
  const handleBookmarkClick = () => {
    setIsBookmarkToggled(!isBookmarkToggled);
  };

  // 경로가 '/feed' 일때만 스타일 적용 (/feed와 /feed/view 구분을 위함)
  const pathname = usePathname();
  const isList = pathname !== "/feed";
  const listClass = `relative w-full space-y-3 ${
    isList ? "rounded-xl bg-white shadow p-4" : ""
  }`;

  const listTextClass = `text-14 text-travel-text100 ${
    isList ? "line-clamp-3" : ""
  }`;

  return (
    <div className={listClass}>
      <div className="flex items-center justify-between">
        {/* 사용자이미지/이름/방문장소 */}
        <div className="flex items-center gap-3">
          <Image
            width={40}
            height={40}
            src={userImgURL}
            alt={userName}
            className="w-10 h-10 rounded-full bg-travel-gray300"
          />
          <div>
            <p className="font-medium text-16 text-travel-text100">
              {userName}
            </p>
            <button
              className="flex items-center text-12 text-travel-info100 cursor-pointer"
              onClick={openModal}
            >
              <MapPin className="w-4 h-4 mr-1" />
              {location}
            </button>
          </div>
        </div>

        {/* 수정/삭제 모달창 버튼*/}
        <button onClick={() => slideDrawer()} className="cursor-pointer">
          <EllipsisVertical className="w-6 h-6 text-travel-gray400" />
        </button>
      </div>

      {/* 별점 및 방문날짜 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className="w-4 h-4 text-travel-warn100"
              fill="currentColor"
            />
          ))}
        </div>
        <span className="text-12 text-gray-600">{date}</span>
      </div>

      {/* 리뷰내용 */}
      <div className="space-y-2">
        <div className="grid grid-cols-2 gap-3">
          <Image
            width={200}
            height={200}
            src="/"
            alt="이미지"
            className=" bg-travel-gray200 rounded-lg object-cover aspect-square"
          />
          <Image
            width={200}
            height={200}
            src="/gwak.png"
            alt=""
            className=" bg-travel-gray200 rounded-lg object-cover aspect-square"
          />
        </div>
        <div className={listTextClass}>{content}</div>
        <div className="flex flex-wrap gap-1">
          {tags.map((tag) => (
            <span key={tag} className="text-12 text-travel-info100">
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* 리뷰관련요소 */}
      <div className="flex justify-between items-center text-travel-gray600 text-12">
        <div className="flex gap-4 items-center">
          <span className="flex items-center gap-1">
            <Eye className="w-4 h-4" />
            {views}
          </span>
          <span className="flex items-center gap-1">
            <Heart className="w-4 h-4" />
            {likes}
          </span>
          <span className="flex items-center gap-1">
            <MessageCircleMore className="w-4 h-4" />
            {comments}
          </span>
        </div>
        <button onClick={handleBookmarkClick}>
          <Bookmark
            className={`w-7 h-7 ${
              isBookmarkToggled
                ? "text-amber-300 fill-current"
                : "text-travel-gray400 fill-current"
            }`}
          />
        </button>
      </div>
    </div>
  );
}

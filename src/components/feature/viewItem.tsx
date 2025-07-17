"use client";

import DrawerBtn from "@/components/feature/drawerBtn";
import ModalItem from "@/components/feature/locationModal";
import ToggleIcon from "@/components/feature/toggleComponents";
import { Eye, Heart, MessageCircleMore, Star } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";

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
  // 경로가 '/feed' 일때만 스타일 적용 (/feed와 /feed/view 구분을 위함)
  const pathname = usePathname();
  const SubPageClass = pathname.startsWith("/feed/");
  const listClass = `relative w-full space-y-3 ${
    SubPageClass ? "" : "rounded-xl bg-white shadow p-4"
  }`;

  const listTextClass = `text-14 text-travel-text100 ${
    SubPageClass ? "" : "line-clamp-3"
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
            <ModalItem location={location} />
          </div>
        </div>

        {/* 수정/삭제 모달창 버튼*/}
        <DrawerBtn />
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
        <span className="text-gray-600 text-14">{date}</span>
      </div>

      {/* 리뷰내용 */}
      <div className="space-y-2 text-14">
        <div className="grid grid-cols-2 gap-3">
          <Image
            width={200}
            height={200}
            src="/"
            alt="이미지"
            className="object-cover rounded-lg bg-travel-gray200 aspect-square"
          />
          <Image
            width={200}
            height={200}
            src="/gwak.png"
            alt=""
            className="object-cover rounded-lg bg-travel-gray200 aspect-square"
          />
        </div>
        <div className={listTextClass}>{content}</div>
        <div className="flex flex-wrap gap-1">
          {tags.map((tag) => (
            <span key={tag} className="text-travel-info100">
              #{tag}
            </span>
          ))}
        </div>
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
            {likes}
          </span>
          <span className="flex items-center gap-1">
            <MessageCircleMore className="w-4 h-4" />
            {comments}
          </span>
        </div>

        <ToggleIcon type="book" />
      </div>
    </div>
  );
}

"use client";

import DrawerBtn from "@/components/feature/drawerBtn";
import ModalItem from "@/components/feature/locationModal";
import ToggleIcon from "@/components/feature/toggleComponents";
import { Eye, Heart, MessageCircleMore, Star } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";

export type ViewItemProps = {
  title?: string;
  userName: string;
  userImgURL?: string;
  location: string;
  content: string;
  contentImg?:string[];
  tags: string[];
  views: number;
  likes: number;
  comments: number;
  visitDate?: string;
  regdate?: string;
  onClick?: () => void;
};

export default function ViewItem({
  title = '제주도 1박 2일 여행 - 힐링코스, 액티비티코스 다 준비했어요!',
  userName,
  userImgURL = "/gwak.png",
  location,
  content,
  contentImg,
  tags,
  views,
  likes,
  comments,
  visitDate = '2025.03.01.',
  regdate = '2025.04.05. 11:00:00',
}: ViewItemProps) {
  // 경로가 '/feed' 일때만 스타일 적용 (/feed와 /feed/view 구분을 위함)
  const pathname = usePathname();
  const SubPageClass = pathname.startsWith("/feed/");
  const listClass = `relative w-full space-y-2 ${
    SubPageClass ? "" : "rounded-xl bg-white shadow p-4"
  }`;

  const listTextClass = `text-14 text-travel-text100 ${
    SubPageClass ? "" : "line-clamp-3"
  }`;

  return (
    <div className={listClass}>
      <div className="flex items-center justify-between">
        {/* 사용자이미지/타이틀/닉네임 */}
        <div className="flex items-center gap-3">
          <Image
            width={40}
            height={40}
            src={userImgURL}
            alt={userName}
            className="w-10 h-10 rounded-full bg-travel-gray300"
          />
          <div className="text-travel-text100">
            <p className="font-medium line-clamp-1">{title}</p>
            <p className="text-14 text-travel-gray700">
              {userName}
            </p>
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
          <ModalItem location={location} />
          <ModalItem location={location} />
          <ModalItem location={location} />
          <ModalItem location={location} />
          <ModalItem location={location} />
          <ModalItem location={location} />
          <ModalItem location={location} />
        </div>
      </div>

      {/* 리뷰내용 */}
      <div className="space-y-2 text-14">
        <div
          className={`grid gap-3 ${
            contentImg?.length === 1
              ? "grid-cols-1": "grid-cols-2"
          }`}
        >
          {contentImg?.map((img, idx) => (
            <div
              key={idx}
              className={`rounded-lg bg-travel-gray200 overflow-hidden ${
                contentImg.length === 1
                  ? "aspect-[3/2]" 
                  : "aspect-square"
              }`}
            >
              <Image
                width={400}
                height={300}
                src={img}
                alt={img}
                className="object-cover w-full h-full"
              />
            </div>
          ))}
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


      {/* 별점 및 방문날짜 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className="size-4 text-travel-warn100"
              fill="currentColor"
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

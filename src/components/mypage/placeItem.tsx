"use client";

import TagItem from "@/components/feature/tagItem";
import BookmarkModal from "@/components/feature/bookmarkModal";
import { bookmarkDeleteUser } from "@/data/actions/bookmark";
import { BookmarkPlace } from "@/types/bookmark";
import useUserStore from "@/zustand/userStore";
import { X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { categories } from "@/lib/data/categoryList";

export default function PlaceItem({
  title = "지역명",
  contentId = "",
  contentType = "",
  location = "주소",
  imgUrl = "/images/user2.png",
  desc = "",
}: BookmarkPlace) {
  const router = useRouter();
  const userInfo = useUserStore((state) => state.userInfo);
  const setUserInfo = useUserStore((state) => state.setUserInfo);
  const userToken = useUserStore((state) => state.token);
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);

  // 모달 상태 관리 추가
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [state, formAction] = useActionState(bookmarkDeleteUser, null);

  // 로그인 체크
  useEffect(() => {
    if (!isLoggedIn || !userInfo?._id) {
      router.replace("/login");
      return;
    }
  }, [isLoggedIn, userInfo?._id]);

  // API 응답 처리
  useEffect(() => {
    if (state?.ok) {
      // API 응답에서 받은 사용자 정보로 스토어 업데이트
      const updatedUserInfo = {
        ...userInfo, // 기존 정보 유지
        ...state.item, // 업데이트된 정보로 덮어쓰기
      };
      setUserInfo(updatedUserInfo);
      toast.success("북마크가 성공적으로 삭제되었습니다.");
    } else if (state?.ok === 0 && !state?.errors) {
      toast.error(state?.message);
    }
  }, [state]);

  // 모달 열기
  const handleCardClick = () => {
    setIsModalOpen(true);
  };

  // 모달 닫기
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  // 북마크 삭제 클릭
  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  // 카테고리 타입 매핑
  const getCategory = (contentType: string) => {
    return categories.find((item) => item.id === contentType)?.name || "기타";
  };

  const placeData: BookmarkPlace = {
    title,
    contentId,
    contentType,
    location,
    imgUrl,
    desc,
  };

  return (
    <>
      <form action={formAction}>
        {/* hidden input으로 필요한 데이터 전달 */}
        <input type="hidden" name="userId" value={userInfo?._id || ""} />
        <input type="hidden" name="userToken" value={userToken || ""} />
        <input type="hidden" name="placeContentId" value={contentId} />

        <div
          className="w-full bg-white rounded-2xl shadow-md border border-travel-gray100/70 hover:border-travel-gray200/80 py-4 px-3 grid grid-cols-[auto_1fr_auto] items-center gap-2 cursor-pointer hover:shadow-lg transition-shadow"
          data-contentid={contentId}
          data-type={contentType}
          onClick={handleCardClick}
        >
          {/* 이미지 삽입 */}
          <div className="w-14 h-14 xs:w-[70px] xs:h-[70px] rounded-lg xs:rounded-2xl bg-travel-gray200 overflow-hidden aspect-square">
            {imgUrl && <Image width={80} height={80} src={imgUrl} alt={title} className="object-cover w-full h-full" />}
          </div>

          <div className="max-w-[240px] xs:max-w-[270px] text-travel-text100 overflow-hidden">
            <div className="w-full grid grid-cols-[1fr_auto] items-center gap-2">
              <h2 className="font-bold line-clamp-2">{title}</h2>
              <TagItem variant="primary" size="sm">
                {getCategory(contentType)}
              </TagItem>
            </div>

            <p className="mt-1 line-clamp-1 text-travel-gray600 text-14">{location}</p>
          </div>

          {/* 버튼 */}
          <button aria-label="장소 북마크 삭제" type="submit" className="cursor-pointer" onClick={handleDeleteClick}>
            <X className="size-5 text-travel-gray700" />
          </button>
        </div>
      </form>

      {/* 북마크 상세 장소 모달창 */}
      <BookmarkModal place={placeData} isOpen={isModalOpen} onClose={handleModalClose} />
    </>
  );
}

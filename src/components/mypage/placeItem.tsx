"use client";

import TagItem from "@/components/feature/tagItem";
import { bookmarkDeleteUser } from "@/data/actions/bookmark";
import { BookmarkPlace } from "@/types/bookmark";
import useUserStore from "@/zustand/userStore";
import { X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { toast } from "react-toastify";

export default function PlaceItem({
  title = "지역명",
  contentId = "",
  location = "주소",
  imgUrl = "/images/user2.png",
}: BookmarkPlace) {
  const router = useRouter();
  const userInfo = useUserStore((state) => state.userInfo);
  const setUserInfo = useUserStore((state) => state.setUserInfo);
  const userToken = useUserStore((state) => state.token);
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);

  // useActionState로 폼 상태 관리
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

  return (
    <form action={formAction}>
      {/* hidden input으로 필요한 데이터 전달 */}
      <input type="hidden" name="userId" value={userInfo?._id || ""} />
      <input type="hidden" name="userToken" value={userToken || ""} />
      <input type="hidden" name="placeContentId" value={contentId} />

      <div
        className="w-full bg-white rounded-2xl shadow-[0_0_6px_rgba(0,0,0,0.3)] py-4 px-3 grid grid-cols-[auto_1fr_auto] items-center gap-2"
        data-contentid={contentId}
      >
        {/* 이미지 삽입 */}
        <div className="w-[70px] h-[70px] rounded-2xl bg-travel-gray200 overflow-hidden aspect-square">
          {imgUrl && <Image width={100} height={100} src={imgUrl} alt={title} className="object-cover w-full h-full" />}
        </div>

        <div className="max-w-[240px] xs:max-w-[270px] text-travel-text100 overflow-hidden">
          <div className="w-full grid grid-cols-[1fr_auto] items-center gap-2">
            <h2 className="font-bold line-clamp-2">{title}</h2>
            <TagItem variant="primary" size="sm">
              관광지
            </TagItem>
          </div>

          <p className="mt-1 line-clamp-1 text-travel-gray600 text-14">{location}</p>
        </div>

        {/* 버튼 */}
        <button aria-label="장소 북마크 삭제" type="submit" className="cursor-pointer">
          <X className="size-5 text-travel-gray700" />
        </button>
      </div>
    </form>
  );
}

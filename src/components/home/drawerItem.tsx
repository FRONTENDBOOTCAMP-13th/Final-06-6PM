"use client";

import { useActionState, useEffect, useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle, TransitionChild } from "@headlessui/react";
import { ChevronDown, MapPin } from "lucide-react";
import Image from "next/image";
import Button from "@/components/ui/btn";
import { updateUser } from "@/data/actions/user";
import useUserStore from "@/zustand/userStore";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { bookmarkUser } from "@/data/actions/bookmark";

interface DrawerItemProps {
  contentId: string;
  title: string;
  location: string;
  imgUrl?: string;
  desc?: string;
}

export default function DrawerItem({
  contentId = "",
  title = "관광지",
  location = "주소",
  imgUrl,
  desc = "설명",
}: DrawerItemProps) {
  const [open, setOpen] = useState(false);

  const router = useRouter();
  const userInfo = useUserStore((state) => state.userInfo);
  const setUserInfo = useUserStore((state) => state.setUserInfo);
  const userToken = useUserStore((state) => state.token);
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);

  // useActionState로 폼 상태 관리
  const [state, formAction, isPending] = useActionState(bookmarkUser, null);

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
      toast.success("북마크가 성공적으로 저장되었습니다.");
    } else if (state?.ok === 0 && !state?.errors) {
      toast.error(state?.message);
    }
  }, [state]);

  // useInfo 내 contentID 가 있는지 확인
  const isBookmark = userInfo?.extra?.bookmarkPlace?.some((place) => place?.contentId === contentId);

  return (
    <div>
      <Button size="md" variant="outline" onClick={() => setOpen(true)}>
        더 알아보기
      </Button>

      <Dialog open={open} onClose={setOpen} className="relative z-30">
        <DialogBackdrop
          transition
          className="fixed inset-0 transition-opacity duration-500 ease-in-out bg-black/80 data-closed:opacity-0"
        />

        <DialogPanel
          transition
          className="fixed left-1/2 -translate-x-1/2 bottom-0 w-full max-w-[430px] mx-auto bg-white rounded-t-2xl shadow-xl p-6 transition duration-500 ease-in-out pointer-events-auto data-closed:translate-y-full"
        >
          {/* 닫기 버튼 */}
          <TransitionChild>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="아래로 내리기"
              className="flex justify-center w-full cursor-pointer"
            >
              <ChevronDown aria-hidden="true" className="size-7 text-travel-text200" />
            </button>
          </TransitionChild>

          <div className="space-y-3 text-travel-text100">
            <div>
              {/* 타이틀 */}
              <DialogTitle className="font-bold text-24 ">{title}</DialogTitle>
              {/* 장소 */}
              <p className="flex items-center gap-1 text-travel-gray600">
                <MapPin className="size-4" />
                <span className="text-14">{location}</span>
              </p>
            </div>
            {/* 이미지 */}
            {imgUrl && (
              <Image
                src={imgUrl}
                alt={title}
                width={360}
                height={180}
                className="w-full h-[180px] object-cover rounded-lg bg-travel-gray200"
              />
            )}
            {/* 설명 */}
            <p className="text-14 custom-scroll  max-h-[200px]">{desc}</p>
          </div>

          {/* 버튼 */}
          <form action={formAction}>
            <input type="hidden" name="userId" value={userInfo?._id} />
            <input type="hidden" name="userToken" value={userToken || ""} />
            <input type="hidden" name="placeTitle" value={title || ""} />
            <input type="hidden" name="placeContentId" value={contentId || ""} />
            <input type="hidden" name="placeDesc" value={desc || ""} />
            <input type="hidden" name="placeImgUrl" value={imgUrl || ""} />
            <input type="hidden" name="placeLocation" value={location || ""} />

            <Button
              size="lg"
              variant={isBookmark ? "disable" : "primary"}
              type="submit"
              className="w-full mt-5"
              disabled={isBookmark}
            >
              {isBookmark ? "저장된 북마크" : "북마크 저장하기"}
            </Button>
          </form>
        </DialogPanel>
      </Dialog>
    </div>
  );
}

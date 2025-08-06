"use client";

import Button from "@/components/ui/btn";
import { bookmarkUser } from "@/data/actions/bookmark";
import { getContentData } from "@/data/functions/travel";
import { ReviewLocation } from "@/types/review";
import { KeywordTravelProps } from "@/types/travel";
import useUserStore from "@/zustand/userStore";
import { MapPin, X } from "lucide-react";
import Image from "next/image";
import { useActionState, useEffect, useState } from "react";
import { toast } from "react-toastify";
interface ModalItemProps {
  location: ReviewLocation;
}

export default function ModalItem({ location }: ModalItemProps) {
  const locationContentId = location.contentId;
  const [modalData, setModalData] = useState<KeywordTravelProps>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [modalOpen, setModalOpen] = useState(false);

  const userInfo = useUserStore((state) => state.userInfo);
  const setUserInfo = useUserStore((state) => state.setUserInfo);
  const userToken = useUserStore((state) => state.token);
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);

  // useActionState로 폼 상태 관리
  const [state, formAction] = useActionState(bookmarkUser, null);

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
  const isBookmark = userInfo?.extra?.bookmarkPlace?.some((place) => place?.contentId === location.contentId);

  const openModal = () => {
    setModalOpen(true);
  };

  const onClose = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = "hidden";

      const fetchContentData = async () => {
        try {
          const res = await getContentData(locationContentId as string);
          const data = res.body.items.item;
          // console.log(data[0]);
          setModalData(data[0]);
        } catch (error) {
          console.error("데이터 로딩 실패:", error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchContentData();
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [modalOpen, locationContentId]);

  return (
    <>
      <button
        className="flex items-center gap-1 cursor-pointer text-14 text-travel-info100 hover:text-travel-primary100 hover:underline"
        onClick={() => openModal()}
      >
        <MapPin className="size-4" />
        <span className="line-clamp-1 text-start">{location.title}</span>
      </button>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70">
          <div className="relative w-full p-6 bg-white shadow-lg rounded-2xl max-w-100">
            {/* 닫기 버튼 */}
            <button className="absolute cursor-pointer right-4 top-4" onClick={onClose}>
              <X className="w-6 h-6 text-travel-gray600" />
            </button>

            <div className="flex flex-col gap-4">
              {/* 제목 & 주소 */}
              <div>
                {isLoading ? (
                  <>
                    <div className="w-3/4 h-6 mb-2 rounded-md bg-travel-gray200 animate-pulse" />
                    <div className="flex items-center gap-1">
                      <div className="w-4 h-4 rounded-full bg-travel-gray200 animate-pulse" />
                      <div className="w-1/2 h-4 rounded-md bg-travel-gray200 animate-pulse" />
                    </div>
                  </>
                ) : (
                  <>
                    <h2 className="text-24 font-bold text-travel-text200 mb-1.5">{modalData?.title}</h2>
                    <div className="flex items-center text-travel-gray600">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span className="text-14">{modalData?.addr1}</span>
                    </div>
                  </>
                )}
              </div>

              {/* 이미지 */}
              {isLoading ? (
                <div className="w-full h-[190px] bg-travel-gray200 rounded-lg animate-pulse" />
              ) : (
                modalData?.firstimage && (
                  <Image
                    width={200}
                    height={190}
                    src={modalData?.firstimage}
                    alt={modalData?.title}
                    className="max-h-[190px] aspect-[5/3] w-full object-cover rounded-lg overflow-hidden bg-travel-gray200"
                  />
                )
              )}

              {/* 설명 */}
              {isLoading ? (
                <div className="flex flex-col gap-2">
                  <div className="w-full h-4 rounded bg-travel-gray200 animate-pulse" />
                  <div className="h-4 w-[90%] bg-travel-gray200 rounded animate-pulse" />
                  <div className="h-4 w-[85%] bg-travel-gray200 rounded animate-pulse" />
                </div>
              ) : (
                <p className="custom-scroll text-14 text-travel-text100 max-h-[210px]">{modalData?.overview}</p>
              )}
            </div>

            {/* 버튼 */}

            <form action={formAction} className="w-full">
              <input type="hidden" name="userId" value={userInfo?._id} />
              <input type="hidden" name="userToken" value={userToken || ""} />
              <input type="hidden" name="placeTitle" value={modalData?.title || ""} />
              <input type="hidden" name="placeContentId" value={modalData?.contentid || ""} />
              <input type="hidden" name="placeContentTypeId" value={modalData?.contenttypeid || ""} />
              <input type="hidden" name="placeDesc" value={modalData?.overview || ""} />
              <input type="hidden" name="placeImgUrl" value={modalData?.firstimage || ""} />
              <input type="hidden" name="placeLocation" value={modalData?.addr1 || ""} />

              {isLoggedIn ? (
                <Button
                  size="lg"
                  variant={isBookmark ? "disable" : "primary"}
                  type="submit"
                  className="w-full mt-5"
                  disabled={isBookmark}
                >
                  {isBookmark ? "저장된 북마크" : "북마크 저장하기"}
                </Button>
              ) : (
                <Button size="lg" variant="disable" type="submit" disabled className="w-full mt-5">
                  북마크 기능은 로그인 후 이용 가능합니다.
                </Button>
              )}
            </form>
          </div>
        </div>
      )}
    </>
  );
}

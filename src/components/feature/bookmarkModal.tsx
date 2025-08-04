"use client";

import { getContentData } from "@/data/functions/travel";
import { BookmarkPlace } from "@/types/bookmark";
import { KeywordTravelProps } from "@/types/travel";
import { MapPin, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface BookmarkModalProps {
  place: BookmarkPlace;
  isOpen: boolean;
  onClose: () => void;
}

export default function BookmarkModal({ place, isOpen, onClose }: BookmarkModalProps) {
  const [modalData, setModalData] = useState<KeywordTravelProps>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // 모달 열릴 때 스크롤 제어
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setIsLoading(true);

      const fetchContentData = async () => {
        try {
          const res = await getContentData(place.contentId);
          const data = res.body.items.item;
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
  }, [isOpen, place]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70">
      <div className="relative w-full p-6 bg-white shadow-lg rounded-2xl max-w-100">
        {/* 닫기 버튼 */}
        <button className="absolute cursor-pointer right-4 top-4" onClick={onClose} aria-label="모달 닫기">
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
      </div>
    </div>
  );
}

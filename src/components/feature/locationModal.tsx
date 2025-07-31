"use client";

import Button from "@/components/ui/btn";
import { getContentData } from "@/data/functions/travel";
import { ReviewLocation } from "@/types/review";
import { KeywordTravelProps } from "@/types/travel";
import { MapPin, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
interface ModalItemProps {
  location: ReviewLocation;
}

export default function ModalItem({ location }: ModalItemProps) {
  const locationContentId = location.contentId;
  const [modalData, setModalData] = useState<KeywordTravelProps>();
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    console.log("모달창열기");
    setModalOpen(true);
  };

  const onClose = () => {
    console.log("모달창닫기");
    setModalOpen(false);
  };

  const saveBookmark = () => {
    console.log("북마크저장하기");
  };

  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = "hidden";

      const fetchContentData = async () => {
        try {
          const res = await getContentData(locationContentId as string);
          const data = res.body.items.item;
          console.log(data[0]);
          setModalData(data[0]);
        } catch (error) {
          console.error("데이터 로딩 실패:", error);
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

  useEffect(() => {}, []);

  return (
    <>
      <button
        className="flex items-center gap-1 cursor-pointer text-14 text-travel-info100 hover:text-travel-primary100 hover:underline"
        data-contentid={location.contentId}
        onClick={() => openModal()}
      >
        <MapPin className="size-4" />
        {location.title}
      </button>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70">
          <div className="relative w-full p-6 bg-white shadow-lg rounded-2xl max-w-100 min-h-[420px]">
            {/* 화살표 */}
            <button
              className="absolute cursor-pointer right-4 top-4"
              onClick={() => {
                onClose();
              }}
            >
              <X className="w-6 h-6 text-travel-gray600" />
            </button>

            <div className="flex flex-col gap-4">
              {/* 제목 */}
              <div>
                <h2 className="text-24 font-bold text-travel-text200 mb-1.5">{modalData?.title}</h2>
                <div className="flex items-center text-travel-gray600">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span className="text-14">{modalData?.addr1}</span>
                </div>
              </div>

              {/* 이미지 */}
              {modalData?.firstimage && (
                <Image
                  width={200}
                  height={190}
                  src={modalData?.firstimage}
                  alt={modalData?.title}
                  className="max-h-[190px] aspect-[5/3] w-full object-cover rounded-lg overflow-hidden bg-travel-gray200" // 이미지 못불러올시 회색
                />
              )}

              {/* 설명 */}
              <p className="custom-scroll text-14 text-travel-text100 max-h-50">{modalData?.overview}</p>
            </div>

            {/* 버튼 */}
            <Button size="lg" variant="primary" className="w-full mt-7" onClick={() => saveBookmark()}>
              북마크 저장하기
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

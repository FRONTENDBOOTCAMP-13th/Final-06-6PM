"use client";

import Image from "next/image";
import { ContentDataProps } from "@/types/travel";
import { MapPin, X } from "lucide-react";
interface ContentDetailProps {
  contentData?: ContentDataProps;
  isOpen: boolean;
  onClose: () => void;
}

export default function ContentDetail({ contentData, isOpen, onClose }: ContentDetailProps) {
  if (!isOpen || !contentData) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70">
      <div className="relative w-full p-6 bg-white shadow-lg rounded-2xl max-w-100">
        {/* 닫기 버튼 */}
        <button className="absolute cursor-pointer right-4 top-4" onClick={onClose}>
          <X className="w-6 h-6 text-travel-gray600" />
        </button>

        <div className="flex flex-col gap-4">
          {/* 제목 & 주소 */}
          <div>
            <h2 className="text-24 font-bold text-travel-text200 mb-1.5">{contentData.title}</h2>
            <div className="flex items-center text-travel-gray600">
              <MapPin className="w-4 h-4 mr-1" />
              <span className="text-14">{contentData.addr1}</span>
            </div>
          </div>

          {/* 이미지 */}
          {contentData.firstimage && (
            <Image
              width={200}
              height={190}
              src={contentData.firstimage}
              alt={contentData.title}
              className="max-h-[190px] aspect-[5/3] w-full object-cover rounded-lg overflow-hidden bg-travel-gray200"
            />
          )}

          {/* 설명 */}
          <p className="custom-scroll text-14 text-travel-text100 max-h-[210px]">{contentData.overview}</p>
        </div>
      </div>
    </div>
  );
}

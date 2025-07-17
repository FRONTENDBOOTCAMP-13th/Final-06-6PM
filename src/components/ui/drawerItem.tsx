"use client";
import Button from "@/components/ui/Btn";
import { ChevronDown, MapPin } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";

interface LocationDrawerProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  location?: string;
  imageUrl?: string;
  imageAlt?: string;
  description?: string;
}

export default function LocationDrawer({
  open,
  onClose,
  title = "무슨해변",
  location = "제주특별자치도 서귀포시",
  imageUrl = "/gwak.png",
  imageAlt = "무슨해변 - 빨간 등대와 바다 풍경",
  description = "섬 전체가 하나의 거대한 관광자원인 제주도.",
}: LocationDrawerProps) {
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[200] flex flex-col justify-end items-center">
      <div
        className="absolute inset-0 bg-black/80 transition-opacity"
        onClick={onClose}
      />

      <div
        className="
          relative w-full
          max-w-[430px]
          mx-auto
          bg-white
          rounded-t-2xl
          shadow-xl
          p-6 pb-8
          flex flex-col gap-4
          animate-drawer-slideup
        "
      >
        <button
          className="flex justify-center w-full cursor-pointer mb-2"
          onClick={onClose}
          aria-label="아래로 내리기"
        >
          <ChevronDown className="w-6 h-6 text-travel-gray600" />
        </button>

        <div>
          <h2 className="text-24 font-bold text-travel-text200 mb-1.5">
            {title}
          </h2>
          <div className="flex items-center text-travel-gray600 mb-2">
            <MapPin className="w-4 h-4 mr-1" />
            <span className="text-14">{location}</span>
          </div>
          <Image
            src={imageUrl}
            alt={imageAlt}
            width={360}
            height={180}
            className="w-full h-[180px] object-cover rounded-lg bg-travel-gray200"
          />
          <p className="text-14 text-travel-text100 line-clamp-4 mt-3">
            {description}
          </p>
        </div>

        <Button size="lg" variant="primary" className="w-full mt-4">
          북마크 저장하기
        </Button>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  TransitionChild,
} from "@headlessui/react";
import { ChevronDown, MapPin } from "lucide-react";
import Image from "next/image";
import Button from "@/components/ui/btn";

interface DrawerItemProps {
  title: string;
  location: string;
  imgUrl?: string;
  desc?: string;
}

export default function DrawerItem({
  title = "관광지",
  location = "주소",
  imgUrl,
  desc = "설명",
}: DrawerItemProps) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-1 text-white rounded-2xl text-16 bg-travel-primary100"
      >
        DrawerItem
      </button>

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
              <ChevronDown
                aria-hidden="true"
                className="size-7 text-travel-text200"
              />
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
            <p className="text-14 line-clamp-4">{desc}</p>
          </div>

          {/* 버튼 */}
          <Button size="lg" variant="primary" className="w-full mt-5">
            북마크 저장하기
          </Button>
        </DialogPanel>
      </Dialog>
    </div>
  );
}

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

interface DrawerSelectImg {
  title: string;
}

export default function DrawerSelectImg({ title = "지역명" }: DrawerSelectImg) {
  const [imgOpen, setImgOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setImgOpen(true)}
        className="px-4 py-1 text-white rounded-2xl text-16 bg-travel-primary100"
      >
        DrawerSelectImg
      </button>

      <Dialog open={imgOpen} onClose={setImgOpen} className="relative z-30">
        <DialogBackdrop
          transition
          className="fixed inset-0 transition-opacity duration-500 ease-in-out bg-black/70 data-closed:opacity-0"
        />

        <DialogPanel
          transition
          className="fixed left-1/2 -translate-x-1/2 bottom-0 flex flex-col w-full max-w-[430px] gap-4 p-6 transition duration-500 ease-in-out bg-white pointer-events-auto rounded-t-2xl data-closed:translate-y-full"
        >
          {/* 닫기 버튼 */}
          <TransitionChild>
            <button
              type="button"
              onClick={() => setImgOpen(false)}
              aria-label="아래로 내리기"
              className="flex justify-center w-full cursor-pointer"
            >
              <ChevronDown
                aria-hidden="true"
                className="size-7 text-travel-text200"
              />
            </button>
          </TransitionChild>

          {/* 타이틀 */}
          <DialogTitle className="w-full font-medium text-18 text-travel-text100">
            {title}
          </DialogTitle>

          {/* 버튼 */}
          <Button size="lg" variant="primary" className="w-full">
            사진 선택하기
          </Button>
        </DialogPanel>
      </Dialog>
    </div>
  );
}

"use client";

import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  TransitionChild,
} from "@headlessui/react";
import { ChevronDown } from "lucide-react";
import Button from "@/components/ui/btn";

export default function DrawerBtn() {
  const [open, setOpen] = useState(false);

  const modifyPlan = () => {
    console.log("수정");
  };

  const deletePlan = () => {
    console.log("삭제");
  };

  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-1 text-white rounded-2xl text-16 bg-travel-primary100"
      >
        DrawerBtn
      </button>

      <Dialog open={open} onClose={setOpen} className="relative z-30">
        <DialogBackdrop
          transition
          className="fixed inset-0 transition-opacity duration-500 ease-in-out bg-black/80 data-closed:opacity-0"
        />
        <DialogPanel
          transition
          className="fixed left-1/2 -translate-x-1/2 bottom-0 flex flex-col items-center w-full max-w-[430px] rounded-t-2xl bg-white p-6 gap-4 transition duration-500 ease-in-out transform pointer-events-auto data-closed:translate-y-full"
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

          <Button
            size="lg"
            variant="primary"
            className="w-full"
            onClick={() => modifyPlan()}
          >
            게시글 수정하기
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="w-full"
            onClick={() => deletePlan()}
          >
            게시글 삭제하기
          </Button>
        </DialogPanel>
      </Dialog>
    </div>
  );
}

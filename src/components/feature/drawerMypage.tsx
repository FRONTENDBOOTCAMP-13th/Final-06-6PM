"use client";

import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  TransitionChild,
} from "@headlessui/react";
import { ChevronDown, Settings } from "lucide-react";
import Button from "@/components/ui/btn";
import { useRouter } from "next/navigation";
import useUserStore from "@/zustand/userStore";
import { toast } from "react-toastify";

export default function DrawerMypage() {
  const { user, resetUser } = useUserStore();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const userEdit = () => {
    console.log("수정");
    router.replace("/mypage/edit");
  };

  const userLogout = () => {
    resetUser();
    toast.success("로그아웃 되었습니다.");
    router.replace("/home");
  };

  return (
    <>
      <button onClick={() => setOpen(true)} className="absolute top-6 right-5">
        <Settings className="size-6 text-travel-gray70" />
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
            onClick={() => userEdit()}
          >
            회원정보 수정하기
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="w-full"
            onClick={() => userLogout()}
          >
            로그아웃
          </Button>
        </DialogPanel>
      </Dialog>
    </>
  );
}

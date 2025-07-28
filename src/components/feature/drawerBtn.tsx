"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import useUserStore from "@/zustand/userStore";
import { deleteReviewPost } from "@/data/actions/review";
import { ChevronDown, EllipsisVerticalIcon } from "lucide-react";
import { toast } from "react-toastify";
import { Dialog, DialogBackdrop, DialogPanel, TransitionChild } from "@headlessui/react";
import Button from "@/components/ui/btn";

interface DrawerBtnProps {
  reviewId: number;
}

export default function DrawerBtn({ reviewId }: DrawerBtnProps) {
  const [open, setOpen] = useState(false);
  const accessToken = useUserStore((state) => state.token);
  const router = useRouter();
  const pathname = usePathname();

  const modifyPlan = () => {
    console.log("수정");
  };

  const deletePlan = async () => {
    const confirmDelete = window.confirm("정말 삭제하시겠습니까?");
    if (!confirmDelete) return;

    try {
      const formData = new FormData();
      formData.append("token", accessToken!);
      formData.append("reviewId", String(reviewId));

      const result = await deleteReviewPost(null, formData);

      // result가 undefined인 경우 처리
      if (result && result.ok === 1) {
        toast.success("리뷰가 삭제되었습니다.");
        setOpen(false);
        if (pathname.startsWith("/mypage/review")) {
          router.push("/mypage/review");
        } else {
          router.push("/feed");
        }
      } else {
        toast.warn(result?.message || "삭제에 실패했습니다.");
        setOpen(false);
      }
    } catch (error) {
      console.error("삭제 중 오류:", error);
      toast.error("삭제 중 문제가 발생했습니다.");
      setOpen(false);
    }
  };

  return (
    <>
      <button onClick={() => setOpen(true)}>
        <EllipsisVerticalIcon className="cursor-pointer size-6 text-travel-gray400" />
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
              <ChevronDown aria-hidden="true" className="size-7 text-travel-text200" />
            </button>
          </TransitionChild>

          <Button size="lg" variant="primary" className="w-full" onClick={() => modifyPlan()}>
            게시글 수정하기
          </Button>
          <Button size="lg" variant="outline" className="w-full" onClick={() => deletePlan()}>
            게시글 삭제하기
          </Button>
        </DialogPanel>
      </Dialog>
    </>
  );
}

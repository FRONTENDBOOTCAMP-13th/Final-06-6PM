"use client";

import { Share2 } from "lucide-react";
import { toast } from "react-toastify";
export default function ShareBtn() {
  const copyCurrentUrl = async () => {
    try {
      const currentUrl = window.location.href;
      await navigator.clipboard.writeText(currentUrl);
      toast.success("URL이 복사되었습니다.");
    } catch (err) {
      console.error("URL 복사 실패", err);
      toast.error("URL 복사에 실패하였습니다.");
    }
  };
  return (
    <>
      <button onClick={copyCurrentUrl}>
        <Share2 className="cursor-pointer size-5 leading-none text-travel-gray400" />
      </button>
    </>
  );
}

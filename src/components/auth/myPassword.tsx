"use client";
import { toast } from "react-toastify";

export default function MyPassword() {
  const myPassword = () => {
    toast.info("준비중인 기능입니다.");
  };

  return (
    <button onClick={myPassword} className="cursor-pointer hover:text-travel-primary100 transition text-travel-text100">
      비밀번호 찾기
    </button>
  );
}

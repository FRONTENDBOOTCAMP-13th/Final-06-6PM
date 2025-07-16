"use client";

import { X } from "lucide-react";

interface TagItemProps {
  variant?:
    | "info"
    | "warn"
    | "fail"
    | "success"
    | "outline"
    | "fill"
    | "primary";
  children: React.ReactNode;
  className?: string;
  closeIcon?: boolean;
}

export default function TagItem({
  children,
  variant = "primary",
  className = "",
  closeIcon = false,
}: TagItemProps) {
  const btnType = {
    info: "bg-travel-info100 border border-travel-info200 text-white",
    warn: "bg-travel-warn100 border border-travel-warn200 text-white",
    fail: "bg-travel-fail100 border border-travel-fail200 text-white",
    success: "bg-travel-success100 border border-travel-success200 text-white",
    outline: "bg-white color-text border border-travel-gray300",
    fill: "bg-travel-text100 border border-travel-text200 text-white",
    primary: "bg-travel-primary100 border border-travel-primary200 text-white",
  };

  const remove = () => {
    console.log("삭제됩니다.");
  };

  return (
    <div
      className={`${btnType[variant]} ${className} py-1.5 px-3 text-[13px] rounded-2xl cursor-pointer font-sans inline-flex items-center leading-none gap-1.5`}
    >
      {children}
      {closeIcon && <X onClick={remove} className="w-3 h-3" />}
    </div>
  );
}

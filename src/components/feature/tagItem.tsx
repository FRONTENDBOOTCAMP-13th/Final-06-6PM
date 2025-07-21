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
  size?: "sm" | "md";
  children: React.ReactNode;
  className?: string;
  closeIcon?: boolean;
  onRemove?: () => void;
}

export default function TagItem({
  children,
  variant = "primary",
  size = "md",
  className = "",
  closeIcon = false,
  onRemove,
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

  const btnSize = {
    sm: "py-1 px-2 text-12",
    md: "py-1.5 px-3 text-[13px]",
  };

  return (
    <div
      className={`${btnType[variant]}  ${btnSize[size]} ${className}  rounded-2xl cursor-pointer font-sans grid grid-cols-[1fr_auto] items-center leading-none`}
    >
      {children}
      {closeIcon && <X onClick={onRemove} className="size-4 -translate-y-0.25" />}
    </div>
  );
}

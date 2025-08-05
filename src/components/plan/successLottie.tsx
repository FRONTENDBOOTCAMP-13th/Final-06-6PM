"use client";

import Lottie from "lottie-react";
import successAnimation from "@/lottie/Success.json";

interface SuccessLottieProps {
  width?: number;
  height?: number;
  className?: string;
}

export default function SuccessLottie({ width = 70, height = 70, className }: SuccessLottieProps) {
  return (
    <Lottie
      animationData={successAnimation}
      style={{
        width,
        height,
      }}
      loop={false}
      className={className}
    />
  );
}

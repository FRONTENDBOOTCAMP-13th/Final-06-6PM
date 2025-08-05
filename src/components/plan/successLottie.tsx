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
        filter:
          "brightness(0) saturate(100%) invert(30%) sepia(97%) saturate(1352%) hue-rotate(204deg) brightness(95%) contrast(101%)",
      }}
      loop={false}
      className={className}
    />
  );
}

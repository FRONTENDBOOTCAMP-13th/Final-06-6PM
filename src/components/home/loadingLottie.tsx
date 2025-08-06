"use client";

import Lottie from "lottie-react";
import loadingAnimation from "@/lottie/Insider-loading.json";

interface LoadingLottieProps {
  width?: number;
  height?: number;
  className?: string;
}

export default function LoadingLottie({ width = 200, height = 200, className }: LoadingLottieProps) {
  return (
    <Lottie
      animationData={loadingAnimation}
      style={{
        width,
        height,
      }}
      loop={true}
      className={className}
    />
  );
}

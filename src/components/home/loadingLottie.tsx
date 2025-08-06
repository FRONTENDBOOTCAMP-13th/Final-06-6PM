"use client";

import Lottie from "lottie-react";
import loadingAnimation from "@/lottie/loading-Dot.json";

interface LoadingLottieProps {
  width?: number;
  height?: number;
  className?: string;
}

export default function LoadingLottie({ width = 300, height = 100, className }: LoadingLottieProps) {
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

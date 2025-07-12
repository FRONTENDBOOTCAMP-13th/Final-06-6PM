import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true, // strict mode 활성화
  images: {
    domains: [
      "localhost", // 외부 이미지 사용
      "tong.visitkorea.or.kr",
    ],
  },
};

export default nextConfig;

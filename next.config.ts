import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true, // strict mode 활성화
  images: {
    domains: [
      "localhost", // 외부 이미지 사용
      "tong.visitkorea.or.kr",
      "fesp-api.koyeb.app",
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb", // 서버액션에 전달하는 바디 크기(기본은 1MB)
    },
  },
};

export default nextConfig;

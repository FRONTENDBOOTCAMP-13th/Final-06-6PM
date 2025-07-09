import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,             // strict mode 활성화
  swcMinify: true,                   // 빌드 속도 향상
  images: {
    domains: ['localhost'],          // 외부 이미지 사용
  },
};

export default nextConfig;
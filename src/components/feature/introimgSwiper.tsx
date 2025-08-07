"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

export default function IntroimgSwiper() {
  const images = [
    "/images/intro/home-logout.svg",
    "/images/intro/login.svg",
    "/images/intro/home-login.svg",
    "/images/intro/plan.svg",
    "/images/intro/feed.svg",
    "/images/intro/review.svg",
    "/images/intro/review2.svg",
    "/images/intro/map.svg",
    "/images/intro/mypage.svg",
  ];

  return (
    <div className="w-full mx-auto xs:w-[70%] max-w-[300px] xs:max-w-[400px] lg:max-w-none lg:w-full order-1 lg:col-span-2">
      <div className="relative p-2 sm:p-4 aspect-[3/5]">
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper h-full w-full"
        >
          {images.map((imageSrc, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-full">
                <Image fill src={imageSrc} alt={`6PM 여행도감 앱 스크린샷 ${index + 1}`} className="object-contain" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

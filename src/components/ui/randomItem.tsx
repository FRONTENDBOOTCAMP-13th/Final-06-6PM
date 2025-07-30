"use client";

import React, { useEffect, useState } from "react";
import { MapPin } from "lucide-react";
import Image from "next/image";
import DrawerItem from "@/components/feature/drawerItem";
import { getTravelList, getContentData } from "@/data/functions/travel";
import { RandomTravelSpot } from "@/types/travel";
import { destinationList } from "@/lib/data/destinationList";

const randomContentID = "12";

export default function RandomItem() {
  const [travelSpot, setTravelSpot] = useState<RandomTravelSpot | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 랜덤 관광지 선택
  const getRandomTravelSpot = async (): Promise<RandomTravelSpot | null> => {
    const maxAttempts = 5;
    let attempts = 0;

    while (attempts < maxAttempts) {
      try {
        // 랜덤 지역 선택
        const randomDestination = destinationList[Math.floor(Math.random() * destinationList.length)];
        const randomAreaCode = randomDestination.areaCode;

        // 해당 지역 관광지 목록 조회
        const response = await getTravelList(randomAreaCode, randomContentID);

        if (response?.body?.items?.item && response.body.items.item.length > 0) {
          const travelSpots = response.body.items.item;

          // 이미지가 있는 관광지만 필터링
          const spotsWithImages = travelSpots.filter((spot) => spot.firstimage && spot.firstimage.trim() !== "");

          // 이미지가 있는 관광지가 없으면 다른 지역 시도
          if (spotsWithImages.length === 0) {
            attempts++;
            continue;
          }

          // 랜덤 선택
          const randomSpot = spotsWithImages[Math.floor(Math.random() * spotsWithImages.length)];

          // 기본값 설정 및 검증
          if (randomSpot && randomSpot.title && randomSpot.addr1) {
            let overview = "";
            try {
              // 상세 정보 호출
              const detailResponse = await getContentData(String(randomSpot.contentid));
              overview = detailResponse?.body?.items?.item?.[0]?.overview || "";
            } catch (detailError) {
              console.error("상세 정보 조회 실패:", detailError);
            }

            return {
              ...randomSpot,
              overview: overview,
              regionName: randomDestination.name,
            } as RandomTravelSpot;
          }
        }
      } catch (error) {
        console.error(`랜덤 관광지 조회 실패 (시도 ${attempts + 1}):`, error);
      }

      attempts++;
    }

    return null;
  };

  const fetchRandomSpot = async () => {
    try {
      setLoading(true);
      setError(null);

      const randomSpot = await getRandomTravelSpot();

      if (randomSpot) {
        setTravelSpot(randomSpot);
      } else {
        setError("현재 추천할 수 있는 여행지가 없습니다.");
      }
    } catch (err) {
      console.error("랜덤 여행지 조회 실패:", err);
      setError("여행지 정보를 불러올 수 없습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomSpot();
  }, []);

  // 주소 단순화
  const getLocationString = (addr1: string) => {
    const parts = addr1.split(" ");
    if (parts.length >= 2) {
      return `${parts[0]} ${parts[1]}`;
    }
    return addr1;
  };

  // 설명 텍스트 처리
  const getDescriptionText = (spot: RandomTravelSpot) => {
    return spot.overview || "관광지 정보를 확인해보세요.";
  };

  if (loading) {
    return (
      <div className="relative rounded-xl overflow-hidden shadow-lg w-full flex items-center justify-center min-h-[220px] bg-gray-200 animate-pulse">
        <div className="text-gray-500">여행지를 찾고 있습니다...</div>
      </div>
    );
  }

  if (error || !travelSpot) {
    return (
      <div className="relative rounded-xl overflow-hidden shadow-lg w-full flex items-center justify-center min-h-[220px] bg-gray-200">
        <div className="text-center">
          <div className="text-gray-500">현재 추천할 수 있는 여행지가 없습니다.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative rounded-xl overflow-hidden shadow-lg w-full flex items-end min-h-[220px]">
      <Image
        src={travelSpot.firstimage!}
        alt={travelSpot.title}
        fill
        sizes="(max-width: 768px) 100vw, 430px"
        className="object-cover"
        draggable={false}
      />
      <div className="absolute inset-0 top-0 left-0 bg-black/40" />
      <div className="relative z-10 w-full p-5">
        <div className="mb-3 space-y-1 text-white">
          <h3 className="font-bold text-20">{travelSpot.title}</h3>
          <p className="flex items-center gap-1 text-14">
            <MapPin className="w-4 h-4 text-white" />
            {getLocationString(travelSpot.addr1)}
          </p>
          <p className="text-14 line-clamp-3">{getDescriptionText(travelSpot)}</p>
        </div>
        <div className="float-right">
          <DrawerItem
            title={travelSpot.title}
            location={getLocationString(travelSpot.addr1)}
            imgUrl={travelSpot.firstimage!}
            desc={getDescriptionText(travelSpot)}
          />
        </div>
      </div>
    </div>
  );
}

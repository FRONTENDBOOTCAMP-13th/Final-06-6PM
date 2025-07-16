"use client";

import SearchInput from "@/components/ui/searchInput";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Destination {
  id: number;
  name: string;
  image: string;
}

// 여행계획
export default function TravelPage() {
  const destinations: Destination[] = [
    {
      id: 1,
      name: "서울",
      image: "/gwak.png",
    },
    {
      id: 2,
      name: "부산",
      image: "/gwak.png",
    },
    {
      id: 3,
      name: "대전",
      image: "/gwak.png",
    },
    {
      id: 4,
      name: "대구",
      image: "/gwak.png",
    },
    {
      id: 5,
      name: "인천",
      image: "/gwak.png",
    },
    {
      id: 6,
      name: "울산",
      image: "/gwak.png",
    },
    {
      id: 7,
      name: "광주",
      image: "/gwak.png",
    },
    {
      id: 8,
      name: "제주도",
      image: "/gwak.png",
    },
    {
      id: 9,
      name: "경기도",
      image: "/gwak.png",
    },
    {
      id: 10,
      name: "강원도",
      image: "/gwak.png",
    },
    {
      id: 11,
      name: "전라도",
      image: "/gwak.png",
    },
    {
      id: 12,
      name: "경상도",
      image: "/gwak.png",
    },
  ];

  const [searchValueSm, setSearchValueSm] = useState("");

  const router = useRouter();
  const regionClick = (region: string) => {
    localStorage.setItem("selectedRegion", region);
    router.push("/plan/dates");
  };

  return (
    <div className="p-5">
      <div>
        <h2>여행일정만들기</h2>
        <h2 className="text-travel-primary200 text-28 font-extrabold py-1">
          어디로 여행을 떠나시나요?
        </h2>
        <SearchInput
          size="md"
          placeholder="가고 싶은 국내 여행지를 검색해보세요."
          value={searchValueSm}
          onChange={(e) => setSearchValueSm(e.target.value)}
          className="my-2"
        />
      </div>
      <div className="grid grid-cols-2 gap-5 py-5">
        {destinations.map((destination) => (
          <div
            key={destination.id}
            onClick={() => regionClick(destination.name)}
            className="cursor-pointer"
          >
            <div className="relative aspect-square rounded-lg overflow-hidden hover:scale-105">
              <Image
                width={400}
                height={300}
                src={destination.image}
                alt={destination.name}
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <h3 className="text-white text-20">{destination.name}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

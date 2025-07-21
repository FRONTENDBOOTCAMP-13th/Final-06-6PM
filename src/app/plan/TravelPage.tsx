"use client";

import DestinationCard, {
  Destination,
} from "@/components/feature/destinationCard";
import SearchInput from "@/components/form/searchInput";
import { useRouter } from "next/navigation";

// 여행계획
export default function TravelPage() {
  const destinations: Destination[] = [
    {
      id: 1,
      name: "서울",
      image: "/images/user5.png",
    },
    {
      id: 2,
      name: "부산",
      image: "/images/user5.png",
    },
    {
      id: 3,
      name: "대전",
      image: "/images/user5.png",
    },
    {
      id: 4,
      name: "대구",
      image: "/images/user5.png",
    },
    {
      id: 5,
      name: "인천",
      image: "/images/user5.png",
    },
    {
      id: 6,
      name: "울산",
      image: "/images/user5.png",
    },
    {
      id: 7,
      name: "광주",
      image: "/images/user5.png",
    },
    {
      id: 8,
      name: "제주도",
      image: "/images/user5.png",
    },
    {
      id: 9,
      name: "경기도",
      image: "/images/user5.png",
    },
    {
      id: 10,
      name: "강원도",
      image: "/images/user5.png",
    },
    {
      id: 11,
      name: "전라도",
      image: "/images/user5.png",
    },
    {
      id: 12,
      name: "경상도",
      image: "/images/user5.png",
    },
  ];

  const router = useRouter();
  const regionClick = (region: string) => {
    localStorage.setItem("selectedRegion", region);
    router.push("/plan/dates");
  };

  return (
    <div className="p-5">
      <div>
        <h2>여행일정만들기</h2>
        <h2 className="py-1 font-extrabold text-travel-primary200 text-28">
          어디로 여행을 떠나시나요?
        </h2>
        <SearchInput
          size="md"
          placeholder="가고 싶은 국내 여행지를 검색해보세요"
        />
      </div>
      <div className="grid grid-cols-2 gap-5 py-5">
        {destinations.map((destination) => (
          <DestinationCard
            key={destination.id}
            destination={destination}
            onClick={regionClick}
          />
        ))}
      </div>
    </div>
  );
}

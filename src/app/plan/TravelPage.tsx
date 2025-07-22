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
      areaCode: 1,
      name: "서울",
      image: "/images/destinations/seoul.webp",
    },
    {
      areaCode: 2,
      name: "인천",
      image: "/images/destinations/incheon.jpg",
    },
    {
      areaCode: 3,
      name: "대전",
      image: "/images/destinations/daejeon.jpg",
    },
    {
      areaCode: 4,
      name: "대구",
      image: "/images/destinations/daegu.jpg",
    },
    {
      areaCode: 5,
      name: "광주",
      image: "/images/destinations/gwangju.webp",
    },
    {
      areaCode: 6,
      name: "부산",
      image: "/images/destinations/busan.webp",
    },
    {
      areaCode: 7,
      name: "울산",
      image: "/images/destinations/ulsan.webp",
    },
    {
      areaCode: 8,
      name: "세종특별자치시",
      image: "/images/destinations/sejong.webp",
    },
    {
      areaCode: 9,
      name: "경기도",
      image: "/images/destinations/gyeonggi.webp",
    },
    {
      areaCode: 10,
      name: "강원특별자치도",
      image: "/images/destinations/gangwon.webp",
    },
    {
      areaCode: 11,
      name: "충청북도",
      image: "/images/destinations/chungbuk.webp",
    },
    {
      areaCode: 12,
      name: "충청남도",
      image: "/images/destinations/chungnam.webp",
    },
    {
      areaCode: 13,
      name: "경상북도",
      image: "/images/destinations/gyeongbuk.webp",
    },
    {
      areaCode: 14,
      name: "경상남도",
      image: "/images/destinations/gyeongnam.webp",
    },
    {
      areaCode: 15,
      name: "전북특별자치도",
      image: "/images/destinations/jeonbuk.webp",
    },
    {
      areaCode: 16,
      name: "전라남도",
      image: "/images/destinations/jeonnam.webp",
    },
    {
      areaCode: 17,
      name: "제주도",
      image: "/images/destinations/jeju.webp",
    },
  ];

  const router = useRouter();
  const regionClick = (region: string, areaCode: number) => {

    sessionStorage.setItem("selectedRegion", region);
    sessionStorage.setItem("selectedAreaCode", areaCode.toString());
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
            key={destination.areaCode}
            destination={destination}
            onClick={() => regionClick(destination.name, destination.areaCode)}
          />
        ))}
      </div>
    </div>
  );
}

import Button from "@/components/ui/btn";
import { ChevronDown, MapPin } from "lucide-react";
import Image from "next/image";

interface LocationCardProps {
  // 선택적 타입지정
  title?: string;
  location?: string;
  imageUrl?: string;
  imageAlt?: string;
  description?: string;
}

export default function LocationCard({
  title = "무슨해변",
  location = "제주특별자치도 서귀포시",
  imageUrl = "/gwak.png",
  imageAlt = "무슨해변 - 빨간 등대와 바다 풍경",
  description = "섬 전체가 하나의 거대한 관광자원인 제주도. 이 해변은 제주도의 에메랄드빛 물빛이 인상적인 섬 전체가 하나의 거대한 관광자원인 제주도. 이 해변은 제주도의 에메랄드빛 물빛이 인상적인 섬 전체가 하나의 거대한 관광자원인 제주도. 이 해변은 제주도의 어쩌구저쩌구",
}: LocationCardProps) {
  // 변수를 입력해주고 타입을 프롭스로 지정하고 안에있는 div들에게 반환
  return (
    <div className="w-full bg-white rounded-t-2xl shadow-lg p-6">
      {/* 화살표 */}
      <ChevronDown className="w-6 h-6 text-travel-gray600 mx-auto" />

      <div className="flex flex-col gap-4">
        {/* 제목 */}
        <div>
          <h2 className="text-24 font-bold text-travel-text200 mb-1.5">
            {title}
          </h2>
          <div className="flex items-center text-travel-gray600">
            <MapPin className="w-4 h-4 mr-1" />
            <span className="text-14">{location}</span>
          </div>
        </div>
        {/* 이미지 */}
        <Image
          width={200}
          height={190}
          src={imageUrl}
          alt={imageAlt}
          className="max-h-[190px] aspect-[5/3] w-full object-cover rounded-lg overflow-hidden bg-travel-gray200" // 이미지 못불러올시 회색
        />
        {/* 설명 */}
        <p className="text-14 text-travel-text100 line-clamp-4">
          {description}
        </p>
      </div>

      {/* 버튼 */}
      <Button size="lg" variant="primary" className="w-full mt-7">
        북마크 저장하기
      </Button>
    </div>
  );
}

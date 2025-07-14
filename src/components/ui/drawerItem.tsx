import { ChevronDown, MapPin } from "lucide-react";

interface LocationCardProps {
  // 선택적 타입지정
  title?: string;
  location?: string;
  imageUrl?: string;
  imageAlt?: string;
  description?: string;
}

const LocationCard = ({
  title = "무슨해변",
  location = "제주특별자치도 서귀포시",
  imageUrl = "/gwak.png",
  imageAlt = "무슨해변 - 빨간 등대와 바다 풍경",
  description = "섬 전체가 하나의 거대한 관광자원인 제주도. 이 해변은 제주도의 에메랄드빛 물빛이 인상적인 섬 전체가 하나의 거대한 관광자원인 제주도. 이 해변은 제주도의 에메랄드빛 물빛이 인상적인 섬 전체가 하나의 거대한 관광자원인 제주도. 이 해변은 제주도의 어쩌구저쩌구",
}: LocationCardProps) => {
  // 변수를 입력해주고 타입을 프롭스로 지정하고 안에있는 div들에게 반환
  return (
    <div className="w-full max-w-md mx-auto bg-travel-bg100 rounded-2xl shadow-lg overflow-hidden">
      {/* 화살표 */}
      <div className="flex justify-center pt-4 pb-2">
        <ChevronDown className="w-6 h-6 text-travel-gray600" />
      </div>

      {/* 제목 */}
      <div className="px-6 pb-4">
        <h2 className="text-24 font-bold text-travel-text200 mb-2">{title}</h2>
        <div className="flex items-center text-travel-gray600">
          <MapPin className="w-4 h-4 mr-1" />
          <span className="text-14">{location}</span>
        </div>
      </div>

      {/* 이미지 */}
      <div className="px-6 pb-4">
        <img
          src={imageUrl}
          alt={imageAlt}
          className="w-full object-cover rounded-lg bg-travel-gray200" // 이미지 못불러올시 회색
        />
      </div>

      {/* 설명 */}
      <div className="px-6 pb-6">
        <p className="text-14 text-travel-text100">{description}</p>
      </div>

      {/* 버튼 */}
      <div className="px-6 pb-6">
        <button className="w-full bg-travel-primary100 hover:bg-travel-primary200 text-white text-16 font-medium py-3 px-4 rounded-lg transition-colors">
          북마크 저장하기
        </button>
      </div>
    </div>
  );
};

export default LocationCard;

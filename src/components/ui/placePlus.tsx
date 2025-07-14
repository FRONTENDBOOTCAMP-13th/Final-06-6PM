import { MapPin, Star, Plus } from "lucide-react";

interface LocationInfoCardProps {
  title?: string;
  location?: string;
  reviewRating?: number;
  reviewCount?: number;
  imageUrl?: string;
  imageAlt?: string;
}

const LocationInfoCard = ({
  title = "성산일출봉",
  location = "여기는 성산일출봉 입니다. dddddddddddddd",
  reviewRating = 4.5,
  reviewCount = 3,
  imageUrl = "/gwak.png",
  imageAlt = "성산일출봉 이미지",
}: LocationInfoCardProps) => {
  return (
    <div className="w-full mx-auto bg-travel-bg100 rounded-2xl shadow-lg overflow-hidden">
      {/* 컨테이너 박스 */}
      <div className="px-4 py-4 flex gap-4">
        {/* 이미지 삽입 */}
        <div>
          <img
            src={imageUrl}
            alt={imageAlt}
            className="w-20 h-20 object-cover rounded-lg bg-travel-gray200" // 이미지 못불러올시 회색
          />
        </div>

        {/* 장소와 정보 */}
        <div className="relative flex-1">
          <h2 className="text-24 font-bold text-travel-text200 mb-2">
            {title}
          </h2>
          {/* max-width값 줘서 설명이 길어져도 +버튼쪽으로 가지 않게 만듬 */}
          <div className="flex items-center text-travel-gray600 mb-2 max-w-320">
            <MapPin className="w-4 h-4 mr-1" />
            <span className="text-14">{location}</span>
          </div>

          {/* +버튼 */}
          <div className="absolute right-8 top-10">
            <Plus className="w-5 h-5 text-travel-gray700" />
          </div>

          {/* 리뷰쪽 */}
          <div className="flex items-center">
            <Star className="w-4 h-4 text-amber-200 fill-amber-200 mr-1" />
            <span className="text-14 text-travel-text100">
              {reviewRating}({reviewCount})
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationInfoCard;

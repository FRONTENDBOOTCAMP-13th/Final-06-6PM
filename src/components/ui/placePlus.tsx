import { Star, Plus } from "lucide-react";
import Image from "next/image";

interface LocationInfoCardProps {
  title?: string;
  location?: string;
  reviewRating?: number;
  reviewCount?: number;
  imageUrl?: string;
  imageAlt?: string;
}

export default function LocationInfoCard({
  title = "성산일출봉",
  location = "여기는 성산일출봉 입니다. dddddddddddddd",
  reviewRating = 4.5,
  reviewCount = 3,
  imageUrl = "/gwak.png",
  imageAlt = "성산일출봉 이미지",
}: LocationInfoCardProps) {
  return (
    <div className="w-full bg-travel-bg100 rounded-2xl shadow-lg">
      {/* 컨테이너 박스 */}
      <div className="p-4 grid grid-cols-[auto_1fr_auto] items-center gap-4">
        {/* 이미지 삽입 */}
        <Image
          width={70}
          height={70}
          src={imageUrl}
          alt={imageAlt}
          className="aspect-square object-cover overflow-hidden rounded-lg bg-travel-gray200" // 이미지 못불러올시 회색
        />
        <div className="space-y-2 max-w-[240px]">
          <h2 className="text-16 font-bold text-travel-text200">{title}</h2>

          <p className="text-travel-gray600 text-14 whitespace-nowrap truncate">
            {location}
          </p>

          {/* 리뷰쪽 */}
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-travel-warn100 fill-travel-warn100" />
            <span className="text-14 text-travel-text100">
              {reviewRating}({reviewCount})
            </span>
          </div>
        </div>
        {/* +버튼 */}
        <Plus className="w-5 h-5 text-travel-gray700" />
      </div>
    </div>
  );
}

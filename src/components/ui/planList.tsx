import { Plus } from "lucide-react";
import PlanListItem, { PlanListItemProps } from "./planListItem";
import ButtonRounded from "./btnRound";
import Image from "next/image";


export default function PlanList() {
  const planListDataArray: PlanListItemProps[] = [
    { id: 1, title: "성산일출봉", tag: "관광지" },
    { id: 2, title: "성산일출봉", tag: "관광지" },
  ];
  return (
    // 나중에 지도 API 연동 예정
    <div className="w-full rounded-2xl not-only-of-type:overflow-hidden space-y-4">
      <div className="w-full bg-travel-gray200 rounded-2xl">
        <Image
          width={400}
          height={300}
          src="/gwak.png"
          alt="지도 영역"
          className="object-cover rounded-2xl"
        />
      </div>

      {/* planListItem 컴포넌트 사용 */}
      <div className="space-y-2">
        {planListDataArray.map((item, index) => (
          <PlanListItem
            key={item.id}
            number={index + 1}
            title={item.title}
            tag={item.tag}
          />
        ))}
      </div>

      {/* 등록 버튼 */}
      <ButtonRounded
        size="md"
        variant="fill"
        className="flex items-center gap-1 mx-auto"
      >
        <Plus className="text-white w-4 h-4 " />
        일정 등록하기
      </ButtonRounded>
    </div>
  );
}

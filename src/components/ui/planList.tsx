import { Plus } from "lucide-react";
import PlanListItem, { PlanListItemProps } from "./planListItem";
import ButtonRounded from "./btnRound";

export default function PlanList(planListData: PlanListItemProps[]) {
  const planListDataArray: PlanListItemProps[] = [
    { id: 1, title: "성산일출봉", tag: "관광지" },
    { id: 2, title: "성산일출봉", tag: "관광지" },
  ];
  return (
    // 나중에 지도 API 연동 예정
    <div className="w-full bg-travel-bg100 rounded-2xl shadow-lg overflow-hidden space-y-4">
      <div>
        <div className="w-full h-48 bg-travel-gray200 rounded-lg flex items-center justify-center">
          <img
            src="/gwak.png"
            alt="지도 영역"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>

      {/* planListItem 컴포넌트 사용 */}
      <div>
        {planListDataArray.map((item, index) => (
          <PlanListItem
            key={item.id}
            number={index + 1}
            title={item.title}
            tag={item.tag}
          />
        ))}
      </div>

      {/* 일정 등록 버튼 */}
      <div className="flex justify-center">
        <ButtonRounded
          size="lg"
          variant="fill"
          className="flex items-center gap-1"
        >
          <Plus className="w-4 h-4" />
          일정 등록하기
        </ButtonRounded>
      </div>
    </div>
  );
}

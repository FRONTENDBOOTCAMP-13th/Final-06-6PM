import { Plus } from "lucide-react";
import PlanListItem from "./planListItem";
import ButtonRounded from "./btnRound";
import { PlanListItemProps } from "./planListItem";


function planListItem ({ id: 1, title: "성산일출봉", tag: "관광지" },
      { id: 2, title: "성산일출봉", tag: "관광지" }: PlanListItemProps) {
  return (
    // 나중에 지도 API 연동 예정
    <div className="w-full max-w-md mx-auto bg-travel-bg100 rounded-2xl shadow-lg overflow-hidden">
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
      <div className="pb-4">
        {planListItem.map((item, index) => (
          <PlanListItem
            key={item.id}
            number={index + 1}
            title={item.title}
            tag={item.tag}
          />
        ))}
      </div>

      {/* 일정 등록 버튼 */}
      <div className="px-6 pb-6 flex justify-center">
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

export default planListItem;

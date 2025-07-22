import Button from "@/components/ui/btn";
import PlacePlusItem from "@/components/feature/placePlusItem";
import SearchInput from "@/components/form/searchInput";
import TagItem from "@/components/feature/tagItem";
import BackButton from "@/components/feature/backButton";
import { Bookmark, CalendarDays, Search } from "lucide-react";
import { TravelData } from "@/components/plan/planContainer";
import NextButton from "@/components/feature/nextButton";
import RemoveTag from "@/components/ui/removeTag";

interface StepSearchProps {
  onNext: (stepData: any) => void;
  onPrev: () => void;
  data: TravelData;
}

const tourData = [
  { id: 1, name: "가나디" },
  { id: 2, name: "성산일출봉" },
  { id: 3, name: "한라산" }
];


export default function StepSearch({ onNext, onPrev }: StepSearchProps) {
  return (
    <div>
      <div className="w-full relative py-5 px-4">
        <BackButton onPrev={onPrev} />
        <p className="text-center">여행일정만들기</p>
      </div>
      
      <div className="relative w-full px-4 pb-25">
        <div>
          <h2 className="text-28 text-travel-primary200 font-semibold">
            울산
          </h2>
          <p className="text-16 text-travel-gray700">
            2025.08.03 ~ 2025.08.05
          </p>
        </div>
        
        <div className="pt-7">
          <SearchInput
            size="md"
            placeholder="가고 싶은 국내 여행지를 검색해보세요"
          />
          <div className="flex items-center gap-1 py-3">
            <TagItem>전체</TagItem>
            <TagItem variant="outline">맛집</TagItem>
            <TagItem variant="outline">행사</TagItem>
            <TagItem variant="outline">관광지</TagItem>
            <TagItem variant="outline">숙박</TagItem>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <Bookmark className="w-4.5 h-4.5 -translate-y-0.5" />
              <h2 className="text-18 font-semibold py-2">나의 북마크</h2>
            </div>
            <p className="text-16 text-travel-text100">저장된 북마크가 없습니다.</p>
            <PlacePlusItem />
            <Button variant="outline" className="text-14 my-2">
              북마크 더보기
            </Button>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <CalendarDays className="w-4.5 h-4.5 -translate-y-0.5" />
              <h2 className="text-18 font-semibold py-2">제주도 모든 장소</h2>
            </div>
            <div className="flex flex-col gap-2">
              <PlacePlusItem />
              <PlacePlusItem />
              <PlacePlusItem />
              <PlacePlusItem />
            </div>

            <div className="flex flex-col items-center justify-center mt-3 gap-1">
              <Search className="w-6 h-6" />
              <h3 className="text-18 font-semibold text-gray-700">
                검색 결과가 없습니다.
              </h3>
              <p className="text-14 text-travel-text100 ">
                내가 찾는 장소가 없나요? 직접 등록해보세요.
              </p>
              <Button variant="outline">주소로 등록하기</Button>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-15 bg-white w-full py-3">
        <div className="flex gap-2 pb-2">
            <RemoveTag tagData={tourData} />
        </div>
      </div>
        <NextButton onNext={onNext} />
    </div>
  );
}
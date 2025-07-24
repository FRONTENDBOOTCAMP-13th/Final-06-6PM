import PlaceCard from "@/components/feature/placeCard";
import { KeywordTravelProps } from "@/types/travel";

interface SearchResultProps {
  searchList: KeywordTravelProps[];
  selectedCategoryInfo: { id: string; name: string } | undefined;
  keyword: string;
  isSearching: boolean;
  onItemClick: (contentId: string) => void;
  onItemAdd: (item: KeywordTravelProps) => void;
}

export default function SearchResult({ 
  searchList, 
  selectedCategoryInfo, 
  keyword,
  isSearching,
  onItemClick, 
  onItemAdd 
}: SearchResultProps){
  // 로딩 중이면 아무것도 렌더링하지 않음
  if (isSearching) {
    return null;
  }

  // 검색 결과가 있는 경우
  if (searchList.length > 0) {
    return (
      <div className="space-y-3 mt-4">
        <h3 className="font-bold text-16">
          {selectedCategoryInfo?.name} 검색 결과
        </h3>
        {searchList.map((item) => (
          <PlaceCard
            key={item.contentid}
            item={item}
            categoryName={selectedCategoryInfo?.name}
            onClick={() => onItemClick(item.contentid.toString())}
            onAdd={() => onItemAdd(item)}
          />
        ))}
      </div>
    );
  }

  // 검색했지만 결과가 없는 경우
  if (keyword && searchList.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>"{keyword}"에 대한 검색 결과가 없습니다.</p>
        <p className="text-sm mt-2">다른 키워드로 검색해보세요.</p>
      </div>
    );
  }

  // 검색하지 않은 상태면 아무것도 렌더링하지 않음
  return null;
};


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
  onItemAdd,
}: SearchResultProps) {
  if (isSearching) {
    return (
      <div className="text-center py-4">
        <p className="text-gray-500">검색 중...</p>
      </div>
    );
  }

  if (keyword.trim()) {
    if (searchList.length > 0) {
      return (
        <div className="space-y-3 mt-4">
          <h3 className="font-bold text-16">{selectedCategoryInfo?.name} 검색 결과</h3>
          {searchList.map((item) => (
            <PlaceCard
              key={item.contentid}
              item={item}
              onClick={() => onItemClick(item.contentid.toString())}
              onAdd={() => onItemAdd(item)}
            />
          ))}
        </div>
      );
    }

    return (
      <div className="text-center py-8 text-gray-500">
        <p>"{keyword}"에 대한 검색 결과가 없습니다.</p>
        <p className="text-sm mt-2">다른 키워드로 검색해보세요.</p>
      </div>
    );
  }

  return null;
}

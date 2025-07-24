import SearchInput from "@/components/form/searchInput";
import { Destination } from "@/lib/data/destinationList";

interface SearchSectionProps {
  selectedArea: Destination;
  keyword: string;
  isSearching: boolean;
  onSearch: (value: string) => Promise<void>;
}

export default function SearchSection({ 
  selectedArea, 
  keyword, 
  isSearching, 
  onSearch 
}: SearchSectionProps){
  return (
    <div className="flex flex-col gap-2">
      <SearchInput
        placeholder={`가고싶은 ${selectedArea.name} 여행지를 검색해보세요.`}
        value={keyword}
        onSearch={onSearch}
      />
      
      {/* 로딩 상태 표시 */}
      {isSearching && (
        <div className="text-center py-4">
          <p className="text-gray-500">검색 중...</p>
        </div>
      )}
    </div>
  );
};


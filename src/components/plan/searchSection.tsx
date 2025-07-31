import SearchInput from "@/components/form/searchInput";
import { Destination } from "@/lib/data/destinationList";

interface SearchSectionProps {
  selectedArea: Destination;
  keyword: string;
  isSearching: boolean;
  onSearch: (value: string) => Promise<void>;
}

export default function SearchSection({ selectedArea, keyword, isSearching, onSearch }: SearchSectionProps) {
  return (
    <div className="flex flex-col gap-2">
      <SearchInput
        placeholder={`가고싶은 ${selectedArea.name} 여행지를 검색해보세요.`}
        value={keyword}
        onSearch={onSearch}
      />
    </div>
  );
}

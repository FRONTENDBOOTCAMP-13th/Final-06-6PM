import SearchInput from "@/components/form/searchInput";
import FeedContent from "@/components/feature/feedContent";

export default function FeedPage() {
  return (
    <>
      <SearchInput size="md" placeholder="가고 싶은 국내 여행지의 리뷰를 살펴보세요" />
      <FeedContent />
    </>
  );
}

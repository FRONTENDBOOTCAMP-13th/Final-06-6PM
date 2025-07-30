"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ButtonRounded from "@/components/ui/btnRound";
import DropdownItem from "@/components/feature/dropdownItem";
import TagItem from "@/components/feature/tagItem";
import ViewItem from "@/components/feature/viewItem";
import SearchInput from "@/components/form/searchInput";
import { getReviewAllList, getReviewDailyList, getReviewPlaceList } from "@/data/functions/review";
import { GetReviewDetailProps } from "@/types/review";

type ReviewType = "all" | "reviewAll" | "reviewDaily" | "reviewPlace";

export default function FeedContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [reviewData, setReviewData] = useState<GetReviewDetailProps[]>([]);
  const [filteredData, setFilteredData] = useState<GetReviewDetailProps[]>([]);
  const [currentType, setCurrentType] = useState<ReviewType>("all");
  const [loading, setLoading] = useState(false);
  const [deleteReviewId, setDeleteReviewId] = useState<number | null>(null);
  const [searchText, setSearchText] = useState("");

  // 현재 검색창의 상태 없으면 ""
  useEffect(() => {
    const query = searchParams.get("search") || "";
    setSearchText(query);
  }, [searchParams]);

  // 검색어 제목+내용으로 필터링
  useEffect(() => {
    if (!searchText.trim()) {
      //검색어가 없거나 공백만 있으면 싹다 출력
      setFilteredData(reviewData);
    } else {
      //영어 검색을 위한 대소문자 구분없애기
      const lowerCaseSearch = searchText.toLowerCase();
      const filtered = reviewData.filter(
        (item) =>
          (item.title ?? "").toLowerCase().includes(lowerCaseSearch) ||
          (item.content ?? "").toLowerCase().includes(lowerCaseSearch),
      );
      setFilteredData(filtered);
    }
  }, [reviewData, searchText]);

  const handleSearch = (value: string) => {
    setSearchText(value); // 서치텍스트의 현재 상태 업데이트

    // 새로고침 버튼
    const params = new URLSearchParams(searchParams);
    if (value.trim()) {
      params.set("search", value.trim());
    } else {
      params.delete("search");
    }
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const fetchReviewData = async (type: ReviewType = "all") => {
    setLoading(true);
    try {
      let allData: GetReviewDetailProps[] = [];

      if (type === "all") {
        const [reviewAllRes, reviewDailyRes, reviewPlaceRes] = await Promise.all([
          getReviewAllList(),
          getReviewDailyList(),
          getReviewPlaceList(),
        ]);

        const reviewAllData = reviewAllRes?.ok === 1 ? reviewAllRes.item || [] : [];
        const reviewDailyData = reviewDailyRes?.ok === 1 ? reviewDailyRes.item || [] : [];
        const reviewPlaceData = reviewPlaceRes?.ok === 1 ? reviewPlaceRes.item || [] : [];

        allData = [...reviewAllData, ...reviewDailyData, ...reviewPlaceData];
      } else {
        let response;
        switch (type) {
          case "reviewAll":
            response = await getReviewAllList();
            break;
          case "reviewDaily":
            response = await getReviewDailyList();
            break;
          case "reviewPlace":
            response = await getReviewPlaceList();
            break;
          default:
            response = { ok: 0, item: [] };
        }
        allData = response?.ok === 1 ? response.item || [] : [];
      }

      setReviewData(allData);
    } catch (error) {
      console.error("데이터 로딩 실패:", error);
      setReviewData([]);
    } finally {
      setLoading(false);
    }
  };

  const handleTypeChange = (type: ReviewType) => {
    setCurrentType(type);
  };

  // 삭제 성공 시 데이터 새로고침하는 콜백 함수
  const handleDelete = (reviewId: number) => {
    setDeleteReviewId(reviewId);

    // 로컬 상태에서 해당 리뷰 제거
    setReviewData((prev) => prev.filter((item) => item._id !== reviewId));
  };

  useEffect(() => {
    fetchReviewData(currentType);
  }, [currentType]);

  return (
    <>
      {/* 서치인풋폼 및 기존코드  */}
      <div>
        <SearchInput
          size="md"
          placeholder="가고 싶은 국내 여행지의 리뷰를 살펴보세요"
          value={searchText} // 상태값 표시 및 업데이트
          onSearch={handleSearch}
        />

        <button // search=으로 링크가 들어가버려서 f5눌러도 그대로라 버튼을 따로 만듬
          onClick={() => handleSearch("")}
          className="text-sm text-travel-gray500 hover:text-travel-primary200 "
          aria-label="새로고침"
          type="button"
        >
          새로고침
        </button>
      </div>

      <div className="flex flex-col-reverse xs:flex-row items-end xs:items-center gap-y-3 my-3 px-0.5">
        <div className="flex w-full xs:w-fit flex-start items-center gap-0.5">
          <TagItem variant={currentType === "all" ? "primary" : "outline"}>
            <span onClick={() => handleTypeChange("all")}>전체</span>
          </TagItem>
          <ButtonRounded
            variant={currentType === "reviewAll" ? "primary" : "outline"}
            size="sm"
            onClick={() => handleTypeChange("reviewAll")}
          >
            전체리뷰
          </ButtonRounded>
          <TagItem variant={currentType === "reviewDaily" ? "primary" : "outline"}>
            <span onClick={() => handleTypeChange("reviewDaily")}>일별리뷰</span>
          </TagItem>
          <TagItem variant={currentType === "reviewPlace" ? "primary" : "outline"}>
            <span onClick={() => handleTypeChange("reviewPlace")}>장소별리뷰</span>
          </TagItem>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        {loading ? (
          <div className="text-center py-8">로딩 중...</div>
        ) : filteredData.length > 0 ? (
          filteredData.map((item) => <ViewItem key={`${item.type}-${item._id}`} {...item} onDelete={handleDelete} />)
        ) : (
          <div className="text-center py-8 text-travel-gray400">
            {searchText ? "검색 결과가 없습니다." : "후기가 없습니다."}
          </div>
        )}
      </div>
    </>
  );
}

"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ButtonRounded from "@/components/ui/btnRound";
import TagItem from "@/components/feature/tagItem";
import ViewItem from "@/components/feature/viewItem";
import SearchInput from "@/components/form/searchInput";
import { getReviewAllList, getReviewDailyList, getReviewPlaceList } from "@/data/functions/review";
import { GetReviewDetailProps } from "@/types/review";
import useUserStore from "@/zustand/userStore";
import { AlertCircle, RotateCcw } from "lucide-react";
import Button from "@/components/ui/btn";
import ViewItemSkeleton from "@/components/feature/viewItemSkeleton";

type ReviewType = "all" | "reviewAll" | "reviewDaily" | "reviewPlace";

export default function FeedContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [reviewData, setReviewData] = useState<GetReviewDetailProps[]>([]);
  const [filteredData, setFilteredData] = useState<GetReviewDetailProps[]>([]);
  const [currentType, setCurrentType] = useState<ReviewType>("all");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deleteReviewId, setDeleteReviewId] = useState<number | null>(null);
  const [searchText, setSearchText] = useState("");
  const token = useUserStore((state) => state.token);

  // 현재 검색창의 상태 없으면 ""
  useEffect(() => {
    const query = searchParams.get("search") || "";
    setSearchText(query);
  }, [searchParams]);

  // 검색어 제목+내용으로 필터링
  useEffect(() => {
    if (!searchText.trim()) {
      //검색어가 없거나 공백만 있으면 리뷰데이타 그대로 출력
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

  const fetchReviewData = useCallback(async (type: ReviewType = "all") => {
    setLoading(true);
    setError(null);

    try {
      let allData: GetReviewDetailProps[] = [];

      if (type === "all") {
        const [reviewAllRes, reviewDailyRes, reviewPlaceRes] = await Promise.all([
          getReviewAllList(token!),
          getReviewDailyList(token!),
          getReviewPlaceList(token!),
        ]);

        const reviewAllData = reviewAllRes?.ok === 1 ? reviewAllRes.item || [] : [];
        const reviewDailyData = reviewDailyRes?.ok === 1 ? reviewDailyRes.item || [] : [];
        const reviewPlaceData = reviewPlaceRes?.ok === 1 ? reviewPlaceRes.item || [] : [];

        allData = [...reviewAllData, ...reviewDailyData, ...reviewPlaceData];
      } else {
        let response;
        switch (type) {
          case "reviewAll":
            response = await getReviewAllList(token!);
            break;
          case "reviewDaily":
            response = await getReviewDailyList(token!);
            break;
          case "reviewPlace":
            response = await getReviewPlaceList(token!);
            break;
          default:
            response = { ok: 0, item: [] };
        }
        allData = response?.ok === 1 ? response.item || [] : [];
      }

      setReviewData(allData);
    } catch (error) {
      console.error("데이터 로딩 실패:", error);
      setError("데이터를 불러오는데 실패했습니다. 다시 시도해주세요.");
      setReviewData([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleTypeChange = (type: ReviewType) => {
    setCurrentType(type);
  };

  const handleDelete = (reviewId: number) => {
    setReviewData((prev) => prev.filter((item) => item._id !== reviewId));
  };

  useEffect(() => {
    fetchReviewData(currentType);
  }, [currentType, fetchReviewData]);

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="flex items-start gap-2 rounded-md border bg-red-50 p-3 text-red-500 mb-4">
          <AlertCircle className="size-5 shrink-0" />
          <p className="text-14 font-medium">{error}</p>
        </div>

        <Button
          variant="fill"
          size="md"
          onClick={() => fetchReviewData(currentType)}
          className="w-full flex items-center justify-center gap-2"
        >
          <RotateCcw className="size-4" />
          다시 시도
        </Button>
      </div>
    );
  }

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
        {/* <DropdownItem label="오래된순" />
        <div className="flex w-full xs:w-fit flex-start items-center gap-0.5 before:hidden xs:before:block before:content-['|'] before:mx-1 before:text-travel-gray400"></div> */}
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
          <div className="space-y-6">
            {Array.from({ length: 3 }).map((_, idx) => (
              <ViewItemSkeleton key={idx} />
            ))}
          </div>
        ) : filteredData.length > 0 ? (
          filteredData.map((item) => <ViewItem key={`${item.type}-${item._id}`} {...item} onDelete={handleDelete} />)
        ) : (
          //그냥 아이템만 있으면 충돌날수도 있는데 그럼 큰일나서 앞에 타입까지 붙여줌
          <div className="text-center py-8 text-travel-gray400">
            {searchText ? "검색 결과가 없습니다." : "후기가 없습니다."}
          </div>
        )}
      </div>
    </>
  );
}

"use client";
import { useState, useEffect } from "react";
import ButtonRounded from "@/components/ui/btnRound";
import DropdownItem from "@/components/feature/dropdownItem";
import SearchInput from "@/components/form/searchInput";
import TagItem from "@/components/feature/tagItem";
import ViewItem, { ViewItemProps } from "@/components/feature/viewItem";
import {
  getReviewAllList,
  getReviewDailyList,
  getReviewPlaceList,
} from "@/data/functions/plan";

type ReviewType = "all" | "reviewAll" | "reviewDaily" | "reviewPlace";

interface ApiReviewItem {
  _id: number;
  type: string;
  views: number;
  user: {
    _id: number;
    name: string;
    image: string;
  };
  title: string;
  content: string;
  starRate: number; // *목록조회-전체/일자별/장소별에 안뜸
  createdAt: string; // 생성날짜
  updatedAt: string; // 수정날짜
  extra: {
    startDate: string; // 여행시작일
    endDate: string; // 여행종료일
    tags: string[]; // *목록조회-전체에 안뜸
  };
  bookmarks: number;
  repliesCount: number;
  product: {
    image: string | null;
  };
}

const formatDateYmd = (dateString: string) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const formattedDate = `${year}.${month}.${day}`;
  return formattedDate;
};

// data.js에 location이 없어서 우선은 제목에서 첫단어 추출하고 있음.
// 제목을 공백 기준으로 나눠 그 배열의 첫번째 요소!
const extractLocation = (title: string): string => {
  return title.split(" ")[0] || "방문장소";
};

// 태그 문제발견완료! 실제 data.js 양식이 전체리뷰랑 일별리뷰가 다름 확인하고 수정할것!
// all에서는 태그가 바깥에 있는데 데일리랑 플레이스는 태그가 extra 안에 있음!
// 방문일자 다르게 전체랑 다르게 나오는 것도, all에 맞춰 startDate라고 설정해놓고 없을씨 createdAt에서
// 불러오는것으로 되어있는데, 데일리와 플레이스는 date로 되어있음.
// all은 시작일~종료일 둘다 떠야하기에 이것도 추가 수정!!
// regdate도 추가해야함. data.js에 없고, viewItem에만 있음 따라서 적용안되고 있음.
// starRate도 반영안되고 있어 수정해야함.
// 이미지도 둘 다 잘 들어가지만 사용자별 이미지에 맞춰 수정해야함.
const transformReviewData = (apiData: ApiReviewItem[]): ViewItemProps[] => {
  return apiData.map((item) => {
    return {
      _id: item._id,
      title: item.title,
      userName: item.user.name,
      userImgURL: "/images/user2.png", // item.user.image
      location: extractLocation(item.title),
      content: item.content,
      contentImg: [
        "/images/user1.png",
        "/images/user2.png",
        "/images/user3.png",
      ],
      starRate: item.starRate || 5,
      tags:
        item.extra?.tags && item.extra.tags.length > 0
          ? item.extra.tags
          : [extractLocation(item.title)],
      views: item.views,
      likes: item.bookmarks,
      comments: item.repliesCount,
      visitDate: formatDateYmd(item.extra?.startDate || item.createdAt),
    };
  });
};

export default function FeedPage() {
  const [reviewData, setReviewData] = useState<ViewItemProps[]>([]);
  const [currentType, setCurrentType] = useState<ReviewType>("all");
  const [loading, setLoading] = useState(false);

  // 살펴보기 처음에 전체(all)로 불러옴
  // 병렬로 데이터를 동시에 가져와 한 배열로 합쳐 불러옴
  // 서버 성공 시 데이터 잘 들어오면 ok, 실패 시 빈 배열
  // all이 아닐경우 switch로 선택한 타입만 호출해서 불러옴
  const fetchReviewData = async (type: ReviewType = "all") => {
    setLoading(true);
    try {
      let allData: ApiReviewItem[] = [];
      if (type === "all") {
        const [reviewAllRes, reviewDailyRes, reviewPlaceRes] =
          await Promise.all([
            getReviewAllList(),
            getReviewDailyList(),
            getReviewPlaceList(),
          ]);
        const reviewAllData =
          reviewAllRes.ok === 1 ? reviewAllRes.item || [] : [];
        const reviewDailyData =
          reviewDailyRes.ok === 1 ? reviewDailyRes.item || [] : [];
        const reviewPlaceData =
          reviewPlaceRes.ok === 1 ? reviewPlaceRes.item || [] : [];
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
        allData = response.ok === 1 ? response.item || [] : [];
      }

      setReviewData(transformReviewData(allData));
    } catch (error) {
      console.error("데이터 로딩 실패:", error);
      setReviewData([]);
    } finally {
      setLoading(false);
    }
  };

  // 리뷰타입을 선택하면 선택한 타입으로 currentType를 변경!
  const handleTypeChange = (type: ReviewType) => {
    setCurrentType(type);
  };

  // currentType(상태)이 바뀔때마다 fetchReviewData 호출해서 데이터를 다시 불러옴
  useEffect(() => {
    fetchReviewData(currentType);
  }, [currentType]);

  return (
    <>
      <SearchInput
        size="md"
        placeholder="가고 싶은 국내 여행지의 리뷰를 살펴보세요"
      />
      <div className="flex flex-col-reverse xs:flex-row items-end xs:items-center gap-y-3 my-3 px-0.5">
        <DropdownItem label="오래된순" />
        <div className="flex w-full xs:w-fit flex-start items-center gap-0.5 before:hidden xs:before:block before:content-['|'] before:mx-1 before:text-travel-gray400">
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
          <TagItem
            variant={currentType === "reviewDaily" ? "primary" : "outline"}
          >
            <span onClick={() => handleTypeChange("reviewDaily")}>
              일별리뷰
            </span>
          </TagItem>
          <TagItem
            variant={currentType === "reviewPlace" ? "primary" : "outline"}
          >
            <span onClick={() => handleTypeChange("reviewPlace")}>
              장소별리뷰
            </span>
          </TagItem>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        {loading ? (
          <div className="text-center py-8">로딩 중...</div>
        ) : reviewData.length > 0 ? (
          reviewData.map((item) => <ViewItem key={item._id} {...item} />)
        ) : (
          <div className="text-center py-8 text-travel-gray400">
            후기가 없습니다.
          </div>
        )}
      </div>
    </>
  );
}

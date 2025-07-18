import ButtonRounded from "@/components/ui/btnRound";
import DropdownItem from "@/components/ui/dropdownItem";
import SearchInput from "@/components/form/searchInput";
import TagItem from "@/components/ui/tagItem";
import ViewItem, { ViewItemProps } from "@/components/feature/viewItem";

// 더미데이터
const dummyData: ViewItemProps[] = [
  {
    userName: "주먹밥쿵야",
    userImgURL: "/images/user1.png",
    location: "제주도",
    content: "1번 내용입니다.",
    contentImg : ["/images/user1.png"],
    tags: ["맛집", "자연", "풍경"],
    views: 123,
    likes: 45,
    comments: 12,
    visitDate: "2025-07-15",
  },
  {
    userName: "하츄핑",
    userImgURL: "/images/user2.png",
    location: "부산",
    content: "2번 내용입니다.",
    contentImg : ["/images/user1.png","/images/user2.png"],
    tags: ["해변", "카페", "바다"],
    views: 456,
    likes: 78,
    comments: 34,
    visitDate: "2025-07-14",
  },
  {
    userName: "숀",
    userImgURL: "/images/user3.png",
    location: "강릉",
    content: "3번 내용입니다.",
    tags: ["카페", "감성", "동해"],
    views: 789,
    likes: 90,
    comments: 56,
    visitDate: "2025-07-13",
  },
  {
    userName: "듀..가나디",
    userImgURL: "/images/user4.png",
    location: "서울",
    content: "4번 내용입니다.",
    tags: ["맛집", "카페", "힐링"],
    views: 129,
    likes: 40,
    comments: 76,
    visitDate: "2025-07-14",
  },
];

// 살펴보기 게시판 목록
export default function FeedPage() {
  return (
    <>
      {/* 검색바 */}
      <SearchInput
        size="md"
        placeholder="가고 싶은 국내 여행지의 리뷰를 살펴보세요"
      />

      {/* 셀렉트창 및 필터 */}
      <div className="flex flex-col-reverse xs:flex-row items-end xs:items-center gap-y-3 my-3 px-0.5">
        <DropdownItem label="오래된순" />
        <div className="flex w-full xs:w-fit flex-start items-center gap-0.5 before:hidden xs:before:block before:content-['|'] before:mx-1 before:text-travel-gray400 ">
          <TagItem>전체</TagItem>
          <ButtonRounded variant="outline" size="sm">
            전체리뷰
          </ButtonRounded>
          <TagItem variant="outline">일별리뷰</TagItem>
          <TagItem variant="outline">장소별리뷰</TagItem>
        </div>
      </div>
      {/* 내용 */}
      <div className="flex flex-col gap-6">
        {dummyData.map((item, index) => (
          <ViewItem key={index} {...item} />
        ))}
      </div>
    </>
  );
}

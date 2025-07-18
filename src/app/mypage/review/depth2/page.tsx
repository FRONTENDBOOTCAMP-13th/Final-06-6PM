import SelectMenu3 from "@/components/feature/selectMenu3";
import ViewItem, { ViewItemProps } from "@/components/feature/viewItem";
import { ChevronDown } from "lucide-react";

// 마이페이지/리뷰
export default function MypageReviewPage() {

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
      contentImg : ["/images/user1.png","/images/user2.png","/images/user3.png"],
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

  return (
    <>
      <h2>마이페이지/리뷰</h2>

      {/* 셀렉트박스 :: 커스텀 드롭다운 필요*/}
      <div className="relative mb-2">
        <label htmlFor="daily-review"></label>
        <select
          name="daily-review"
          id="daily-review"
          className="w-full border border-travel-gray400 py-3 px-4 rounded-lg 
               bg-white text-travel-text100 text-14
               focus:outline-none focus:border-travel-primary100 focus:ring-2 focus:ring-travel-primary100
               hover:border-travel-primary100
               appearance-none cursor-pointer"
        >
          <option value="날짜선택" className="text-travel-gray500">
            날짜를 선택하세요
          </option>
          <option value="day1" className="py-2">
            1일차 (2025.07.12)
          </option>
          <option value="day2" className="py-2">
            2일차 (2025.07.13)
          </option>
          <option value="day3" className="py-2">
            3일차 (2025.07.14)
          </option>
          <option value="day4" className="py-2">
            4일차 (2025.07.15)
          </option>
        </select>

        <div className="absolute top-4 right-0 flex items-center px-3 pointer-events-none">
          <ChevronDown className="w-4 h-4 text-travel-gray600" />
        </div>
      </div>
      <div className="bg-white rounded-2xl overflow-hidden">
        <SelectMenu3 />
        <div className="flex flex-col px-4 gap-4">
        {dummyData.map((item, index) => (
            <ViewItem key={index} {...item} />  
          ))}
        </div>
      </div>
    </>
  );
}

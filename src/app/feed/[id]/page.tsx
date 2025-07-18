import CommentItem from "@/components/ui/commentItem";
import ViewItem, { ViewItemProps } from "@/components/feature/viewItem";

// 살펴보기 게시판 목록
export default function FeedViewPage() {

  // 더미데이터
  const dummyData: ViewItemProps = 
    {
      userName: "숀",
      userImgURL: "/images/user3.png",
      location: "강릉",
      content: "3번 내용입니다.",
      contentImg : ["/images/user1.png","/images/user2.png","/images/user3.png","/images/user1.png","/images/user2.png","/images/user3.png"],
      tags: ["카페", "감성", "동해"],
      views: 789,
      likes: 90,
      comments: 56,
      visitDate: "2025-07-13",
    }
  ;
  
  return (
    <>
      <div className="py-6 px-4 relative bg-white rounded-2xl">
        {/* 내용 */}
        <div className="flex flex-col gap-8">
            <ViewItem {...dummyData} />
        </div>


        <>
        <hr className="my-6 text-travel-gray200" />
        <CommentItem
          author={"오둥이"}
          date={"2024-07-18"}
          content={
            "여기 진짜 힐링 그 자체네요 사진만 봐도 여유로워요. 혹시 여긴 어떻게 가면 되나요? 대중교통 가능한가요?"
          }
        />{" "}
        <hr className="my-6 text-travel-gray200" />
        <CommentItem
          author={"오둥이"}
          date={"2024-07-18"}
          content={
            "여기 진짜 힐링 그 자체네요 사진만 봐도 여유로워요. 혹시 여긴 어떻게 가면 되나요? 대중교통 가능한가요?"
          }
        />
        <hr className="my-6 text-travel-gray200" />
        <CommentItem
          author={"오둥이"}
          date={"2024-07-18"}
          content={
            "여기 진짜 힐링 그 자체네요 사진만 봐도 여유로워요. 혹시 여긴 어떻게 가면 되나요? 대중교통 가능한가요?"
          }
        />
        <hr className="my-6 text-travel-gray200" />
        <CommentItem
          author={"오둥이"}
          date={"2024-07-18"}
          content={
            "여기 진짜 힐링 그 자체네요 사진만 봐도 여유로워요. 혹시 여긴 어떻게 가면 되나요? 대중교통 가능한가요?"
          }
        />
      </>
      </div>
    </>
  );
}

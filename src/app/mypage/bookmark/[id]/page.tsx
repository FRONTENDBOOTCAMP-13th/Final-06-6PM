import DropdownItem from "@/components/ui/dropdownItem";
import TagItem from "@/components/ui/tagItem";
import SelectMenu2 from "@/components/feature/selectMenu2";
import ViewItem, { ViewItemProps } from "@/components/feature/viewItem";

// 마이페이지/북마크
export default function MypageBookmarkPage() {

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
      {/* 셀렉트창 및 필터 */}
      <div className="flex flex-col-reverse xs:flex-row items-start xs:items-center gap-y-1 mt-2 px-0.5">
        <DropdownItem label="전체도시" />
        <div className="flex flex-wrap flex-start items-center gap-2 before:hidden xs:before:block before:content-['|'] before:ml-2 before:text-travel-gray400 ">
          <TagItem>전체</TagItem>
          <TagItem variant="outline">맛집</TagItem>
          <TagItem variant="outline">행사</TagItem>
          <TagItem variant="outline">축제</TagItem>
        </div>
      </div>

      <h3 className="my-4 font-semibold">전체 도시</h3>
      <div className=" bg-white shadow-xl rounded-2xl overflow-hidden">
        <SelectMenu2 />
        <div className="flex flex-col px-4 gap-4">
        {dummyData.map((item, index) => (
            <ViewItem key={index} {...item} />  
          ))}
        </div>
      </div>
    </>
  );
}

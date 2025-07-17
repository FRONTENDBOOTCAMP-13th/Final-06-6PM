import React from "react";
import DropdownItem from "@/components/ui/dropdownItem";
import TagItem from "@/components/ui/tagItem";
import SelectMenu2 from "@/components/ui/selectMenu2";
import PlacePlusItem from "@/components/feature/placePlusItem";

// 마이페이지/북마크
export default function MypageBookmarkPage() {
  // 더미데이터
  const dummyData = [
    {
      reviewRating: 1.3,
      reviewCount: 2,
      place: "광안리해수욕장",
      desc: "포토스팟으로 일품인 광안대교의 야경",
      imgUrl: "/images/user3.png",
    },
    {
      reviewRating: 4.7,
      reviewCount: 15,
      place: "해운대해수욕장",
      desc: "넓고 깨끗한 백사장이 인기 많은 해변",
      imgUrl: "/images/user1.png",
    },
    {
      reviewRating: 3.9,
      reviewCount: 8,
      place: "태종대",
      desc: "절경과 산책로가 아름다운 명소",
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
      <div className="overflow-hidden bg-white rounded-2xl">
        <SelectMenu2 />

        <div className="grid grid-cols-1 gap-2 p-4">
          {dummyData.map((item, idx) => (
            <PlacePlusItem
              key={idx}
              reviewRating={item.reviewRating}
              reviewCount={item.reviewCount}
              place={item.place}
              desc={item.desc}
              imgUrl={item.imgUrl}
            />
          ))}
        </div>
      </div>
    </>
  );
}

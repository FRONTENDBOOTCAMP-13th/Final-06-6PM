"use client";

import { CalendarDays, LayoutList, MapPin } from "lucide-react";
import { useState } from "react";
import ViewItem, { ViewItemProps } from "./viewItem";

export default function SelectReview() {
  const [tab, setTab] = useState(0);

  const reviewAll: ViewItemProps[] = [
    {
      title: "경주 역사 탐방",
      userName: "나는문어",
      userImgURL: "/images/user1.png",
      location: "경주 불국사",
      content: "천년의 고도 경주에서 역사의 숨결을 느꼈어요.",
      contentImg: ["/images/user2.png"],
      reviewRating: 4.7,
      tags: ["역사", "문화", "사찰"],
      views: 150,
      likes: 60,
      comments: 10,
      visitDate: "2025-07-15",
      regdate: "2025-07-16",
    },
    {
      title: "서울 야경 드라이브",
      userName: "나는문어",
      userImgURL: "/images/user1.png",
      location: "남산타워",
      content: "서울의 야경은 언제 봐도 로맨틱해요.",
      contentImg: ["/images/user4.png", "/images/user5.png"],
      reviewRating: 4.3,
      tags: ["야경", "드라이브", "서울"],
      views: 230,
      likes: 85,
      comments: 14,
      visitDate: "2025-07-12",
      regdate: "2025-07-13",
    },
  ];

  const reviewDaily: ViewItemProps[] = [
    {
      title: "동네 산책의 소소한 행복",
      userName: "나는문어",
      userImgURL: "/images/user1.png",
      location: "서울 성수동",
      content: "평범한 하루, 골목길에서 마주한 예쁜 카페",
      contentImg: [],
      reviewRating: 4.0,
      tags: ["일상", "카페", "산책"],
      views: 60,
      likes: 15,
      comments: 3,
      visitDate: "2025-07-18",
      regdate: "2025-07-18",
    },
  ];

  const reviewPlace: ViewItemProps[] = [
    {
      title: "제주도의 숨은 명소",
      userName: "나는문어",
      userImgURL: "/images/user1.png",
      location: "제주 월정리 해변",
      content: "사람이 적고 조용해서 힐링하기 최고였어요.",
      contentImg: ["/images/user5.png"],
      reviewRating: 5.0,
      tags: ["제주", "힐링", "바다"],
      views: 95,
      likes: 40,
      comments: 5,
      visitDate: "2025-07-08",
      regdate: "2025-07-09",
    },
    {
      title: "강릉 커피 거리 탐방",
      userName: "나는문어",
      userImgURL: "/images/user1.png",
      location: "강릉 안목해변",
      content: "바다를 보며 마시는 커피는 역시 최고!",
      contentImg: ["/images/posts/gangneung1.jpg", "/images/posts/gangneung2.jpg"],
      reviewRating: 4.6,
      tags: ["강릉", "커피", "바다뷰"],
      views: 110,
      likes: 55,
      comments: 7,
      visitDate: "2025-07-05",
      regdate: "2025-07-06",
    },
  ];

  const tabData = [
    {
      id: 0,
      title: "일정전체",
      icon: <LayoutList className="w-[1.25rem] h-[1.25rem]" />,
      description: reviewAll,
    },
    {
      id: 1,
      title: "일자별",
      icon: <CalendarDays className="w-[1.25rem] h-[1.25rem]" />,
      description: reviewDaily,
    },
    {
      id: 2,
      title: "장소별",
      icon: <MapPin className="w-[1.25rem] h-[1.25rem]" />,
      description: reviewPlace,
    },
  ];

  return (
    <div>
      <div className="grid grid-cols-3 divide-x divide-travel-gray100">
        {tabData.map((item) => (
          <div
            key={item.id}
            className={`text-14 flex flex-col items-center p-1.5 gap-1.5 cursor-pointer ${
              tab === item.id
                ? "text-white bg-travel-secondary100  border-b border-b-travel-secondary200"
                : "text-travel-gray400 bg-white border-b border-b-travel-gray200"
            }`}
            onClick={() => setTab(item.id)}
          >
            {item.icon}
            <span>{item.title}</span>
          </div>
        ))}
      </div>

      <div className="space-y-4 p-4">
        {tabData[tab].description.map((item, idx) => (
          <ViewItem
            key={idx} {...item}
          />
        ))}
      </div>
    </div>
  );
}

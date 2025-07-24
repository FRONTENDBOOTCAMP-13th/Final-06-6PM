export interface Destination {
  areaCode: number;
  name: string;
  image: string;
  keywords?: string[];
}

export const destinationList: Destination[] = [
  {
    areaCode: 1,
    name: "서울",
    image: "/images/destinations/seoul.webp",
  },
  {
    areaCode: 2,
    name: "인천",
    image: "/images/destinations/incheon.jpg",
  },
  {
    areaCode: 3,
    name: "대전",
    image: "/images/destinations/daejeon.jpg",
  },
  {
    areaCode: 4,
    name: "대구",
    image: "/images/destinations/daegu.jpg",
  },
  {
    areaCode: 5,
    name: "광주",
    image: "/images/destinations/gwangju.webp",
  },
  {
    areaCode: 6,
    name: "부산",
    image: "/images/destinations/busan.webp",
  },
  {
    areaCode: 7,
    name: "울산",
    image: "/images/destinations/ulsan.webp",
  },
  {
    areaCode: 8,
    name: "세종특별자치시",
    image: "/images/destinations/sejong.webp",
  },
  {
    areaCode: 9,
    name: "경기도",
    image: "/images/destinations/gyeonggi.webp",
    keywords: [
      "수원",
      "성남",
      "안양",
      "부천",
      "광명",
      "평택",
      "동두천",
      "안산",
      "고양",
      "과천",
      "구리",
      "남양주",
      "오산",
      "시흥",
      "군포",
      "의왕",
      "하남",
      "용인",
      "파주",
      "이천",
      "안성",
      "김포",
      "화성",
      "광주",
      "양주",
      "포천",
      "의정부",
    ],
  },
  {
    areaCode: 10,
    name: "강원특별자치도",
    image: "/images/destinations/gangwon.webp",
    keywords: ["춘천", "원주", "강릉", "동해", "태백", "속초", "삼척"],
  },
  {
    areaCode: 11,
    name: "충청북도",
    image: "/images/destinations/chungbuk.webp",
    keywords: ["청주", "충주", "제천"],
  },
  {
    areaCode: 12,
    name: "충청남도",
    image: "/images/destinations/chungnam.webp",
    keywords: ["천안", "공주", "보령", "아산", "서산", "논산", "계룡", "당진"],
  },
  {
    areaCode: 13,
    name: "경상북도",
    image: "/images/destinations/gyeongbuk.webp",
    keywords: [
      "포항",
      "경주",
      "김천",
      "안동",
      "구미",
      "영주",
      "영천",
      "상주",
      "문경",
      "경산",
    ],
  },
  {
    areaCode: 14,
    name: "경상남도",
    image: "/images/destinations/gyeongnam.webp",
    keywords: ["창원", "진주", "통영", "사천", "김해", "밀양", "거제", "양산"],
  },
  {
    areaCode: 15,
    name: "전북특별자치도",
    image: "/images/destinations/jeonbuk.webp",
    keywords: ["전주", "군산", "익산", "정읍", "남원", "김제"],
  },
  {
    areaCode: 16,
    name: "전라남도",
    image: "/images/destinations/jeonnam.webp",
    keywords: ["목포", "여수", "순천", "나주", "광양"],
  },
  {
    areaCode: 17,
    name: "제주도",
    image: "/images/destinations/jeju.webp",
    keywords: ["제주", "서귀포"],
  },
];

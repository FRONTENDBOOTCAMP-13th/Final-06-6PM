import dayjs from "dayjs";

function getTime(day = 0, second = 0) {
  return dayjs()
    .add(day, "days")
    .add(second, "seconds")
    .format("YYYY.MM.DD HH:mm:ss");
}

export const initData = async (clientId, nextSeq) => {
  return {
    // 회원
    user: [
      {
        _id: await nextSeq("user"),
        email: "admin@market.com",
        password:
          "$2b$10$S.8GNMDyvUF0xzujPtHBu.j5gtS19.OhRmYbpJBnCHg2S83WLx1T2",
        name: "문서인",
        address: "서울시 강남구 역삼동 123",
        type: "admin",
        loginType: "email",
        image: `/files/${clientId}/user-muzi.png`,
        createdAt: getTime(-100, -60 * 60 * 3),
        updatedAt: getTime(-100, -60 * 60 * 3),
      },
      {
        _id: await nextSeq("user"),
        email: "  u1@market.com",
        password:
          "$2b$10$S.8GNMDyvUF0xzujPtHBu.j5gtS19.OhRmYbpJBnCHg2S83WLx1T2",
        name: "박선영",
        address: "서울시 강남구 삼성동 456",
        type: "user",
        loginType: "email",
        image: `/files/${clientId}/user-neo.png`,
        createdAt: getTime(-50),
        updatedAt: getTime(-30, -60 * 60 * 3),
      },
      {
        _id: await nextSeq("user"),
        email: "u3@market.com",
        password:
          "$2b$10$S.8GNMDyvUF0xzujPtHBu.j5gtS19.OhRmYbpJBnCHg2S83WLx1T2",
        name: "차형주",
        address: "서울시 강남구 삼성동 456",
        type: "user",
        loginType: "email",
        image: `/files/${clientId}/user-neo.png`,
        createdAt: getTime(-50),
        updatedAt: getTime(-30, -60 * 60 * 3),
      },
      {
        _id: await nextSeq("user"),
        email: "u2@market.com",
        password:
          "$2b$10$S.8GNMDyvUF0xzujPtHBu.j5gtS19.OhRmYbpJBnCHg2S83WLx1T2",
        name: "송아현",
        address: "서울시 강남구 삼성동 456",
        type: "user",
        loginType: "email",
        image: `/files/${clientId}/user-neo.png`,
        createdAt: getTime(-50),
        updatedAt: getTime(-30, -60 * 60 * 3),
      },
      {
        _id: await nextSeq("user"),
        email: "u4@market.com",
        password:
          "$2b$10$S.8GNMDyvUF0xzujPtHBu.j5gtS19.OhRmYbpJBnCHg2S83WLx1T2",
        name: "남주성",
        address: "서울시 강남구 삼성동 456",
        type: "user",
        loginType: "email",
        image: `/files/${clientId}/user-neo.png`,
        createdAt: getTime(-50),
        updatedAt: getTime(-30, -60 * 60 * 3),
      },
    ],

    // 상품
    product: [],

    // 주문
    order: [],

    // 후기
    review: [],

    // 장바구니
    cart: [],

    // 즐겨찾기/북마크
    bookmark: [],

    // QnA, 공지사항 등의 게시판
    post: [
      //1박2일
      {
        _id: await nextSeq("post"),
        type: "plan",
        views: 23,
        user: {
          _id: 1,
          name: "문서인",
          image: `/files/${clientId}/user-neo.png`,
        },
        title: "서울 1박 2일",
        createdAt: getTime(-30, -60 * 60 * 12),
        updatedAt: getTime(-28, -60 * 60 * 5),
        extra: {
          startDate: "2025-06-25",
          endDate: "2025-06-26",
        },
        replies: [
          {
            _id: await nextSeq("reply"),
            content: "1일차",
            day: 1,
            planDate: "2025-06-25",
            locations: [
              {
                title: "경복궁",
                types: "관광지",
                contentId: "126508",
                mapx: "126.9769",
                mapy: "37.5758",
              },
              {
                title: "북촌한옥마을",
                types: "관광지",
                contentId: "126049",
                mapx: "126.9849",
                mapy: "37.5814",
              },
              {
                title: "인사동",
                types: "관광지",
                contentId: "126592",
                mapx: "126.9858",
                mapy: "37.5717",
              },
            ],
          },
          {
            _id: await nextSeq("reply"),
            content: "2일차",
            day: 2,
            planDate: "2025-06-26",
            locations: [
              {
                title: "여의도 한강공원",
                types: "관광지",
                contentId: "126545",
                mapx: "127.0096",
                mapy: "37.5298",
              },
              {
                title: "명동",
                types: "관광지",
                contentId: "126288",
                mapx: "126.9840",
                mapy: "37.5636",
              },
              {
                title: "남산서울타워",
                types: "관광지",
                contentId: "126289",
                mapx: "126.9881",
                mapy: "37.5512",
              },
            ],
          },
        ],
      },

      {
        _id: await nextSeq("post"),
        type: "plan",
        views: 213,
        user: {
          _id: 2,
          name: "박선영",
          image: `/files/${clientId}/user-neo.png`,
        },
        title: "부산 1박 2일",
        createdAt: getTime(-2, -60 * 60 * 12),
        updatedAt: getTime(-1, -60 * 60 * 14),
        extra: {
          startDate: "2025-07-25",
          endDate: "2025-07-26",
        },
        replies: [
          {
            _id: await nextSeq("reply"),
            content: "1일차",
            day: 1,
            planDate: "2025-07-25",
            locations: [
              {
                title: "해운대해수욕장",
                types: "관광지",
                contentId: "",
                mapx: "",
                mapy: "",
              },
              {
                title: "감천문화마을",
                types: "관광지",
                contentId: "",
                mapx: "",
                mapy: "",
              },
              {
                title: "부산타워",
                types: "관광지",
                contentId: "",
                mapx: "",
                mapy: "",
              },
            ],
          },
          {
            _id: await nextSeq("reply"),
            content: "2일차",
            day: 2,
            planDate: "2025-07-26",
            locations: [
              {
                title: "광안리해수욕장",
                types: "관광지",
                contentId: "",
                mapx: "",
                mapy: "",
              },
              {
                title: "용두산공원",
                types: "관광지",
                contentId: "",
                mapx: "",
                mapy: "",
              },
              {
                title: "오륙도 스카이워크",
                types: "관광지",
                contentId: "",
                mapx: "",
                mapy: "",
              },
            ],
          },
        ],
      },

      {
        _id: await nextSeq("post"),
        type: "plan",
        views: 72,
        user: {
          _id: 3,
          name: "차형주",
          image: `/files/${clientId}/user-neo.png`,
        },
        title: "경주 1박 2일",
        createdAt: getTime(-35, -60 * 60 * 10),
        updatedAt: getTime(-33, -60 * 60 * 3),
        extra: {
          startDate: "2025-06-20",
          endDate: "2025-06-21",
        },
        replies: [
          {
            _id: await nextSeq("reply"),
            content: "1일차",
            day: 1,
            planDate: "2025-06-20",
            locations: [
              {
                title: "경주 불국사",
                types: "관광지",
                contentId: "",
                mapx: "",
                mapy: "",
              },
              {
                title: "경주 석굴암",
                types: "관광지",
                contentId: "",
                mapx: "",
                mapy: "",
              },
              {
                title: "경주 첨성대",
                types: "관광지",
                contentId: "",
                mapx: "",
                mapy: "",
              },
              {
                title: "경주국립박물관",
                types: "관광지",
                contentId: "",
                mapx: "",
                mapy: "",
              },
            ],
          },
          {
            _id: await nextSeq("reply"),
            content: "2일차",
            day: 2,
            planDate: "2025-06-21",
            locations: [
              {
                title: "경주 대릉원 일원",
                types: "관광지",
                contentId: "",
                mapx: "",
                mapy: "",
              },
              {
                title: "경주 황리단길",
                types: "관광지",
                contentId: "",
                mapx: "",
                mapy: "",
              },
              {
                title: "경주 포석정지",
                types: "관광지",
                contentId: "",
                mapx: "",
                mapy: "",
              },
              {
                title: "경주 교촌마을",
                types: "관광지",
                contentId: "",
                mapx: "",
                mapy: "",
              },
            ],
          },
        ],
      },

      //2박3일
      {
        _id: await nextSeq("post"),
        type: "plan",
        views: 85,
        user: {
          _id: 4,
          name: "송아현",
          image: `/files/${clientId}/user-neo.png`,
        },
        title: "울산 2박 3일",
        createdAt: getTime(-1, -60 * 60 * 9),
        updatedAt: getTime(0, -60 * 60 * 5),
        extra: {
          startDate: "2025-08-03",
          endDate: "2025-08-05",
        },
        replies: [
          {
            _id: await nextSeq("reply"),
            content: "1일차",
            day: 1,
            planDate: "2025-08-03",
            locations: [
              {
                title: "대왕암공원",
                types: "관광지",
                contentId: "",
                mapx: "",
                mapy: "",
              },
              {
                title: "울산대공원",
                types: "관광지",
                contentId: "",
                mapx: "",
                mapy: "",
              },
              {
                title: "울산박물관",
                types: "관광지",
                contentId: "",
                mapx: "",
                mapy: "",
              },
            ],
          },
          {
            _id: await nextSeq("reply"),
            content: "2일차",
            day: 2,
            planDate: "2025-08-04",
            locations: [
              {
                title: "간절곶",
                types: "관광지",
                contentId: "",
                mapx: "",
                mapy: "",
              },
              {
                title: "태화강 국가정원",
                types: "관광지",
                contentId: "",
                mapx: "",
                mapy: "",
              },
              {
                title: "울산암각화박물관",
                types: "관광지",
                contentId: "",
                mapx: "",
                mapy: "",
              },
            ],
          },
          {
            _id: await nextSeq("reply"),
            content: "3일차",
            day: 3,
            planDate: "2025-08-05",
            locations: [
              {
                title: "반구대 암각화",
                types: "관광지",
                contentId: "",
                mapx: "",
                mapy: "",
              },
              {
                title: "장생포 고래문화마을",
                types: "관광지",
                contentId: "",
                mapx: "",
                mapy: "",
              },
              {
                title: "진하해수욕장",
                types: "관광지",
                contentId: "",
                mapx: "",
                mapy: "",
              },
            ],
          },
        ],
      },

      {
        _id: await nextSeq("post"),
        type: "plan",
        views: 513,
        user: {
          _id: 5,
          name: "남주성",
          image: `/files/${clientId}/user-neo.png`,
        },
        title: "강원도 2박 3일",
        createdAt: getTime(-28, -60 * 60 * 11),
        updatedAt: getTime(-26, -60 * 60 * 6),
        extra: {
          startDate: "2025-06-30",
          endDate: "2025-07-02",
        },
        replies: [
          {
            _id: await nextSeq("reply"),
            content: "1일차",
            day: 1,
            planDate: "2025-06-30",
            locations: [
              {
                title: "삼탄아트마인",
                types: "관광지",
                contentId: "",
                mapx: "",
                mapy: "",
              },
              {
                title: "화암동굴",
                types: "관광지",
                contentId: "",
                mapx: "",
                mapy: "",
              },
              {
                title: "만항재",
                types: "관광지",
                contentId: "",
                mapx: "",
                mapy: "",
              },
            ],
          },
          {
            _id: await nextSeq("reply"),
            content: "2일차",
            day: 2,
            planDate: "2025-07-01",
            locations: [
              {
                title: "매봉산풍력발전단지(바람의 언덕)",
                types: "관광지",
                contentId: "",
                mapx: "",
                mapy: "",
              },
              {
                title: "태백 고생대 자연사박물관",
                types: "관광지",
                contentId: "",
                mapx: "",
                mapy: "",
              },
              {
                title: "장호항방파제",
                types: "관광지",
                contentId: "",
                mapx: "",
                mapy: "",
              },
            ],
          },
          {
            _id: await nextSeq("reply"),
            content: "3일차",
            day: 3,
            planDate: "2025-07-02",
            locations: [
              {
                title: "장호해수욕장(장호항, 장호해변)",
                types: "관광지",
                contentId: "",
                mapx: "",
                mapy: "",
              },
              {
                title: "삼척 죽서루",
                types: "관광지",
                contentId: "",
                mapx: "",
                mapy: "",
              },
              {
                title: "이사부길(새천년해안도로)",
                types: "관광지",
                contentId: "",
                mapx: "",
                mapy: "",
              },
            ],
          },
        ],
      },

      {
        _id: await nextSeq("post"),
        type: "plan",
        views: 612,
        user: {
          _id: 1,
          name: "문서인",
          image: `/files/${clientId}/user-neo.png`,
        },
        title: "경상남도 2박 3일",
        createdAt: getTime(-2, -60 * 60 * 10),
        updatedAt: getTime(0, -60 * 60 * 2),
        extra: {
          startDate: "2025-08-15",
          endDate: "2025-08-17",
        },
        replies: [
          {
            _id: await nextSeq("reply"),
            content: "1일차",
            day: 1,
            planDate: "2025-08-15",
            locations: [
              {
                title: "용지공원(용지문화공원)",
                types: "관광지",
                contentId: "",
                mapx: "",
                mapy: "",
              },
              {
                title: "경남도립미술관",
                types: "관광지",
                contentId: "",
                mapx: "",
                mapy: "",
              },
              {
                title: "창원의 집",
                types: "관광지",
                contentId: "",
                mapx: "",
                mapy: "",
              },
              {
                title: "외도 보타니아",
                types: "관광지",
                contentId: "",
                mapx: "",
                mapy: "",
              },
            ],
          },
          {
            _id: await nextSeq("reply"),
            content: "2일차",
            day: 2,
            planDate: "2025-08-16",
            locations: [
              {
                title: "동피랑마을",
                types: "관광지",
                contentId: "",
                mapx: "",
                mapy: "",
              },
              {
                title: "통영케이블카",
                types: "관광지",
                contentId: "",
                mapx: "",
                mapy: "",
              },
              {
                title: "해저터널(통영)",
                types: "관광지",
                contentId: "",
                mapx: "",
                mapy: "",
              },
            ],
          },
          {
            _id: await nextSeq("reply"),
            content: "3일차",
            day: 3,
            planDate: "2025-08-17",
            locations: [
              {
                title: "남해독일마을",
                types: "관광지",
                contentId: "",
                mapx: "",
                mapy: "",
              },
              {
                title: "원예예술촌",
                types: "관광지",
                contentId: "",
                mapx: "",
                mapy: "",
              },
              {
                title: "가천 다랭이마을",
                types: "관광지",
                contentId: "",
                mapx: "",
                mapy: "",
              },
              {
                title: "금산 보리암(남해)",
                types: "관광지",
                contentId: "",
                mapx: "",
                mapy: "",
              },
            ],
          },
        ],
      },

      //3박4일
      {
        _id: await nextSeq("post"),
        type: "plan",
        views: 75,
        user: {
          _id: 2,
          name: "박선영",
          image: `/files/${clientId}/user-neo.png`,
        },
        title: "전주 3박 4일",
        createdAt: getTime(-40, -60 * 60 * 15),
        updatedAt: getTime(-38, -60 * 60 * 6),
        extra: {
          startDate: "2025-06-15",
          endDate: "2025-06-18",
        },
        replies: [
          {
            _id: await nextSeq("reply"),
            content: "1일차",
            day: 1,
            planDate: "2025-06-15",
            locations: [
              {
                title: "전북 전주 한옥마을 [슬로시티]",
                types: "관광지",
                contentId: "",
                mapx: "",
                mapy: "",
              },
              {
                title: "경기전",
                types: "관광지",
                contentId: "",
                mapx: "",
                mapy: "",
              },
              {
                title: "전주전동성당",
                types: "관광지",
                contentId: "",
                mapx: "",
                mapy: "",
              },
              {
                title: "전주 풍남문",
                types: "관광지",
                contentId: "",
                mapx: "",
                mapy: "",
              },
              {
                title: "오목대와 이목대",
                types: "관광지",
                contentId: "",
                mapx: "",
                mapy: "",
              },
            ],
          },
          {
            _id: await nextSeq("reply"),
            content: "2일차",
            day: 2,
            planDate: "2025-06-16",
            locations: [
              {
                title: "전주향교",
                types: "관광지",
                contentId: "",
                mapx: "",
                mapy: "",
              },
              {
                title: "전주공예품전시관",
                types: "관광지",
                contentId: "",
                mapx: "",
                mapy: "",
              },
              {
                title: "전주전통한지원",
                types: "관광지",
                contentId: "",
                mapx: "",
                mapy: "",
              },
              {
                title: "전주 남부시장",
                types: "관광지",
                contentId: "",
                mapx: "",
                mapy: "",
              },
              {
                title: "자만마을 벽화갤러리",
                types: "관광지",
                contentId: "",
                mapx: "",
                mapy: "",
              },
            ],
          },
          {
            _id: await nextSeq("reply"),
            content: "3일차",
            day: 3,
            planDate: "2025-06-17",
            locations: [
              {
                title: "완산공원",
                types: "관광지",
                contentId: "",
                mapx: "",
                mapy: "",
              },
              {
                title: "덕진공원",
                types: "관광지",
                contentId: "",
                mapx: "",
                mapy: "",
              },
              {
                title: "전주동물원",
                types: "관광지",
                contentId: "",
                mapx: "",
                mapy: "",
              },
              {
                title: "전북대학교 문회루",
                types: "관광지",
                contentId: "",
                mapx: "",
                mapy: "",
              },
            ],
          },
          {
            _id: await nextSeq("reply"),
            content: "4일차",
            day: 4,
            planDate: "2025-06-18",
            locations: [
              {
                title: "삼례문화예술촌",
                types: "관광지",
                contentId: "",
                mapx: "",
                mapy: "",
              },
              {
                title: "전주 풍남문",
                types: "관광지",
                contentId: "",
                mapx: "",
                mapy: "",
              },
              {
                title: "팔복예술공장",
                types: "관광지",
                contentId: "",
                mapx: "",
                mapy: "",
              },
            ],
          },
        ],
      },

      {
        _id: await nextSeq("post"),
        type: "plan",
        views: 96,
        user: {
          _id: 3,
          name: "차형주",
          image: `/files/${clientId}/user-neo.png`,
        },
        title: "대구 3박 4일",
        createdAt: getTime(-3, -60 * 60 * 13),
        updatedAt: getTime(-2, -60 * 60 * 7),
        extra: {
          startDate: "2025-09-01",
          endDate: "2025-09-04",
        },
        replies: [
          {
            _id: await nextSeq("reply"),
            content: "1일차",
            day: 1,
            planDate: "2025-09-01",
            locations: [
              {
                title: "김광석다시그리기길",
                types: "관광지",
                contentId: "",
                mapx: "",
                mapy: "",
              },
              {
                title: "대구 서문시장",
                types: "관광지",
                contentId: "",
                mapx: "",
                mapy: "",
              },
              {
                title: "대구향교",
                types: "관광지",
                contentId: "",
                mapx: "",
                mapy: "",
              },
              {
                title: "대구 약령시 한의약박물관",
                types: "관광지",
                contentId: "",
                mapx: "",
                mapy: "",
              },
            ],
          },
          {
            _id: await nextSeq("reply"),
            content: "2일차",
            day: 2,
            planDate: "2025-09-02",
            locations: [
              {
                title: "팔공산국립공원(동화사지구)",
                types: "관광지",
                contentId: "",
                mapx: "",
                mapy: "",
              },
              {
                title: "팔공산하늘정원",
                types: "관광지",
                contentId: "",
                mapx: "",
                mapy: "",
              },
              {
                title: "대구시민안전테마파크",
                types: "관광지",
                contentId: "",
                mapx: "",
                mapy: "",
              },
            ],
          },
          {
            _id: await nextSeq("reply"),
            content: "3일차",
            day: 3,
            planDate: "2025-09-03",
            locations: [
              {
                title: "이월드 83타워",
                types: "관광지",
                contentId: "",
                mapx: "",
                mapy: "",
              },
              {
                title: "대구두류공원",
                types: "관광지",
                contentId: "",
                mapx: "",
                mapy: "",
              },
              {
                title: "대구수목원",
                types: "관광지",
                contentId: "",
                mapx: "",
                mapy: "",
              },
              {
                title: "봉산문화거리",
                types: "관광지",
                contentId: "",
                mapx: "",
                mapy: "",
              },
            ],
          },
          {
            _id: await nextSeq("reply"),
            content: "4일차",
            day: 4,
            planDate: "2025-09-04",
            locations: [
              {
                title: "수성못상화동산",
                types: "관광지",
                contentId: "",
                mapx: "",
                mapy: "",
              },
              {
                title: "디아크문화관",
                types: "관광지",
                contentId: "",
                mapx: "",
                mapy: "",
              },
              {
                title: "호림강나루공원(호림공원)",
                types: "관광지",
                contentId: "",
                mapx: "",
                mapy: "",
              },
            ],
          },
        ],
      },

      {
        _id: await nextSeq("post"),
        type: "plan",
        views: 186,
        user: {
          _id: 4,
          name: "송아현",
          image: `/files/${clientId}/user-neo.png`,
        },
        title: "부산 3박 4일",
        createdAt: getTime(-33, -60 * 60 * 14),
        updatedAt: getTime(-31, -60 * 60 * 5),
        extra: {
          startDate: "2025-06-22",
          endDate: "2025-06-25",
        },
        replies: [
          {
            _id: await nextSeq("reply"),
            content: "1일차",
            day: 1,
            planDate: "2025-06-22",
            locations: [
              {
                title: "흰여울문화마을",
                types: "관광지",
                contentId: "",
                mapx: "",
                mapy: "",
              },
              {
                title: "영도 하늘전망대",
                types: "관광지",
                contentId: "",
                mapx: "",
                mapy: "",
              },
              {
                title: "태종대",
                types: "관광지",
                contentId: "",
                mapx: "",
                mapy: "",
              },
              {
                title: "국제시장 먹자골목",
                types: "관광지",
                contentId: "",
                mapx: "",
                mapy: "",
              },
            ],
          },
          {
            _id: await nextSeq("reply"),
            content: "2일차",
            day: 2,
            planDate: "2025-06-23",
            locations: [
              {
                title: "부산시민공원",
                types: "관광지",
                contentId: "",
                mapx: "",
                mapy: "",
              },
              {
                title: "광안리 SUP Zone",
                types: "관광지",
                contentId: "",
                mapx: "",
                mapy: "",
              },
              {
                title: "해운대해수욕장",
                types: "관광지",
                contentId: "",
                mapx: "",
                mapy: "",
              },
              {
                title: "씨라이프부산아쿠아리움",
                types: "관광지",
                contentId: "",
                mapx: "",
                mapy: "",
              },
            ],
          },
          {
            _id: await nextSeq("reply"),
            content: "3일차",
            day: 3,
            planDate: "2025-06-24",
            locations: [
              {
                title: "부산타워",
                types: "관광지",
                contentId: "",
                mapx: "",
                mapy: "",
              },
              {
                title: "용두산공원",
                types: "관광지",
                contentId: "",
                mapx: "",
                mapy: "",
              },
              {
                title: "BIFF 광장",
                types: "관광지",
                contentId: "",
                mapx: "",
                mapy: "",
              },
              {
                title: "감천문화마을",
                types: "관광지",
                contentId: "",
                mapx: "",
                mapy: "",
              },
            ],
          },
          {
            _id: await nextSeq("reply"),
            content: "4일차",
            day: 4,
            planDate: "2025-06-25",
            locations: [
              {
                title: "부산 송도해상케이블카",
                types: "관광지",
                contentId: "",
                mapx: "",
                mapy: "",
              },
              {
                title: "해운대 동백섬",
                types: "관광지",
                contentId: "",
                mapx: "",
                mapy: "",
              },
              {
                title: "누리마루 APEC하우스",
                types: "관광지",
                contentId: "",
                mapx: "",
                mapy: "",
              },
              {
                title: "해동용궁사",
                types: "관광지",
                contentId: "",
                mapx: "",
                mapy: "",
              },
            ],
          },
        ],
      },

      //4박5일
      {
        _id: await nextSeq("post"),
        type: "plan",
        views: 265,
        user: {
          _id: 5,
          name: "남주성",
          image: `/files/${clientId}/user-neo.png`,
        },
        title: "강릉 4박 5일",
        createdAt: getTime(-5, -60 * 60 * 15),
        updatedAt: getTime(-4, -60 * 60 * 6),
        extra: {
          startDate: "2025-08-25",
          endDate: "2025-08-29",
        },
        replies: [
          {
            _id: await nextSeq("reply"),
            content: "1일차",
            day: 1,
            planDate: "2025-08-25",
            locations: [
              {
                title: "강릉 오죽헌",
                types: "관광지",
                contentId: "",
                mapx: "",
                mapy: "",
              },
              {
                title: "경포해수욕장",
                types: "관광지",
                contentId: "",
                mapx: "",
                mapy: "",
              },
              {
                title: "경포호수광장",
                types: "관광지",
                contentId: "",
                mapx: "",
                mapy: "",
              },
            ],
          },
          {
            _id: await nextSeq("reply"),
            content: "2일차",
            day: 2,
            planDate: "2025-08-26",
            locations: [
              {
                title: "강릉 경포대",
                types: "관광지",
                contentId: "",
                mapx: "",
                mapy: "",
              },
              {
                title: "강릉 솔향수목원",
                types: "관광지",
                contentId: "",
                mapx: "",
                mapy: "",
              },
              {
                title: "정동진 레일바이크",
                types: "관광지",
                contentId: "",
                mapx: "",
                mapy: "",
              },
              {
                title: "정동심곡 바다부채길",
                types: "관광지",
                contentId: "",
                mapx: "",
                mapy: "",
              },
            ],
          },
          {
            _id: await nextSeq("reply"),
            content: "3일차",
            day: 3,
            planDate: "2025-08-27",
            locations: [
              {
                title: "강릉 선교장",
                types: "관광지",
                contentId: "",
                mapx: "",
                mapy: "",
              },
              {
                title: "강릉커피거리",
                types: "관광지",
                contentId: "",
                mapx: "",
                mapy: "",
              },
              {
                title: "모래시계공원",
                types: "관광지",
                contentId: "",
                mapx: "",
                mapy: "",
              },
            ],
          },
          {
            _id: await nextSeq("reply"),
            content: "4일차",
            day: 4,
            planDate: "2025-08-28",
            locations: [
              {
                title: "강릉 올림픽파크",
                types: "관광지",
                contentId: "",
                mapx: "",
                mapy: "",
              },
              {
                title: "연곡해변(연곡해수욕장)",
                types: "관광지",
                contentId: "",
                mapx: "",
                mapy: "",
              },
              {
                title: "임해자연휴양림",
                types: "관광지",
                contentId: "",
                mapx: "",
                mapy: "",
              },
            ],
          },
          {
            _id: await nextSeq("reply"),
            content: "5일차",
            day: 5,
            planDate: "2025-08-29",
            locations: [
              {
                title: "솔향명품SHOP",
                types: "관광지",
                contentId: "",
                mapx: "",
                mapy: "",
              },
              {
                title: "국립대관령치유의숲",
                types: "관광지",
                contentId: "",
                mapx: "",
                mapy: "",
              },
              {
                title: "대관령양떼목장",
                types: "관광지",
                contentId: "",
                mapx: "",
                mapy: "",
              },
            ],
          },
        ],
      },

      {
        _id: await nextSeq("post"),
        type: "plan",
        views: 489,
        user: {
          _id: 1,
          name: "문서인",
          image: `/files/${clientId}/user-neo.png`,
        },
        title: "대전 4박 5일",
        createdAt: getTime(-45, -60 * 60 * 12),
        updatedAt: getTime(-43, -60 * 60 * 3),
        extra: {
          startDate: "2025-06-10",
          endDate: "2025-06-14",
        },
        replies: [
          {
            _id: await nextSeq("reply"),
            content: "1일차",
            day: 1,
            planDate: "2025-06-10",
            locations: [
              {
                title: "대전엑스포과학공원",
                types: "관광지",
                contentId: "",
                mapx: "",
                mapy: "",
              },
              {
                title: "한밭수목원",
                types: "관광지",
                contentId: "",
                mapx: "",
                mapy: "",
              },
              {
                title: "장태산자연휴양림",
                types: "관광지",
                contentId: "",
                mapx: "",
                mapy: "",
              },
            ],
          },
          {
            _id: await nextSeq("reply"),
            content: "2일차",
            day: 2,
            planDate: "2025-06-11",
            locations: [
              {
                title: "대전문학관",
                types: "관광지",
                contentId: "",
                mapx: "",
                mapy: "",
              },
              {
                title: "서대전공원",
                types: "관광지",
                contentId: "",
                mapx: "",
                mapy: "",
              },
              {
                title: "대전오월드",
                types: "관광지",
                contentId: "",
                mapx: "",
                mapy: "",
              },
            ],
          },
          {
            _id: await nextSeq("reply"),
            content: "3일차",
            day: 3,
            planDate: "2025-06-12",
            locations: [
              {
                title: "국립중앙과학관",
                types: "관광지",
                contentId: "",
                mapx: "",
                mapy: "",
              },
              {
                title: "계족산 황톳길",
                types: "관광지",
                contentId: "",
                mapx: "",
                mapy: "",
              },
              {
                title: "대전 엑스포 아쿠아리움",
                types: "관광지",
                contentId: "",
                mapx: "",
                mapy: "",
              },
            ],
          },
          {
            _id: await nextSeq("reply"),
            content: "4일차",
            day: 4,
            planDate: "2025-06-13",
            locations: [
              {
                title: "우암사적공원",
                types: "관광지",
                contentId: "",
                mapx: "",
                mapy: "",
              },
              {
                title: "장태산 자연휴양림 캠핑장",
                types: "관광지",
                contentId: "",
                mapx: "",
                mapy: "",
              },
              {
                title: "유성온천지구",
                types: "관광지",
                contentId: "",
                mapx: "",
                mapy: "",
              },
              {
                title: "대청댐 전망대",
                types: "관광지",
                contentId: "",
                mapx: "",
                mapy: "",
              },
            ],
          },
          {
            _id: await nextSeq("reply"),
            content: "5일차",
            day: 5,
            planDate: "2025-06-14",
            locations: [
              {
                title: "대전근현대사전시관",
                types: "관광지",
                contentId: "",
                mapx: "",
                mapy: "",
              },
              {
                title: "스카이로드",
                types: "관광지",
                contentId: "",
                mapx: "",
                mapy: "",
              },
            ],
          },
        ],
      },

      {
        _id: await nextSeq("post"),
        type: "plan",
        views: 321,
        user: {
          _id: 2,
          name: "박선영",
          image: `/files/${clientId}/user-neo.png`,
        },
        title: "제주도 4박 5일",
        createdAt: getTime(-6, -60 * 60 * 14),
        updatedAt: getTime(-5, -60 * 60 * 5),
        extra: {
          startDate: "2025-09-10",
          endDate: "2025-09-14",
        },
        replies: [
          {
            _id: await nextSeq("reply"),
            content: "1일차",
            day: 1,
            planDate: "2025-09-10",
            locations: [
              {
                title: "제주민속촌",
                types: "관광지",
                contentId: "",
                mapx: "",
                mapy: "",
              },
              {
                title: "용두암",
                types: "관광지",
                contentId: "",
                mapx: "",
                mapy: "",
              },
              {
                title: "이호테우해변",
                types: "관광지",
                contentId: "",
                mapx: "",
                mapy: "",
              },
            ],
          },
          {
            _id: await nextSeq("reply"),
            content: "2일차",
            day: 2,
            planDate: "2025-09-11",
            locations: [
              {
                title: "성산일출봉",
                types: "관광지",
                contentId: "",
                mapx: "",
                mapy: "",
              },
              {
                title: "섭지코지로",
                types: "관광지",
                contentId: "",
                mapx: "",
                mapy: "",
              },
              {
                title: "아쿠아플라넷 제주",
                types: "관광지",
                contentId: "",
                mapx: "",
                mapy: "",
              },
            ],
          },
          {
            _id: await nextSeq("reply"),
            content: "3일차",
            day: 3,
            planDate: "2025-09-12",
            locations: [
              {
                title: "비자림",
                types: "관광지",
                contentId: "",
                mapx: "",
                mapy: "",
              },
              {
                title: "만장굴",
                types: "관광지",
                contentId: "",
                mapx: "",
                mapy: "",
              },
              {
                title: "오설록 티뮤지엄",
                types: "관광지",
                contentId: "",
                mapx: "",
                mapy: "",
              },
            ],
          },
          {
            _id: await nextSeq("reply"),
            content: "4일차",
            day: 4,
            planDate: "2025-09-13",
            locations: [
              {
                title: "협재해수욕장",
                types: "관광지",
                contentId: "",
                mapx: "",
                mapy: "",
              },
              {
                title: "한림공원",
                types: "관광지",
                contentId: "",
                mapx: "",
                mapy: "",
              },
              {
                title: "테디베어뮤지엄 제주",
                types: "관광지",
                contentId: "",
                mapx: "",
                mapy: "",
              },
              {
                title: "송악산둘레길",
                types: "관광지",
                contentId: "",
                mapx: "",
                mapy: "",
              },
            ],
          },
          {
            _id: await nextSeq("reply"),
            content: "5일차",
            day: 5,
            planDate: "2025-09-14",
            locations: [
              {
                title: "중문관광단지",
                types: "관광지",
                contentId: "",
                mapx: "",
                mapy: "",
              },
              {
                title: "천제연폭포",
                types: "관광지",
                contentId: "",
                mapx: "",
                mapy: "",
              },
              {
                title: "주상절리대(대포동지삿개)",
                types: "관광지",
                contentId: "",
                mapx: "",
                mapy: "",
              },
            ],
          },
        ],
      },

      //1박2일 서울all후기
      {
        _id: await nextSeq("post"),
        parent_id: 1,
        type: "reviewAll",
        // reviewDaily
        // reviewPlace
        views: 123,
        user: {
          _id: 1,
          name: "문서인",
          image: `files/${clientId}/user-neo.png`,
        },
        title: "서울의 매력을 다시 느낀 1박 2일",
        content:
          "짧지만 꽉 찬 1박 2일 서울 여행이었어요. 첫날은 경복궁에서 시작했는데, 전통 한복을 입고 돌아다니는 관광객들을 보면서 저도 오랜만에 한국적인 풍경에 흠뻑 빠졌어요. 북촌한옥마을 골목길을 걷는 건 마치 시간여행 같았고, 인사동에서는 전통 공예품도 구경하며 여유를 느꼈습니다. 둘째 날은 여의도 한강공원에서 아침 산책으로 시작했어요. 시원한 강바람 맞으며 자전거 타는 사람들, 돗자리 펴고 휴식하는 모습들까지 정말 평화롭더라고요. 명동에서 쇼핑도 살짝 하고, 남산서울타워에서 야경으로 마무리했어요. 서울의 낮과 밤, 전통과 현대가 공존하는 모습에 다시 한 번 반했습니다.",
        images: [
          `files/${clientId}/user-neo.png`,
          `files/${clientId}/user-neo.png`,
          `files/${clientId}/user-neo.png`,
        ],
        tags: ["서울여행", "도심산책", "전통문화"],
        starRate: 5,
        createdAt: getTime(),
        updatedAt: getTime(),
        extra: {
          startDate: "2025-06-25",
          endDate: "2025-06-26",
        },
        replies: [
          {
            _id: await nextSeq("reply"),
            user: {
              _id: 2,
              name: "박선영",
              image: "user-jayg.webp",
            },
            content: "경복궁 넘 예쁘죠! 저도 한복 입고 가봤어요ㅎㅎ",
            createdAt: getTime(),
            updatedAt: getTime(),
          },
          {
            _id: await nextSeq("reply"),
            user: {
              _id: 3,
              name: "차형주",
              image: "user-jayg.webp",
            },
            content: "서울 야경은 진짜 최고입니다. 남산타워 또 가고 싶다ㅠ",
            createdAt: getTime(),
            updatedAt: getTime(),
          },
        ],
      },
      //1박2일 서울daily후기 1일차, 2일차
      {
        _id: await nextSeq("post"),
        parent_id: 1,
        type: "reviewDaily",
        // reviewDaily
        // reviewPlace
        views: 23,
        user: {
          _id: 1,
          name: "문서인",
          image: `files/${clientId}/user-neo.png`,
        },
        title: "1일차 - 경복궁부터 인사동까지 한옥 감성 여행",
        content:
          "서울 첫날은 전통과 감성이 가득한 하루였어요. 경복궁은 고궁의 위엄을 그대로 느낄 수 있었고, 날씨까지 좋아서 산책하기 정말 좋았어요. 북촌한옥마을은 고요하면서도 따뜻한 분위기가 있었고, 골목골목 다니며 사진도 많이 찍었어요! 인사동에서는 도예 체험도 하고 전통 찻집에서 잠시 쉬면서 하루를 보냈어요. 구경을 잔뜩 해서 하루 종일 발이 아팠지만 마음은 꽉 찬 하루였습니다.",

        starRate: 5,
        createdAt: getTime(),
        updatedAt: getTime(),
        extra: {
          date: "2025-06-25",
          images: [
            `files/${clientId}/user-neo.png`,
            `files/${clientId}/user-neo.png`,
            `files/${clientId}/user-neo.png`,
          ],
          tags: ["경복궁", "북촌한옥마을", "인사동"],
        },
        replies: [
          {
            _id: await nextSeq("reply"),
            user: {
              _id: 2,
              name: "박선영",
              image: "user-jayg.webp",
            },
            content:
              "엄청 걸으셨네요ㄷㄷ!! 그래도 좋은 추억 만드셔서 다행이에요ㅎㅎ",
            createdAt: getTime(),
            updatedAt: getTime(),
          },
          {
            _id: await nextSeq("reply"),
            user: {
              _id: 4,
              name: "송아현",
              image: "user-jayg.webp",
            },
            content: "저도 서울 여행 가보고 싶네요~",
            createdAt: getTime(),
            updatedAt: getTime(),
          },
        ],
      },
      {
        _id: await nextSeq("post"),
        parent_id: 2,
        type: "reviewDaily",
        // reviewDaily
        // reviewPlace
        views: 56,
        user: {
          _id: 1,
          name: "문서인",
          image: `files/${clientId}/user-neo.png`,
        },
        title: "2일차 - 도심 속 자연과 서울의 밤",
        content:
          "여의도 한강공원에서 맞이한 아침은 너무나 평화로웠어요. 오랜만에 만끽하는 힐링 가득한 아침이랄까요? 명동은 엄청 많은 사람들로 북적여서 정신 없었는데 길거리 음식이 너무 맛있었어요ㅎㅎ 마지막으로 남산서울타워에서 본 서울의 야경은 정말 잊지 못할거예요! 짧지만 여운이 긴 여행이었어요.",

        starRate: 5,
        createdAt: getTime(),
        updatedAt: getTime(),
        extra: {
          date: "2025-06-26",
          images: [
            `files/${clientId}/user-neo.png`,
            `files/${clientId}/user-neo.png`,
            `files/${clientId}/user-neo.png`,
          ],
          tags: ["한강공원", "명동", "남산타워"],
        },
        replies: [
          {
            _id: await nextSeq("reply"),
            user: {
              _id: 2,
              name: "박선영",
              image: "user-jayg.webp",
            },
            content: "한강 안 더우셨어요?? 엄청난 체력이시네요!!",
            createdAt: getTime(),
            updatedAt: getTime(),
          },
          {
            _id: await nextSeq("reply"),
            user: {
              _id: 5,
              name: "남주성",
              image: "user-jayg.webp",
            },
            content:
              "저도 남삼타워 야경 보고 싶네요. 조만간 시간 내서 가봐야겠어요.",
            createdAt: getTime(),
            updatedAt: getTime(),
          },
        ],
      },
      //1박2일 서울place후기
      {
        _id: await nextSeq("post"),
        parent_id: 1,
        type: "reviewPlace",
        // reviewDaily
        // reviewPlace
        views: 17,
        user: {
          _id: 1,
          name: "문서인",
          image: `files/${clientId}/user-neo.png`,
        },
        title: "경복궁 - 한국 전통의 아름다움",
        content:
          "경복궁은 여전히 그 위엄과 고즈넉함을 간직하고 있었어요. 날이 좋아서 사진도 정말 잘 나왔고, 해설 들으며 걸으니 더 재밌더라고요. 외국인 친구 데려오면 무조건 추천!",

        starRate: 5,
        createdAt: getTime(),
        updatedAt: getTime(),
        extra: {
          date: "2025-06-25",
          images: [
            `files/${clientId}/user-neo.png`,
            `files/${clientId}/user-neo.png`,
            `files/${clientId}/user-neo.png`,
          ],
          tags: ["경복궁", "고궁", "전통미"],
        },
        replies: [
          {
            _id: await nextSeq("reply"),
            user: {
              _id: 2,
              name: "박선영",
              image: "user-jayg.webp",
            },
            content:
              "외국인 친구 데려가면 진짜 좋아할 것 같아요 역시 경복궁~!!",
            createdAt: getTime(),
            updatedAt: getTime(),
          },
        ],
      },
      {
        _id: await nextSeq("post"),
        parent_id: 2,
        type: "reviewPlace",
        // reviewDaily
        // reviewPlace
        views: 9,
        user: {
          _id: 1,
          name: "문서인",
          image: `files/${clientId}/user-neo.png`,
        },
        title: "북촌한옥마을 - 조용한 골목에서 만나는 서울의 옛 멋",
        content:
          "북촌한옥마을은 언제 가도 늘 조용하고 따뜻한 분위기가 마음을 편안하게 해줘요. 한옥 사이로 난 골목길을 천천히 걷다 보면, 마치 과거로 돌아간 듯한 착각이 들 정도예요. 특히 고요한 아침 시간에 방문하니, 사람도 적고 바람 소리까지 들릴 만큼 차분했어요. 곳곳에 사진 스팟도 많고, 한옥마다 특색 있는 디테일을 구경하는 재미도 쏠쏠했어요. 길 가다 마주친 작은 전통 공방에서는 도자기와 한지공예품을 감상할 수 있었고, 찻집에서 마신 따뜻한 유자차 한 잔이 잊히지 않네요. 관광지이면서도 서울의 본래 얼굴을 만날 수 있는 귀한 곳이에요.",

        starRate: 5,
        createdAt: getTime(),
        updatedAt: getTime(),
        extra: {
          date: "2025-06-25",
          images: [
            `files/${clientId}/user-neo.png`,
            `files/${clientId}/user-neo.png`,
            `files/${clientId}/user-neo.png`,
          ],
          tags: ["한옥", "전통마을", "감성골목"],
        },
        replies: [
          {
            _id: await nextSeq("reply"),
            user: {
              _id: 4,
              name: "송아현",
              image: "user-jayg.webp",
            },
            content: "북촌한옥마을은 한번도 안가봤는데 꼭 가볼게요!",
            createdAt: getTime(-2, -60 * 60 * 10),
            updatedAt: getTime(-2, -60 * 60 * 1),
          },
        ],
      },
      {
        _id: await nextSeq("post"),
        parent_id: 3,
        type: "reviewPlace",
        // reviewDaily
        // reviewPlace,

        views: 53,
        user: {
          _id: 1,
          name: "문서인",
          image: `files/${clientId}/user-neo.png`,
        },
        title: "남산서울타워 - 서울의 야경을 한눈에 담다",
        content:
          "서울의 야경을 제대로 느끼고 싶다면, 남산서울타워는 빼놓을 수 없는 장소예요. 케이블카 타고 올라가는 동안 보이는 서울 시내의 불빛도 낭만적이지만, 타워 전망대에서 내려다보는 전경은 정말 말로 다 못할 정도로 아름다웠어요. 야경 보며 잠시 멍하니 있었는데, 그 시간이 오히려 서울에서 가장 여유로운 순간이었던 것 같아요. 꼭 야간에 방문해보길 추천해요!",

        starRate: 5,
        createdAt: getTime(),
        updatedAt: getTime(),
        extra: {
          date: "2025-06-26",
          images: [
            `files/${clientId}/user-neo.png`,
            `files/${clientId}/user-neo.png`,
            `files/${clientId}/user-neo.png`,
          ],
          tags: ["야경맛집", "남산타워", "서울전망"],
        },
        replies: [
          {
            _id: await nextSeq("reply"),
            user: {
              _id: 2,
              name: "박선영",
              image: "user-jayg.webp",
            },
            content: "남산타워는 역시 야경이죠!!!!",
            createdAt: getTime(),
            updatedAt: getTime(),
          },
          {
            _id: await nextSeq("reply"),
            user: {
              _id: 3,
              name: "차형주",
              image: "user-jayg.webp",
            },
            content:
              "항상 대낮에 다녀왔는데 야경도 꼭 보고 싶어요. 다음엔 밤에 가봐야겠어요.",
            createdAt: getTime(),
            updatedAt: getTime(),
          },
          {
            _id: await nextSeq("reply"),
            user: {
              _id: 5,
              name: "남주성",
              image: "user-jayg.webp",
            },
            content: "타워 주변 맛집도 있나요??.",
            createdAt: getTime(),
            updatedAt: getTime(),
          },
        ],
      },

      //1박2일 경주all후기
      {
        _id: await nextSeq("post"),
        parent_id: 1,
        type: "reviewAll",
        // reviewDaily
        // reviewPlace
        views: 123,
        user: {
          _id: 3,
          name: "차형주",
          image: `files/${clientId}/user-neo.png`,
        },
        title: "경주 1박 2일 여행",
        content:
          "단 1박 2일이었지만, 진짜 옛날로 시간여행 다녀온 느낌이에요! 불국사와 석굴암의 웅장함에 압도됐고, 황리단길은 예상보다 훨씬 세련됐더라고요. 역사와 현대가 자연스럽게 어우러진 도시. 한 번쯤은 꼭 가봐야 할 곳 같아요!",
        images: [
          `files/${clientId}/user-neo.png`,
          `files/${clientId}/user-neo.png`,
          `files/${clientId}/user-neo.png`,
        ],
        tags: ["경주", "역사여행", "불국사"],
        starRate: 5,
        createdAt: getTime(),
        updatedAt: getTime(),
        extra: {
          startDate: "2025-06-20",
          endDate: "2025-06-21",
        },
        replies: [
          {
            _id: await nextSeq("reply"),
            user: {
              _id: 2,
              name: "박선영",
              image: "user-jayg.webp",
            },
            content:
              "진짜 경주만의 감성이 있죠. 불국사 사진 있으면 공유해주세요!",
            createdAt: getTime(),
            updatedAt: getTime(),
          },
          {
            _id: await nextSeq("reply"),
            user: {
              _id: 4,
              name: "송아현",
              image: "user-jayg.webp",
            },
            content:
              "황리단길 요즘 그렇게 예쁘다던데 저도 꼭 가보고 싶어요ㅠㅠ",
            createdAt: getTime(),
            updatedAt: getTime(),
          },
        ],
      },
      //1박 2일 경주daily후기 1일차, 2일차
      {
        _id: await nextSeq("post"),
        parent_id: 1,
        type: "reviewDaily",
        // reviewDaily
        // reviewPlace
        views: 16,
        user: {
          _id: 3,
          name: "차형주",
          image: `files/${clientId}/user-neo.png`,
        },
        title: "유네스코급 감동의 첫날",
        content:
          "불국사부터 석굴암, 첨성대까지 정말 한 장소 한 장소가 박물관이었어요. 특히 석굴암은 직접 보니 사진보다 훨씬 더 감동적이더라고요ㅠㅠ 날씨도 좋아서 사진도 예쁘게 찍혔고, 역사 공부 제대로 한 날이었네요ㅋㅋㅋ",

        starRate: 5,
        createdAt: getTime(),
        updatedAt: getTime(),
        extra: {
          date: "2025-06-20",
          images: [
            `files/${clientId}/user-neo.png`,
            `files/${clientId}/user-neo.png`,
            `files/${clientId}/user-neo.png`,
          ],
          tags: ["불국사", "석굴암", "역사공부"],
        },
        replies: [
          {
            _id: await nextSeq("reply"),
            user: {
              _id: 5,
              name: "남주성",
              image: "user-jayg.webp",
            },
            content: "석굴암 진짜 감동이죠. 역사공부ㅋㅋㅋ 공감합니다!",
            createdAt: getTime(),
            updatedAt: getTime(),
          },
        ],
      },
      {
        _id: await nextSeq("post"),
        parent_id: 1,
        type: "reviewDaily",
        // reviewDaily
        // reviewPlace
        views: 16,
        user: {
          _id: 3,
          name: "차형주",
          image: `files/${clientId}/user-neo.png`,
        },
        title: "현대와 전통이 공존하는 둘째날",
        content:
          "대릉원 무덤들은 그냥 큰 언덕인 줄 알았는데 내부 보고 깜짝 놀랐어요ㄷㄷ 황리단길은 레트로 분위기 제대로였고요, 교촌마을에선 전통체험도 했는데 의외로 재밌었어요. 짧지만 밀도 높은 하루였네요ㅎㅎ",

        starRate: 5,
        createdAt: getTime(),
        updatedAt: getTime(),
        extra: {
          date: "2025-06-21",
          images: [
            `files/${clientId}/user-neo.png`,
            `files/${clientId}/user-neo.png`,
            `files/${clientId}/user-neo.png`,
          ],
          tags: ["대릉원", "레트로", "전통체험"],
        },
        replies: [
          {
            _id: await nextSeq("reply"),
            user: {
              _id: 5,
              name: "남주성",
              image: "user-jayg.webp",
            },
            content: "황리단길 카페 골라가기 어렵지 않아요? 너무 많던데 ㅋㅋ",
            createdAt: getTime(),
            updatedAt: getTime(),
          },
          {
            _id: await nextSeq("reply"),
            user: {
              _id: 4,
              name: "송아현",
              image: "user-jayg.webp",
            },
            content: "교촌마을! 거기 한복 대여해서 찍으면 찐이죠 ㅎㅎ",
            createdAt: getTime(),
            updatedAt: getTime(),
          },
        ],
      },
      //1박 2일 경주place후기
      {
        _id: await nextSeq("post"),
        parent_id: 1,
        type: "reviewPlace",
        // reviewDaily
        // reviewPlace
        views: 48,
        user: {
          _id: 3,
          name: "차형주",
          image: `files/${clientId}/user-neo.png`,
        },
        title: "경주 불국사",
        content:
          "경주 불국사는 정말 위엄 그 자체. 돌 하나하나에도 역사가 느껴져요. 특히 대웅전 앞에서 바라보는 풍경이 너무 평화로워서.. 오래도록 머물고 싶었어요ㅠ",

        starRate: 4,
        createdAt: getTime(),
        updatedAt: getTime(),
        extra: {
          date: "2025-06-20",
          images: [
            `files/${clientId}/user-neo.png`,
            `files/${clientId}/user-neo.png`,
            `files/${clientId}/user-neo.png`,
          ],
          tags: ["불국사", "역사"],
        },
        replies: [
          {
            _id: await nextSeq("reply"),
            user: {
              _id: 1,
              name: "문서인",
              image: "user-jayg.webp",
            },
            content: "경주 갈 때마다 불국사는 꼭 다녀와요!",
            createdAt: getTime(),
            updatedAt: getTime(),
          },
        ],
      },
      {
        _id: await nextSeq("post"),
        parent_id: 1,
        type: "reviewPlace",
        // reviewDaily
        // reviewPlace
        views: 73,
        user: {
          _id: 3,
          name: "차형주",
          image: `files/${clientId}/user-neo.png`,
        },
        title: "경주 대릉원 일원",
        content:
          "겉에서 보면 그냥 동산 같지만, 들어가 보면 진짜 규모에 놀라요!! 내부 전시도 잘 돼있고, 천마총 보고 나니까 옛 신라시대가 좀 더 가까이 느껴졌어요.",

        starRate: 4,
        createdAt: getTime(),
        updatedAt: getTime(),
        extra: {
          date: "2025-06-21",
          images: [
            `files/${clientId}/user-neo.png`,
            `files/${clientId}/user-neo.png`,
            `files/${clientId}/user-neo.png`,
          ],
          tags: ["대릉원", "신라시대", "천마총"],
        },
        replies: [
          {
            _id: await nextSeq("reply"),
            user: {
              _id: 1,
              name: "문서인",
              image: "user-jayg.webp",
            },
            content: "천마총 내부 대기 오래 걸리셨나요???",
            createdAt: getTime(),
            updatedAt: getTime(),
          },
          {
            _id: await nextSeq("reply"),
            user: {
              _id: 2,
              name: "박선영",
              image: "user-jayg.webp",
            },
            content: "대릉원 산책하기 좋다던데 방문했을 때 날씨는 어떠셨나요?",
            createdAt: getTime(),
            updatedAt: getTime(),
          },
        ],
      },

      //2박 3일 강원도all후기
      {
        _id: await nextSeq("post"),
        parent_id: 2,
        type: "reviewAll",
        // reviewDaily
        // reviewPlace
        views: 100,
        user: {
          _id: 5,
          name: "남주성",
          image: `files/${clientId}/user-neo.png`,
        },
        title: "강원도에서 2박 3일",
        content:
          "도시에서 벗어나 자연과 바람, 고요함 속에 나를 맡기며. 첫날에는 예술과 광산이 결합된 삼탄아트마인, 웅장한 화암동굴, 만항재의 고지대 풍경을 구경하며 하루를 순식간에 마무리했어요. 둘째 날은 매봉산 바람의 언덕에서 아침을 맞이하고, 자연사박물관에서 지질 시대를 체험한 뒤 장호항에서 푸른 바다를 보며 힐링했습니다. 마지막 날엔 해수욕장에서 해수욕을 즐기다 죽서루와 이사부길을 걸으며 여행을 마무리 했어요.",
        images: [
          `files/${clientId}/user-neo.png`,
          `files/${clientId}/user-neo.png`,
          `files/${clientId}/user-neo.png`,
        ],
        tags: ["강원도", "자연여행", "삼척"],
        starRate: 4,
        createdAt: getTime(),
        updatedAt: getTime(),
        extra: {
          startDate: "2025-06-30",
          endDate: "2025-07-02",
        },
        replies: [
          {
            _id: await nextSeq("reply"),
            user: {
              _id: 1,
              name: "문서인",
              image: "user-jayg.webp",
            },
            content: "장호항에서 스노클링 해봤는데 물속이 진짜 투명해요!",
            createdAt: getTime(),
            updatedAt: getTime(),
          },
        ],
      },
      //2박 3일 강원도daily후기 1일차, 2일차, 3일차
      {
        _id: await nextSeq("post"),
        parent_id: 1,
        type: "reviewDaily",
        // reviewDaily
        // reviewPlace
        views: 10,
        user: {
          _id: 5,
          name: "남주성",
          image: `files/${clientId}/user-neo.png`,
        },
        title: "광산과 예술의 강원도 1일차",
        content:
          "제일 먼저 가보고 싶었던 삼탄아트마인은 산업 유산이 예술과 만나 과거의 흔적을 살린 전시와 외부 조형물들이 인상 깊었습니다. 화암동굴은 상상 이상으로 거대하고 스펙타클한 동굴 체험이었어요. 조명이 진짜 예뻤는데 사진 찍는 거 좋아하시면 가보셔도 좋을 것 같습니다. 제일 기억에 남는 건 만항재였습니다. 드라이브 코스와 해발 1,330m에서 내려다보는 풍경에서 도심에서는 느낄 수 없는 청량함이 있었어요.",

        starRate: 4,
        createdAt: getTime(),
        updatedAt: getTime(),
        extra: {
          date: "2025-06-30",
          images: [
            `files/${clientId}/user-neo.png`,
            `files/${clientId}/user-neo.png`,
            `files/${clientId}/user-neo.png`,
          ],
          tags: ["삼탄아트마인", "화암동굴", "만항재"],
        },
        replies: [
          {
            _id: await nextSeq("reply"),
            user: {
              _id: 2,
              name: "박선영",
              image: "user-jayg.webp",
            },
            content:
              "화암동굴 꼭 가봐야겠어요!!! 동굴 체험 해보고 싶었는데 사진스팟이라니 더 기대되네요!!",
            createdAt: getTime(),
            updatedAt: getTime(),
          },
          {
            _id: await nextSeq("reply"),
            user: {
              _id: 4,
              name: "송아현",
              image: "user-jayg.webp",
            },
            content:
              "삼탄아트마인은 처음 들어봐요. 어떤 곳인지 좀 더 알고 싶네요ㅎㅎ",
            createdAt: getTime(),
            updatedAt: getTime(),
          },
        ],
      },
      {
        _id: await nextSeq("post"),
        parent_id: 2,
        type: "reviewDaily",
        // reviewDaily
        // reviewPlace
        views: 25,
        user: {
          _id: 5,
          name: "남주성",
          image: `files/${clientId}/user-neo.png`,
        },
        title: "바람과 시간의 강원도 2일차",
        content:
          "매봉산 바람의 언덕은 그야말로 힐링 그 자체였고 풍력 발전기들이 돌아가는 소리와 끝없이 펼쳐진 언덕 위 초록이 너무 평화로워서 이대로 시간이 멈추면 좋겠다고 생각했습니다. 이후 들른 고생대 자연사박물관은 생각보다 재미있었어요. 지질 시대와 공룡, 광산 유물 등 다양한 전시가 알차더라고요. 저녁쯤 장호항방파제에 도착했는데, 파도 소리와 노을이 어우러진 풍경은 피로를 싹 씻어주는 느낌이었어요.",

        starRate: 5,
        createdAt: getTime(),
        updatedAt: getTime(),
        extra: {
          date: "2025-07-01",
          images: [
            `files/${clientId}/user-neo.png`,
            `files/${clientId}/user-neo.png`,
            `files/${clientId}/user-neo.png`,
          ],
          tags: ["매봉산", "자연사박물관", "장호항"],
        },
        replies: [
          {
            _id: await nextSeq("reply"),
            user: {
              _id: 3,
              name: "차형주",
              image: "user-jayg.webp",
            },
            content: "감성적이신 분 같아요ㅎㅎ 힐링여행이네요~",
            createdAt: getTime(),
            updatedAt: getTime(),
          },
        ],
      },
      {
        _id: await nextSeq("post"),
        parent_id: 3,
        type: "reviewDaily",
        // reviewDaily
        // reviewPlace
        views: 9,
        user: {
          _id: 5,
          name: "남주성",
          image: `files/${clientId}/user-neo.png`,
        },
        title: "바다와 역사의 강원도 3일차",
        content:
          "장호해수욕장은 동해답게 물빛이 맑고 조용해서 아침 산책하기 너무 좋았습니다. 사람이 많지 않아서 한적한 분위기를 즐길 수 있었습니다. 삼척 죽서루에서는 조선시대 건축물과 함께 멋진 강 전망을 감상할 수 있었고, 새천년해안도로인 이사부길을 걸으며 바다 내음을 가득 느꼈습니다.",

        starRate: 4,
        createdAt: getTime(),
        updatedAt: getTime(),
        extra: {
          date: "2025-07-02",
          images: [
            `files/${clientId}/user-neo.png`,
            `files/${clientId}/user-neo.png`,
            `files/${clientId}/user-neo.png`,
          ],
          tags: ["장호해수욕장", "죽서루", "이사부길"],
        },
      },
      //2박 3일 강원도place후기
      {
        _id: await nextSeq("post"),
        parent_id: 1,
        type: "reviewPlace",
        // reviewDaily
        // reviewPlace
        views: 69,
        user: {
          _id: 5,
          name: "남주성",
          image: `files/${clientId}/user-neo.png`,
        },
        title: "산업유산 속 예술의 삼탄아트마인",
        content:
          "옛 탄광이 미술관으로 변신한 삼탄아트마인은 색다른 매력이 넘치는 곳이었습니다. 광산의 흔적을 그대로 살리면서도 현대미술 작품들과 잘 어우러져 독특한 분위기를 만들더라고요. 특히 야외 조형물과 광산 체험 공간이 흥미로웠어요.",

        starRate: 4,
        createdAt: getTime(),
        updatedAt: getTime(),
        extra: {
          date: "2025-06-30",
          images: [
            `files/${clientId}/user-neo.png`,
            `files/${clientId}/user-neo.png`,
            `files/${clientId}/user-neo.png`,
          ],
          tags: ["삼탄아트마인", "탄광예술"],
        },
        replies: [
          {
            _id: await nextSeq("reply"),
            user: {
              _id: 1,
              name: "문서인",
              image: "user-jayg.webp",
            },
            content: "이런 곳이 있는 줄 몰랐어요! 다음에 꼭 가볼거예요.",
            createdAt: getTime(),
            updatedAt: getTime(),
          },
        ],
      },
      {
        _id: await nextSeq("post"),
        parent_id: 2,
        type: "reviewPlace",
        // reviewDaily
        // reviewPlace
        views: 11,
        user: {
          _id: 5,
          name: "남주성",
          image: `files/${clientId}/user-neo.png`,
        },
        title: "파도와 노을이 어루어진 장호항방파제",
        content:
          "장호항 방파제에서 본 노을이 진짜 아름다웠습니다. 파도 소리, 갈매기 울음, 햇살까지… 모든 게 조화를 이루는 느낌이었어요. 바다 위에 떠 있는 배들과 함께 풍경을 감상하다 보면 시간 가는 줄 모를거예요.",

        starRate: 5,
        createdAt: getTime(),
        updatedAt: getTime(),
        extra: {
          date: "2025-07-01",
          images: [
            `files/${clientId}/user-neo.png`,
            `files/${clientId}/user-neo.png`,
            `files/${clientId}/user-neo.png`,
          ],
          tags: ["장호항", "방파제", "노을맛집"],
        },
        replies: [
          {
            _id: await nextSeq("reply"),
            user: {
              _id: 1,
              name: "문서인",
              image: "user-jayg.webp",
            },
            content:
              "저도 노을 참 좋아하는데 노을은 장호항 방파제에서 꼭 봐야겠어요.",
            createdAt: getTime(),
            updatedAt: getTime(),
          },
          {
            _id: await nextSeq("reply"),
            user: {
              _id: 2,
              name: "박선영",
              image: "user-jayg.webp",
            },
            content: "이번에 강원도 여행 계획 중인데 꼭 가볼게요!!",
            createdAt: getTime(),
            updatedAt: getTime(),
          },
          {
            _id: await nextSeq("reply"),
            user: {
              _id: 4,
              name: "송아현",
              image: "user-jayg.webp",
            },
            content: "노을이 정말 예뻤을거 같은데 사진 더 있을까요??",
            createdAt: getTime(),
            updatedAt: getTime(),
          },
        ],
      },
      {
        _id: await nextSeq("post"),
        parent_id: 3,
        type: "reviewPlace",
        // reviewDaily
        // reviewPlace
        views: 36,
        user: {
          _id: 5,
          name: "남주성",
          image: `files/${clientId}/user-neo.png`,
        },
        title: "바다와 나란히, 이사부길",
        content:
          "이사부길은 해안을 따라 조성된 산책로인데, 걸으면서 바다를 계속 볼 수 있어서 마음이 절로 정화됐어요. 도로 옆으로는 시원한 바람이 불고, 가끔씩 바다 위로 튀어오르는 물보라가 인상적이었어요. 드라이브 코스로도 좋지만 직접 걸어보는 걸 추천해요.",

        starRate: 3,
        createdAt: getTime(),
        updatedAt: getTime(),
        extra: {
          date: "2025-07-02",
          images: [
            `files/${clientId}/user-neo.png`,
            `files/${clientId}/user-neo.png`,
            `files/${clientId}/user-neo.png`,
          ],
          tags: ["이사부길", "해안산책"],
        },
        replies: [
          {
            _id: await nextSeq("reply"),
            user: {
              _id: 3,
              name: "차형주",
              image: "user-jayg.webp",
            },
            content: "드라이브로만 다녔는데 걸어보는 것도 좋겠네요!",
            createdAt: getTime(),
            updatedAt: getTime(),
          },
        ],
      },

      //3박 4일 전주all후기
      {
        _id: await nextSeq("post"),
        parent_id: 3,
        type: "reviewAll",
        // reviewDaily
        // reviewPlace
        views: 150,
        user: {
          _id: 2,
          name: "박선영",
          image: `files/${clientId}/user-neo.png`,
        },
        title: "전주에서 보낸 감성 가득 3박 4일",
        content:
          "전주는 오래된 것들과 새로운 감성이 절묘하게 어우러진 도시였어요! 첫날엔 한옥마을과 경기전, 전동성당 등을 돌며 전통의 정취에 푹 빠졌고, 둘째 날은 공예, 향교, 시장 등을 돌며 사람 사는 냄새가 나는 공간들을 경험했어요. 셋째 날에는 공원들과 동물원, 대학교 안의 고즈넉한 루트를 따라 여유를 즐겼고, 마지막 날에는 전주의 예술적 면모를 보여주는 삼례문화예술촌과 팔복예술공장에서 여행을 마무리했답니다. 전주는 단순한 관광지가 아니라 머무르며 느껴야 할 도시였어요.",
        images: [
          `files/${clientId}/user-neo.png`,
          `files/${clientId}/user-neo.png`,
          `files/${clientId}/user-neo.png`,
        ],
        tags: ["전주", "한옥마을", "예술여행", "감성가득"],
        starRate: 4,
        createdAt: getTime(),
        updatedAt: getTime(),
        extra: {
          startDate: "2025-06-15",
          endDate: "2025-06-18",
        },
        replies: [
          {
            _id: await nextSeq("reply"),
            user: {
              _id: 1,
              name: "문서인",
              image: "user-jayg.webp",
            },
            content: "전동성당 넘 예쁘죠ㅠㅠ 야경도 멋져요!",
            createdAt: getTime(),
            updatedAt: getTime(),
          },
          {
            _id: await nextSeq("reply"),
            user: {
              _id: 5,
              name: "남주성",
              image: "user-jayg.webp",
            },
            content: "전주 진짜 걸어다니기 좋은 도시 같아요. 한옥마을 최고!",
            createdAt: getTime(),
            updatedAt: getTime(),
          },
        ],
      },
      //3박 4일 강원도daily후기 1일차, 2일차, 3일차, 4일차
      {
        _id: await nextSeq("post"),
        parent_id: 1,
        type: "reviewDaily",
        // reviewDaily
        // reviewPlace
        views: 99,
        user: {
          _id: 2,
          name: "박선영",
          image: `files/${clientId}/user-neo.png`,
        },
        title: "전통의 미학에 빠져버린! 강원도 1일차 여행",
        content:
          "한옥마을 골목골목을 걸으면서 전주의 고즈넉한 분위기에 흠뻑 빠졌어요. 경기전은 정말 잘 관리되어 있고 왕실의 기운이 느껴지더라고요. 전동성당은 외관도 멋지고 내부도 아름다웠고요. 풍남문과 오목대까지 연결되는 길은 마치 역사 속을 걷는 기분이었어요.",

        starRate: 4,
        createdAt: getTime(),
        updatedAt: getTime(),
        extra: {
          date: "2025-06-15",
          images: [
            `files/${clientId}/user-neo.png`,
            `files/${clientId}/user-neo.png`,
            `files/${clientId}/user-neo.png`,
          ],
          tags: ["한옥마을", "경기전", "전동성당"],
        },
        replies: [
          {
            _id: await nextSeq("reply"),
            user: {
              _id: 3,
              name: "차형주",
              image: "user-jayg.webp",
            },
            content:
              "한옥마을 너무 좋아요ㅠㅠ 전주만의 독특한 매력이 있죠!ㅋㅋ",
            createdAt: getTime(),
            updatedAt: getTime(),
          },
          {
            _id: await nextSeq("reply"),
            user: {
              _id: 4,
              name: "송아현",
              image: "user-jayg.webp",
            },
            content: "경기전? 전주에 이런 곳도 있다니! 다음에 꼭 가볼게요!!",
            createdAt: getTime(),
            updatedAt: getTime(),
          },
        ],
      },
      {
        _id: await nextSeq("post"),
        parent_id: 1,
        type: "reviewDaily",
        // reviewDaily
        // reviewPlace
        views: 63,
        user: {
          _id: 2,
          name: "박선영",
          image: `files/${clientId}/user-neo.png`,
        },
        title: "사람 냄새나는 하루! 강원도 2일차 여행",
        content:
          "전주향교에서 조용한 시간을 보내고, 공예품전시관과 한지원에서 정성스럽게 만든 전통공예를 보는 재미가 있었어요. 남부시장에선 활기찬 분위기 속에서 다양한 문화를 느낄 수 있었고, 자만마을 벽화는 알록달록 예쁜 포토스팟이 많아 좋았어요.",

        starRate: 5,
        createdAt: getTime(),
        updatedAt: getTime(),
        extra: {
          date: "2025-06-16",
          images: [
            `files/${clientId}/user-neo.png`,
            `files/${clientId}/user-neo.png`,
            `files/${clientId}/user-neo.png`,
          ],
          tags: ["공예여행", "남부시장", "자만마을"],
        },
        replies: [
          {
            _id: await nextSeq("reply"),
            user: {
              _id: 3,
              name: "차형주",
              image: "user-jayg.webp",
            },
            content:
              "공예품전시관에서 전통공예도 즐길 수 있나요?? 체험 해보고 싶은데",
            createdAt: getTime(),
            updatedAt: getTime(),
          },
          {
            _id: await nextSeq("reply"),
            user: {
              _id: 5,
              name: "남주성",
              image: "user-jayg.webp",
            },
            content:
              "벽화 포토스팟이라니 새롭고 좋은걸요? 가족 데리고 가야겠어요",
            createdAt: getTime(),
            updatedAt: getTime(),
          },
          {
            _id: await nextSeq("reply"),
            user: {
              _id: 1,
              name: "문서인",
              image: "user-jayg.webp",
            },
            content:
              "벽화 보는걸 좋아하는데 전주에도 있군요! 꼭 가야겠어요ㅠㅠ 후기 감사해요!!",
            createdAt: getTime(),
            updatedAt: getTime(),
          },
        ],
      },
      {
        _id: await nextSeq("post"),
        parent_id: 1,
        type: "reviewDaily",
        // reviewDaily
        // reviewPlace
        views: 45,
        user: {
          _id: 2,
          name: "박선영",
          image: `files/${clientId}/user-neo.png`,
        },
        title: "초록이 가득한! 강원도 3일차 여행",
        content:
          "완산공원과 덕진공원은 정말 평화로웠고, 산책하는 사람들도 많아 보기 좋았어요. 아침부터 개운하게 초록의 기운을 느끼며 시작했네요~ 전주동물원도 생각보다 넓고 동물들도 귀엽고 건강해 보여서 시간 가는 줄 모르고 구경했어요ㅎㅎ 문회루는 전북대 안에 있어 조금 생소했지만, 조용히 책 읽기 좋은 공간 같았어요!",

        starRate: 5,
        createdAt: getTime(),
        updatedAt: getTime(),
        extra: {
          date: "2025-06-17",
          images: [
            `files/${clientId}/user-neo.png`,
            `files/${clientId}/user-neo.png`,
            `files/${clientId}/user-neo.png`,
          ],
          tags: ["완산공원", "덕진공원", "전주동물원", "문회루"],
        },
        replies: [
          {
            _id: await nextSeq("reply"),
            user: {
              _id: 3,
              name: "차형주",
              image: "user-jayg.webp",
            },
            content: "헐 동물원도 있나요?? 동물 완전 좋아하는데 꼭 가야지",
            createdAt: getTime(),
            updatedAt: getTime(),
          },
          {
            _id: await nextSeq("reply"),
            user: {
              _id: 5,
              name: "남주성",
              image: "user-jayg.webp",
            },
            content:
              "여행하면서 아침 산책이라니 부럽네요! 전주에서 힐링 제대로 하셨겠어요ㅎㅎ~",
            createdAt: getTime(),
            updatedAt: getTime(),
          },
        ],
      },
      {
        _id: await nextSeq("post"),
        parent_id: 1,
        type: "reviewDaily",
        // reviewDaily
        // reviewPlace
        views: 68,
        user: {
          _id: 2,
          name: "박선영",
          image: `files/${clientId}/user-neo.png`,
        },
        title: "마무리는 역시 예술로! 강원도 4일차 여행",
        content:
          "삼례문화예술촌은 복합문화공간으로 예술 전시도 하고 책도 많아서 하루 종일 있어도 좋을 만큼 알찼어요! 마지막 날이 아니었다면 정말 하루종일 있고 싶었어요ㅠㅠ 팔복예술공장을 마지막으로 여행을 마무리했는데 이곳은 폐공장을 활용한 감각적인 공간이어서 인상 깊었어요!!",

        starRate: 4,
        createdAt: getTime(),
        updatedAt: getTime(),
        extra: {
          date: "2025-06-18",
          images: [
            `files/${clientId}/user-neo.png`,
            `files/${clientId}/user-neo.png`,
            `files/${clientId}/user-neo.png`,
          ],
          tags: ["삼례예술촌", "팔복예술공장", "문화산책"],
        },
      },
      //3박 4일 강원도place후기
      {
        _id: await nextSeq("post"),
        parent_id: 1,
        type: "reviewPlace",
        // reviewDaily
        // reviewPlace
        views: 98,
        user: {
          _id: 2,
          name: "박선영",
          image: `files/${clientId}/user-neo.png`,
        },
        title: "전주의 정수를 만나다! 전주한옥마을",
        content:
          "전주 한옥마을은 말 그대로 전통과 감성이 공존하는 곳! 골목마다 한옥과 현대적인 가게들이 자연스럽게 어우러져 있어서 걷기만 해도 힐링이에요~ 한복 입은 관광객들과 함께 걷다 보면 마치 타임슬립한 듯한 느낌이 들거예요ㅎㅎ",

        starRate: 4,
        createdAt: getTime(),
        updatedAt: getTime(),
        extra: {
          date: "2025-06-15",
          images: [
            `files/${clientId}/user-neo.png`,
            `files/${clientId}/user-neo.png`,
            `files/${clientId}/user-neo.png`,
          ],
          tags: ["전주한옥마을", "전통여행", "감성"],
        },
      },
      {
        _id: await nextSeq("post"),
        parent_id: 1,
        type: "reviewPlace",
        // reviewDaily
        // reviewPlace
        views: 88,
        user: {
          _id: 2,
          name: "박선영",
          image: `files/${clientId}/user-neo.png`,
        },
        title: "골목 곳곳이 포토존! 자만마을",
        content:
          "자만마을 벽화갤러리는 전주의 또 다른 매력을 보여주는 곳이었어요! 알록달록한 벽화들이 골목골목마다 숨어 있어서 걷는 재미가 있고, 곳곳에 예쁜 카페도 많아요ㅎㅎㅎ 감성 사진 찍기 딱 좋은 장소라 대박 추천해요!!!",

        starRate: 5,
        createdAt: getTime(),
        updatedAt: getTime(),
        extra: {
          date: "2025-06-16",
          images: [
            `files/${clientId}/user-neo.png`,
            `files/${clientId}/user-neo.png`,
            `files/${clientId}/user-neo.png`,
          ],
          tags: ["자만마을", "벽화마을", "포토존"],
        },
        replies: [
          {
            _id: await nextSeq("reply"),
            user: {
              _id: 1,
              name: "문서인",
              image: "user-jayg.webp",
            },
            content:
              "헐 카페도 있다니 완전 최고네요!!! 인스타용 사진 찍으러 가야겠어요~!!",
            createdAt: getTime(),
            updatedAt: getTime(),
          },
          {
            _id: await nextSeq("reply"),
            user: {
              _id: 5,
              name: "남주성",
              image: "user-jayg.webp",
            },
            content: "제가 좋아하는 곳입니다. 데이트 코스로도 딱이에요ㅎ",
            createdAt: getTime(),
            updatedAt: getTime(),
          },
        ],
      },
      {
        _id: await nextSeq("post"),
        parent_id: 2,
        type: "reviewPlace",
        // reviewDaily
        // reviewPlace
        views: 101,
        user: {
          _id: 2,
          name: "박선영",
          image: `files/${clientId}/user-neo.png`,
        },
        title: "폐공장의 화려한 변신! 팔복예술공장",
        content:
          "공장을 개조해 만든 예술 공간이라 더 흥미로웠고 감각적인 전시와 넓은 공간이 인상 깊었어요!! 외관부터 포토스팟이고, 내부도 현대미술과 복합문화 공간으로 꾸며져 있어서 오래 머물렀어요ㅎㅎ!!",

        starRate: 4,
        createdAt: getTime(),
        updatedAt: getTime(),
        extra: {
          date: "2025-06-18",
          images: [
            `files/${clientId}/user-neo.png`,
            `files/${clientId}/user-neo.png`,
            `files/${clientId}/user-neo.png`,
          ],
          tags: ["팔복예술공장", "전주예술", "폐공장리모델링"],
        },
      },

      //3박 4일 부산all후기
      {
        _id: await nextSeq("post"),
        parent_id: 3,
        type: "reviewAll",
        // reviewDaily
        // reviewPlace
        views: 125,
        user: {
          _id: 4,
          name: "송아현",
          image: `files/${clientId}/user-neo.png`,
        },
        title: "부산 바다와 도시를 품은 행복한 3박 4일",
        content:
          "부산은 바다와 도시가 조화롭게 섞여있는 곳이라 그런지 머무는 내내 기분이 좋았어요! 1일차엔 예쁜 언덕 마을과 바다 전망대를 돌아보고, 국제시장 길거리 음식도 실컷 맛봤죠. 2일차는 해운대와 광안리에서 바다향과 액티비티를 즐기고, 아쿠아리움도 갔어요. 3일차엔 도심 속 명소들을 돌며 부산의 문화도 느꼈고, 마지막 날엔 케이블카와 역사적인 사찰까지 남은 시간을 알차게 썼답니다. 다음엔 친구들이랑 한 번 더 가고 싶어요!",
        images: [
          `files/${clientId}/user-neo.png`,
          `files/${clientId}/user-neo.png`,
          `files/${clientId}/user-neo.png`,
        ],
        tags: ["부산여행", "바다와도시", "3박4일"],
        starRate: 4,
        createdAt: getTime(),
        updatedAt: getTime(),
        extra: {
          startDate: "2025-06-22",
          endDate: "2025-06-25",
        },
        replies: [
          {
            _id: await nextSeq("reply"),
            user: {
              _id: 3,
              name: "차형주",
              image: "user-jayg.webp",
            },
            content:
              "흰여울문화마을 사진 너무 예쁘네요! 포토존 진짜 많더라구요~",
            createdAt: getTime(),
            updatedAt: getTime(),
          },
          {
            _id: await nextSeq("reply"),
            user: {
              _id: 5,
              name: "남주성",
              image: "user-jayg.webp",
            },
            content: "국제시장 먹자골목에서 무슨 음식 제일 맛있었나요??",
            createdAt: getTime(),
            updatedAt: getTime(),
          },
        ],
      },
      //3박 4일 부산daily후기 1일차, 2일차, 3일차
      {
        _id: await nextSeq("post"),
        parent_id: 1,
        type: "reviewDaily",
        // reviewDaily
        // reviewPlace
        views: 14,
        user: {
          _id: 4,
          name: "송아현",
          image: `files/${clientId}/user-neo.png`,
        },
        title: "1일차 :: 컬러풀 & 빈티지한 감성 충전",
        content:
          "첫날엔 흰여울문화마을에서 알록달록 집들을 보며 신나게 사진 찍었어요. 예쁜 골목길이 정말 많더라고요. 영도 하늘전망대에서 바다도 살짝 내려다보고, 이어서 태종대까지 자연 풍경이 완전 힐링! 마무리는 국제시장 먹자골목에서 꼬막비빔밥에 씨앗호떡까지... 정~말 배부른 하루였어요.",

        starRate: 5,
        createdAt: getTime(),
        updatedAt: getTime(),
        extra: {
          date: "2025-06-22",
          images: [
            `files/${clientId}/user-neo.png`,
            `files/${clientId}/user-neo.png`,
            `files/${clientId}/user-neo.png`,
          ],
          tags: ["흰여울문화마을", "태종대", "시장먹방"],
        },
        replies: [
          {
            _id: await nextSeq("reply"),
            user: {
              _id: 1,
              name: "문서인",
              image: "user-jayg.webp",
            },
            content: "흰여울마을에서 해지는 시간 맞춰가면 진짜 예쁘던데~",
            createdAt: getTime(),
            updatedAt: getTime(),
          },
          {
            _id: await nextSeq("reply"),
            user: {
              _id: 2,
              name: "박선영",
              image: "user-jayg.webp",
            },
            content: "국제시장 씨앗호떡 저도 좋아해요! 군침 돌아요ㅋㅋ",
            createdAt: getTime(),
            updatedAt: getTime(),
          },
          {
            _id: await nextSeq("reply"),
            user: {
              _id: 3,
              name: "차형주",
              image: "user-jayg.webp",
            },
            content: "첫째날부터 엄청 알차게 즐기셨네요ㅋㅋㅋ",
            createdAt: getTime(),
            updatedAt: getTime(),
          },
        ],
      },
      {
        _id: await nextSeq("post"),
        parent_id: 1,
        type: "reviewDaily",
        // reviewDaily
        // reviewPlace
        views: 21,
        user: {
          _id: 4,
          name: "송아현",
          image: `files/${clientId}/user-neo.png`,
        },
        title: "2일차 :: 바다 위에서 즐기는 액티비티",
        content:
          "부산시민공원에서 아침 산책으로 기분 좋게 시작했고 광안리 SUP 존에서 드디어 패들 들고 서핑! 생각보다 쉽지 않았지만 완전 재미있었어요. 해운대해수욕장은 여전히 사람이 많지만, 파도타기는 너무 좋더라고요. 그리고 씨라이프부산아쿠아리움에서 해양 생물들도 보고 귀여운 펭귄 쇼에 행복했어요.",

        starRate: 5,
        createdAt: getTime(),
        updatedAt: getTime(),
        extra: {
          date: "2025-06-23",
          images: [
            `files/${clientId}/user-neo.png`,
            `files/${clientId}/user-neo.png`,
            `files/${clientId}/user-neo.png`,
          ],
          tags: ["SUP체험", "해운대", "아쿠아리움"],
        },
        replies: [
          {
            _id: await nextSeq("reply"),
            user: {
              _id: 1,
              name: "문서인",
              image: "user-jayg.webp",
            },
            content: "SUP 어땠어요? 어려웠나요?",
            createdAt: getTime(),
            updatedAt: getTime(),
          },
          {
            _id: await nextSeq("reply"),
            user: {
              _id: 5,
              name: "남주성",
              image: "user-jayg.webp",
            },
            content: "펭귄쇼 진짜 귀엽죠! 저도 작년에 보고 반했어요.",
            createdAt: getTime(),
            updatedAt: getTime(),
          },
        ],
      },
      {
        _id: await nextSeq("post"),
        parent_id: 1,
        type: "reviewDaily",
        // reviewDaily
        // reviewPlace
        views: 21,
        user: {
          _id: 4,
          name: "송아현",
          image: `files/${clientId}/user-neo.png`,
        },
        title: "3일차 :: 부산 도심 속 스냅 여행",
        content:
          "부산타워랑 용두산공원은 도심 한복판에 이런 풍경이 있다니 신기했어요. BIFF 광장에서 영화의 열기를 느끼고, 감천문화마을로 이동하니 색색 감성 가득했네요. 계단마다 예술작품이랑 포토존이 많아서 여기서도 사진만 주구장창 찍었어요ㅋㅋ",

        starRate: 5,
        createdAt: getTime(),
        updatedAt: getTime(),
        extra: {
          date: "2025-06-24",
          images: [
            `files/${clientId}/user-neo.png`,
            `files/${clientId}/user-neo.png`,
            `files/${clientId}/user-neo.png`,
          ],
          tags: ["BIFF광장", "감천문화마을", "부산타워"],
        },
        replies: [
          {
            _id: await nextSeq("reply"),
            user: {
              _id: 1,
              name: "문서인",
              image: "user-jayg.webp",
            },
            content:
              "역시 여행은 사진인가봐요!ㅋㅋㅋㅋ 저도 여행가면 사진밖에 안찍어요",
            createdAt: getTime(),
            updatedAt: getTime(),
          },
          {
            _id: await nextSeq("reply"),
            user: {
              _id: 5,
              name: "남주성",
              image: "user-jayg.webp",
            },
            content: "감천마을 사진 스팟 많죠! 여긴 진짜 필수!",
            createdAt: getTime(),
            updatedAt: getTime(),
          },
          {
            _id: await nextSeq("reply"),
            user: {
              _id: 3,
              name: "차형주",
              image: "user-jayg.webp",
            },
            content: "BIFF광장 갔으면 핫도그 꼭 드셔요. 전 그게 최고였어요ㅋㅋ",
            createdAt: getTime(),
            updatedAt: getTime(),
          },
        ],
      },
      //3박 4일 부산place후기
      {
        _id: await nextSeq("post"),
        parent_id: 1,
        type: "reviewPlace",
        // reviewDaily
        // reviewPlace
        views: 51,
        user: {
          _id: 4,
          name: "송아현",
          image: `files/${clientId}/user-neo.png`,
        },
        title: "파도 위에서 자유를 느낀광안리 SUP Zone",
        content:
          "처음에는 좀 무섭기도 했는데, SUP 존에서 바다 위를 패들로 헤엄치니 진짜 자유롭더라고요ㅠㅠ 바람도 시원하고, 뒤에 보이는 광안대교 뷰가 예술이었어요!!",

        starRate: 4,
        createdAt: getTime(),
        updatedAt: getTime(),
        extra: {
          date: "2025-06-23",
          images: [
            `files/${clientId}/user-neo.png`,
            `files/${clientId}/user-neo.png`,
            `files/${clientId}/user-neo.png`,
          ],
          tags: ["광안리SUP", "액티비티", "바다체험"],
        },
        replies: [
          {
            _id: await nextSeq("reply"),
            user: {
              _id: 2,
              name: "박선영",
              image: "user-jayg.webp",
            },
            content: "SUP 진짜 재밌죠! 저도 다음 달에 가요ㅎㅎ",
            createdAt: getTime(),
            updatedAt: getTime(),
          },
        ],
      },
      {
        _id: await nextSeq("post"),
        parent_id: 1,
        type: "reviewPlace",
        // reviewDaily
        // reviewPlace
        views: 51,
        user: {
          _id: 4,
          name: "송아현",
          image: `files/${clientId}/user-neo.png`,
        },
        title: "예술과 골목의 풍경 감천문화마을",
        content:
          "감천문화마을은 예술가들의 손길이 곳곳에 느껴져서 골목을 걷는 재미가 있어요. 각 계단마다 설치된 아트워크가 다 달라서 걷는 내내 새로웠어요! 전망대에서 보는 도시 뷰도 멋졌답니다ㅎㅎ",

        starRate: 4,
        createdAt: getTime(),
        updatedAt: getTime(),
        extra: {
          date: "2025-06-24",
          images: [
            `files/${clientId}/user-neo.png`,
            `files/${clientId}/user-neo.png`,
            `files/${clientId}/user-neo.png`,
          ],
          tags: ["감천마을", "벤치아트", "포토스팟"],
        },
        replies: [
          {
            _id: await nextSeq("reply"),
            user: {
              _id: 2,
              name: "박선영",
              image: "user-jayg.webp",
            },
            content: "감천은 색감이 진짜 예술이죠👍",
            createdAt: getTime(),
            updatedAt: getTime(),
          },
          {
            _id: await nextSeq("reply"),
            user: {
              _id: 1,
              name: "문서인",
              image: "user-jayg.webp",
            },
            content: "계단마다 포토존! 다음엔 꼭 가볼래요ㅎㅎ",
            createdAt: getTime(),
            updatedAt: getTime(),
          },
        ],
      },
    ],

    // 코드
    code: [],

    // 설정
    config: [],
  };
};

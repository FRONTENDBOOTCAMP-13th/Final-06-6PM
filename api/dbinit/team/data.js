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
      {
        _id: await nextSeq("post"),
        type: "plan",
        views: 23,
        user: {
          _id: 2,
          name: "박선영",
          image: `/files/${clientId}/user-neo.png`,
        },
        title: "제주도 2박 3일",
        createdAt: getTime(-1, -60 * 60 * 14),
        updatedAt: getTime(-1, -60 * 60 * 2),
        extra: {
          startDate: "2025-07-12",
          endDate: "2025-08-12",
        },
        replies: [
          {
            _id: await nextSeq("reply"),
            content: "1일차입니다",
            day: 1,
            planDate: "2024-01-01",
            locations: [
              {
                title: "성산일출봉",
                types: "관광",
                contentId: "123123123",
                mapx: "128.6506352387",
                mapy: "35.8826195757",
              },
              {
                title: "성산일출봉",
                types: "관광",
                contentId: "123123123",
                mapx: "128.6506352387",
                mapy: "35.8826195757",
              },
              {
                title: "성산일출봉",
                types: "관광",
                contentId: "123123123",
                mapx: "128.6506352387",
                mapy: "35.8826195757",
              },
            ],
          },
          {
            _id: await nextSeq("reply"),
            content: "2일차입니다",
            day: 2,
            planDate: "2024-01-01",
            locations: [
              {
                title: "성산일출봉",
                types: "관광",
                contentId: "123123123",
                mapx: "128.6506352387",
                mapy: "35.8826195757",
              },
              {
                title: "성산일출봉",
                types: "관광",
                contentId: "123123123",
                mapx: "128.6506352387",
                mapy: "35.8826195757",
              },
              {
                title: "성산일출봉",
                types: "관광",
                contentId: "123123123",
                mapx: "128.6506352387",
                mapy: "35.8826195757",
              },
            ],
          },
          {
            _id: await nextSeq("reply"),
            content: "3일차입니다",
            day: 3,
            planDate: "2024-01-01",
            locations: [
              {
                title: "성산일출봉",
                types: "관광",
                contentId: "123123123",
                mapx: "128.6506352387",
                mapy: "35.8826195757",
              },
              {
                title: "성산일출봉",
                types: "관광",
                contentId: "123123123",
                mapx: "128.6506352387",
                mapy: "35.8826195757",
              },
              {
                title: "성산일출봉",
                types: "관광",
                contentId: "123123123",
                mapx: "128.6506352387",
                mapy: "35.8826195757",
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
          _id: 1,
          name: "문서인",
          image: `/files/${clientId}/user-neo.png`,
        },
        title: "서울 1박 2일",
        createdAt: getTime(-1, -60 * 60 * 14),
        updatedAt: getTime(-1, -60 * 60 * 2),
        extra: {
          startDate: "2025-02-12",
          endDate: "2025-09-12",
        },
        replies: [
          {
            _id: await nextSeq("reply"),
            content: "1일차입니다",
            day: 1,
            planDate: "2024-01-01",
            locations: [
              {
                title: "남산타워",
                types: "관광",
                contentId: "123123123",
                mapx: "128.6506352387",
                mapy: "35.8826195757",
              },
              {
                title: "남산타워",
                types: "관광",
                contentId: "123123123",
                mapx: "128.6506352387",
                mapy: "35.8826195757",
              },
              {
                title: "남산타워",
                types: "관광",
                contentId: "123123123",
                mapx: "128.6506352387",
                mapy: "35.8826195757",
              },
            ],
          },
          {
            _id: await nextSeq("reply"),
            content: "2일차입니다",
            day: 2,
            planDate: "2024-01-01",
            locations: [
              {
                title: "남산타워",
                types: "관광",
                contentId: "123123123",
                mapx: "128.6506352387",
                mapy: "35.8826195757",
              },
              {
                title: "남산타워",
                types: "관광",
                contentId: "123123123",
                mapx: "128.6506352387",
                mapy: "35.8826195757",
              },
              {
                title: "남산타워",
                types: "관광",
                contentId: "123123123",
                mapx: "128.6506352387",
                mapy: "35.8826195757",
              },
            ],
          },
          {
            _id: await nextSeq("reply"),
            content: "3일차입니다",
            day: 3,
            planDate: "2024-01-01",
            locations: [
              {
                title: "남산타워",
                types: "관광",
                contentId: "123123123",
                mapx: "128.6506352387",
                mapy: "35.8826195757",
              },
              {
                title: "남산타워",
                types: "관광",
                contentId: "123123123",
                mapx: "128.6506352387",
                mapy: "35.8826195757",
              },
              {
                title: "남산타워",
                types: "관광",
                contentId: "123123123",
                mapx: "128.6506352387",
                mapy: "35.8826195757",
              },
            ],
          },
        ],
      },

      {
        _id: await nextSeq("post"),
        type: "reviewAll",
        parent_id: 1,
        // reviewDaily
        // reviewPlace
        views: 23,
        user: {
          _id: 2,
          name: "박선영",
          image: `files/${clientId}/user-neo.png`,
        },
        title: "제주도 2박 3일 후기",
        content: "제주도 좋아요",
        images: [
          `files/${clientId}/user-neo.png`,
          `files/${clientId}/user-neo.png`,
          `files/${clientId}/user-neo.png`,
        ],
        tags: ["떠나요", "제주도", "돌하르방"],
        starRate: 5,
        createdAt: getTime(-1, -60 * 60 * 14),
        updatedAt: getTime(-1, -60 * 60 * 2),
        extra: {
          startDate: "2025-07-12",
          endDate: "2025-08-12",
        },
        replies: [
          {
            _id: await nextSeq("reply"),
            user: {
              _id: 1,
              name: "문서인",
              image: "user-jayg.webp",
            },
            content: "제주도 부러워요 재밌겠다 ㅠㅠ",
            createdAt: getTime(-2, -60 * 60 * 10),
            updatedAt: getTime(-2, -60 * 60 * 1),
          },
          {
            _id: await nextSeq("reply"),
            user: {
              _id: 5,
              name: "남주성",
              image: "user-jayg.webp",
            },
            content: "돌하르방 ㅎㅎㅎ",
            createdAt: getTime(-2, -60 * 60 * 10),
            updatedAt: getTime(-2, -60 * 60 * 1),
          },
        ],
      },

      {
        _id: await nextSeq("post"),
        parent_id: 2,
        type: "reviewAll",
        // reviewDaily
        // reviewPlace
        views: 23,
        user: {
          _id: 1,
          name: "문서인",
          image: `files/${clientId}/user-neo.png`,
        },
        title: "문서인 2박 3일 후기",
        content: "힐링",
        images: [
          `files/${clientId}/user-neo.png`,
          `files/${clientId}/user-neo.png`,
          `files/${clientId}/user-neo.png`,
        ],
        tags: ["문서인", "담양", "전주"],
        starRate: 5,
        createdAt: getTime(-1, -60 * 60 * 14),
        updatedAt: getTime(-1, -60 * 60 * 2),
        extra: {
          startDate: "2025-06-12",
          endDate: "2025-06-21",
        },
        replies: [
          {
            _id: await nextSeq("reply"),
            user: {
              _id: 1,
              name: "문서인",
              image: "user-jayg.webp",
            },
            content: "서울 가봤나요",
            createdAt: getTime(-2, -60 * 60 * 10),
            updatedAt: getTime(-2, -60 * 60 * 1),
          },
          {
            _id: await nextSeq("reply"),
            user: {
              _id: 5,
              name: "남주성",
              image: "user-jayg.webp",
            },
            content: "서울에 뭐있음 ㅠ ㅠ?",
            createdAt: getTime(-2, -60 * 60 * 10),
            updatedAt: getTime(-2, -60 * 60 * 1),
          },
        ],
      },

      {
        _id: await nextSeq("post"),
        parent_id: 1,
        type: "reviewDaily",
        // reviewDaily
        // reviewPlace
        views: 23,
        user: {
          _id: 2,
          name: "박선영",
          image: `files/${clientId}/user-neo.png`,
        },
        title: "제주도 EEEEE를위한코스",
        content: "파워E여도 에너지 다 빨릴 수 있음ㅎㅎㅎㅎㅎ",

        starRate: 5,
        createdAt: getTime(-1, -60 * 60 * 14),
        updatedAt: getTime(-1, -60 * 60 * 2),
        extra: {
          date: "2025-07-13",
          images: [
            `files/${clientId}/user-neo.png`,
            `files/${clientId}/user-neo.png`,
            `files/${clientId}/user-neo.png`,
          ],
          tags: ["루지", "승마체험", "서핑"],
        },
        replies: [
          {
            _id: await nextSeq("reply"),
            user: {
              _id: 1,
              name: "문서인",
              image: "user-jayg.webp",
            },
            content: "루지도 부러워요 재밌겠다 ㅠㅠ",
            createdAt: getTime(-2, -60 * 60 * 10),
            updatedAt: getTime(-2, -60 * 60 * 1),
          },
          {
            _id: await nextSeq("reply"),
            user: {
              _id: 5,
              name: "남주성",
              image: "user-jayg.webp",
            },
            content: "루지 나는 타봤는뎅 ㅎㅎㅎ",
            createdAt: getTime(-2, -60 * 60 * 10),
            updatedAt: getTime(-2, -60 * 60 * 1),
          },
        ],
      },

      {
        _id: await nextSeq("post"),
        parent_id: 1,
        type: "reviewDaily",
        // reviewDaily
        // reviewPlace
        views: 23,
        user: {
          _id: 2,
          name: "박선영",
          image: `files/${clientId}/user-neo.png`,
        },
        title: "제주 산책",
        content: "제주나들이 좋아요",

        starRate: 5,
        createdAt: getTime(-1, -60 * 60 * 14),
        updatedAt: getTime(-1, -60 * 60 * 2),
        extra: {
          date: "2025-07-18",
          images: [
            `files/${clientId}/user-neo.png`,
            `files/${clientId}/user-neo.png`,
            `files/${clientId}/user-neo.png`,
          ],
          tags: ["한강", "치킨", "자전거"],
        },
        replies: [
          {
            _id: await nextSeq("reply"),
            user: {
              _id: 1,
              name: "문서인",
              image: "user-jayg.webp",
            },
            content: "이 날씨에 한강이요?",
            createdAt: getTime(-2, -60 * 60 * 10),
            updatedAt: getTime(-2, -60 * 60 * 1),
          },
          {
            _id: await nextSeq("reply"),
            user: {
              _id: 3,
              name: "차형주",
              image: "user-jayg.webp",
            },
            content: "왜 3번인데ㅠㅠ",
            createdAt: getTime(-2, -60 * 60 * 10),
            updatedAt: getTime(-2, -60 * 60 * 1),
          },
        ],
      },

      {
        _id: await nextSeq("post"),
        parent_id: 1,
        type: "reviewPlace",
        // reviewDaily
        // reviewPlace
        views: 32,
        user: {
          _id: 2,
          name: "박선영",
          image: `files/${clientId}/user-neo.png`,
        },
        title: "최고의 빵맛집",
        content: "런던베이글 제주점 ㅠㅎㅎㅎㅎㅎ",

        starRate: 5,
        createdAt: getTime(-1, -60 * 60 * 14),
        updatedAt: getTime(-1, -60 * 60 * 2),
        extra: {
          date: "2025-07-20",
          images: [
            `files/${clientId}/user-neo.png`,
            `files/${clientId}/user-neo.png`,
            `files/${clientId}/user-neo.png`,
          ],
          tags: ["여름에시원할듯", "ㅋㅋㅋ", "배고픈가ㅠ"],
        },
        replies: [
          {
            _id: await nextSeq("reply"),
            user: {
              _id: 1,
              name: "문서인",
              image: "user-jayg.webp",
            },
            content: "동굴???????ㅋ",
            createdAt: getTime(-2, -60 * 60 * 10),
            updatedAt: getTime(-2, -60 * 60 * 1),
          },
          {
            _id: await nextSeq("reply"),
            user: {
              _id: 3,
              name: "차형주",
              image: "user-jayg.webp",
            },
            content: "시원할듯요",
            createdAt: getTime(-2, -60 * 60 * 10),
            updatedAt: getTime(-2, -60 * 60 * 1),
          },
        ],
      },

      {
        _id: await nextSeq("post"),
        parent_id: 1,
        type: "reviewPlace",
        // reviewDaily
        // reviewPlace
        views: 32,
        user: {
          _id: 2,
          name: "박선영",
          image: `files/${clientId}/user-neo.png`,
        },
        title: "이호테우해변",
        content: "이호테우해변 이쁨",

        starRate: 5,
        createdAt: getTime(-1, -60 * 60 * 14),
        updatedAt: getTime(-1, -60 * 60 * 2),
        extra: {
          date: "2025-07-20",
          images: [
            `files/${clientId}/user-neo.png`,
            `files/${clientId}/user-neo.png`,
            `files/${clientId}/user-neo.png`,
          ],
          tags: ["이호테우해변", "바다"],
        },
        replies: [
          {
            _id: await nextSeq("reply"),
            user: {
              _id: 1,
              name: "문서인",
              image: "user-jayg.webp",
            },
            content: "이호테우해변  오..",
            createdAt: getTime(-2, -60 * 60 * 10),
            updatedAt: getTime(-2, -60 * 60 * 1),
          },
          {
            _id: await nextSeq("reply"),
            user: {
              _id: 3,
              name: "차형주",
              image: "user-jayg.webp",
            },
            content: "오..",
            createdAt: getTime(-2, -60 * 60 * 10),
            updatedAt: getTime(-2, -60 * 60 * 1),
          },
        ],
      },

      {
        _id: await nextSeq("post"),
        parent_id: 2,
        type: "reviewPlace",
        // reviewDaily
        // reviewPlace,

        views: 322,
        user: {
          _id: 1,
          name: "문서인",
          image: `files/${clientId}/user-neo.png`,
        },
        title: "광명동굴 ㄱㄱ",
        content: "서울근처임..서울임.....ㅎㅎ;;",

        starRate: 5,
        createdAt: getTime(-1, -60 * 60 * 14),
        updatedAt: getTime(-1, -60 * 60 * 2),
        extra: {
          date: "2025-07-10",
          images: [
            `files/${clientId}/user-neo.png`,
            `files/${clientId}/user-neo.png`,
            `files/${clientId}/user-neo.png`,
          ],
          tags: ["여름에시원할듯", "2시간정도?", "동굴"],
        },
        replies: [
          {
            _id: await nextSeq("reply"),
            user: {
              _id: 2,
              name: "박선영",
              image: "user-jayg.webp",
            },
            content: "ㅇㅈㅇㅈ",
            createdAt: getTime(-2, -60 * 60 * 10),
            updatedAt: getTime(-2, -60 * 60 * 1),
          },
          {
            _id: await nextSeq("reply"),
            user: {
              _id: 3,
              name: "차형주",
              image: "user-jayg.webp",
            },
            content: "ㅇㅈㅇㅈ22",
            createdAt: getTime(-2, -60 * 60 * 10),
            updatedAt: getTime(-2, -60 * 60 * 1),
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

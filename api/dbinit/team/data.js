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
      //여행 계획
      // 1박2일
      {
        _id: await nextSeq("post"),
        plan_id: 1,
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
      //2박3일
      {
        _id: await nextSeq("post"),
        plan_id: 2,
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
      //3박4일
      {
        _id: await nextSeq("post"),
        plan_id: 3,
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


      //후기
      //후기
      //1박 2일 서울all후기
      {
        _id: await nextSeq("post"),
        plan_id: 1,
        type: "reviewAll",
        views: 89,
        user: {
          _id: 1,
          name: "문서인",
          image: `files/${clientId}/user-neo.png`,
        },
        title: "서울에서 1박 2일",
        content:
          "짧지만 알찬 서울 여행이었어요! 첫날에는 경복궁에서 조선왕조의 웅장한 역사를 느끼고, 북촌한옥마을의 고즈넉한 골목길을 거닐며 전통의 아름다움에 빠졌어요. 인사동에서는 전통차를 마시며 여유로운 시간을 보냈고, 둘째 날에는 여의도 한강공원에서 상쾌한 아침을 맞이한 후 명동에서 쇼핑과 맛집 탐방을 즐겼답니다. 마지막으로 남산서울타워에서 서울 전경을 내려다보며 여행을 마무리했는데, 비록 짧은 일정이었지만 서울의 매력을 제대로 느낄 수 있었어요!",
        images: [
          `files/${clientId}/user-neo.png`,
        ],
        tags: ["서울", "궁궐투어", "한옥마을", "도심여행"],
        starRate: 4,
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
            content: "북촌한옥마을 정말 예쁘죠! 한복 입고 사진 찍으면 더 예뻐요~",
            createdAt: getTime(),

          },
        ],
      },
      //1박 2일 서울daily후기 1일차, 2일차
      {
        _id: await nextSeq("post"),
        plan_id: 1,
        type: "reviewDaily",
        views: 67,
        user: {
          _id: 1,
          name: "문서인",
          image: `files/${clientId}/user-neo.png`,
        },
        title: "전통의 향기 가득한 서울 1일차",
        content:
          "서울 여행 첫날은 전통문화 투어로 시작했어요! 경복궁에서 수문장 교대식을 보는 것부터 정말 인상 깊었고, 광화문부터 근정전까지 이어지는 웅장한 건축물들에 감탄했답니다. 북촌한옥마을은 정말 서울의 숨은 보석 같은 곳이었어요. 예쁜 한옥들 사이로 난 골목길을 걸으니 마치 조선시대로 시간여행을 온 듯한 기분이었어요. 인사동에서는 전통찻집에서 차를 마시며 하루를 마무리했는데, 정말 힐링되는 시간이었답니다!",

        starRate: 5,
        createdAt: getTime(),
        updatedAt: getTime(),
        extra: {
          date: "2025-06-25",
          images: [
            `files/${clientId}/user-neo.png`,
          ],
          tags: ["경복궁", "북촌한옥마을", "인사동", "전통문화"],
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
              "수문장 교대식 정말 볼 만하죠! 시간 맞춰서 가야 하는데 꼭 보세요!",
            createdAt: getTime(),
          },
          {
            _id: await nextSeq("reply"),
            user: {
              _id: 4,
              name: "송아현",
              image: "user-jayg.webp",
            },
            content:
              "인사동 전통찻집 추천해주세요! 어디가 제일 좋았나요??",
            createdAt: getTime(),
          },
        ],
      },
      {
        _id: await nextSeq("post"),
        plan_id: 1,
        type: "reviewDaily",
        views: 124,
        user: {
          _id: 1,
          name: "문서인",
          image: `files/${clientId}/user-neo.png`,
        },
        title: "현대적 매력의 서울 2일차",
        content:
          "둘째 날은 서울의 현대적인 면모를 만끽하는 하루였어요! 여의도 한강공원에서 아침 산책을 하며 상쾌하게 하루를 시작했는데, 한강의 시원한 바람과 탁 트인 풍경이 정말 좋았어요. 명동은 역시 서울의 대표 쇼핑 거리답게 볼거리, 먹거리가 가득했고 특히 명동교자 만두가 정말 맛있었답니다! 마지막으로 남산서울타워에서 본 서울 야경은 정말 환상적이었어요. 케이블카를 타고 올라가는 것도 재미있었고, 전망대에서 내려다본 서울의 불빛들이 너무 아름다웠어요!",

        starRate: 4,
        createdAt: getTime(),
        updatedAt: getTime(),
        extra: {
          date: "2025-06-26",
          images: [
            `files/${clientId}/user-neo.png`,
          ],
          tags: ["여의도한강공원", "명동쇼핑", "남산서울타워", "야경"],
        },
        replies: [
          {
            _id: await nextSeq("reply"),
            user: {
              _id: 5,
              name: "남주성",
              image: "user-jayg.webp",
            },
            content: "남산타워 야경 정말 예쁘죠! 데이트 코스로도 완벽해요ㅎㅎ",
            createdAt: getTime(),
          },
        ],
      },
      //1박 2일 서울place후기
      {
        _id: await nextSeq("post"),
        plan_id: 1,
        type: "reviewPlace",
        views: 178,
        user: {
          _id: 1,
          name: "문서인",
          image: `files/${clientId}/user-neo.png`,
        },
        title: "조선왕조의 위엄을 느끼다! 경복궁",
        content:
          "경복궁은 정말 서울 여행 필수 코스예요! 광화문에서 시작해서 근정전, 경회루까지 이어지는 동선이 정말 웅장하고 아름다워요. 특히 수문장 교대식은 꼭 시간 맞춰서 보시길 추천해요! 조선시대 궁궐의 위엄과 아름다움을 제대로 느낄 수 있는 곳이었답니다. 한복 대여해서 입고 다니면 더욱 특별한 경험을 할 수 있어요!",

        starRate: 5,
        createdAt: getTime(),
        updatedAt: getTime(),
        extra: {
          date: "2025-06-25",
          images: [
            `files/${clientId}/user-neo.png`,
          ],
          tags: ["경복궁", "수문장교대식", "한복체험"],
        },
        replies: [
          {
            _id: await nextSeq("reply"),
            user: {
              _id: 2,
              name: "박선영",
              image: "user-jayg.webp",
            },
            content: "한복 입고 경복궁 가면 정말 예쁜 사진 많이 나와요!! 추천이에요~",
            createdAt: getTime(),
          },
        ],
      },
      {
        _id: await nextSeq("post"),
        plan_id: 1,
        type: "reviewPlace",
        views: 156,
        user: {
          _id: 1,
          name: "문서인",
          image: `files/${clientId}/user-neo.png`,
        },
        title: "시간이 멈춘 듯한 북촌한옥마을",
        content:
          "북촌한옥마을은 정말 서울의 숨은 보석이에요! 전통 한옥들이 잘 보존되어 있어서 걷는 것만으로도 힐링이 되고, 골목골목마다 예쁜 카페와 갤러리들이 숨어 있어서 구경하는 재미가 있어요. 특히 북촌 8경을 따라 걸으면서 서울 도심의 한옥 풍경을 감상할 수 있어서 좋았어요. 조용한 주택가라서 소음에 주의하면서 다녀야 해요!",

        starRate: 4,
        createdAt: getTime(),
        updatedAt: getTime(),
        extra: {
          date: "2025-06-25",
          images: [
            `files/${clientId}/user-neo.png`,
          ],
          tags: ["북촌한옥마을", "북촌8경", "한옥카페"],
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
              "북촌에 예쁜 카페들이 많더라구요! 한옥 카페에서 차 마시는 거 추천해요~",
            createdAt: getTime(),
          },
          {
            _id: await nextSeq("reply"),
            user: {
              _id: 4,
              name: "송아현",
              image: "user-jayg.webp",
            },
            content: "북촌 8경 다 돌아보셨나요?? 어디가 제일 예뻤어요?",
            createdAt: getTime(),
          },
          {
            _id: await nextSeq("reply"),
            user: {
              _id: 5,
              name: "남주성",
              image: "user-jayg.webp",
            },
            content: "주택가라서 조용히 다녀야 한다는 팁 감사해요! 꼭 기억할게요",
            createdAt: getTime(),
          },
        ],
      },

      //2박 3일 울산all후기
      {
        _id: await nextSeq("post"),
        plan_id: 2,
        type: "reviewAll",
        views: 127,
        user: {
          _id: 4,
          name: "송아현",
          image: `files/${clientId}/user-neo.png`,
        },
        title: "울산에서 2박 3일",
        content:
          "울산은 자연과 역사, 그리고 현대가 완벽하게 조화를 이루는 도시였어요! 첫날에는 대왕암공원에서 웅장한 바다 풍경을 만끽하고, 울산대공원에서 여유로운 시간을 보낸 뒤 울산박물관에서 이 지역의 깊은 역사를 배웠어요. 둘째 날은 간절곶에서 일출의 감동을 느끼고, 태화강 국가정원의 아름다운 자연 속에서 힐링한 후 암각화박물관에서 선사시대 문화를 체험했습니다. 마지막 날엔 반구대 암각화의 역사적 가치를 느끼고, 장생포 고래문화마을에서 울산만의 독특한 문화를 경험한 뒤 진하해수욕장에서 시원한 바다를 만끽하며 여행을 마무리했어요.",
        images: [
          `files/${clientId}/user-neo.png`,
        ],
        tags: ["울산", "자연여행", "역사탐방"],
        starRate: 5,
        createdAt: getTime(),
        updatedAt: getTime(),
        extra: {
          startDate: "2025-08-03",
          endDate: "2025-08-05",
        },
        replies: [
          {
            _id: await nextSeq("reply"),
            user: {
              _id: 1,
              name: "문서인",
              image: "user-jayg.webp",
            },
            content: "간절곶 일출 정말 유명하죠! 저도 꼭 가보고 싶어요!",
            createdAt: getTime(),
          },
        ],
      },
      //2박 3일 울산daily후기 1일차, 2일차, 3일차
      {
        _id: await nextSeq("post"),
        plan_id: 2,
        type: "reviewDaily",
        views: 89,
        user: {
          _id: 4,
          name: "송아현",
          image: `files/${clientId}/user-neo.png`,
        },
        title: "바다와 역사의 울산 1일차",
        content:
          "대왕암공원에서 시작한 울산 여행! 기암괴석과 푸른 바다가 만나는 절경이 정말 장관이었어요. 특히 대왕암까지 이어지는 산책로가 너무 아름다워서 사진을 엄청 많이 찍었답니다. 울산대공원은 정말 넓고 잘 조성되어 있어서 가족 단위로 오기 좋을 것 같았고, 울산박물관에서는 울산의 과거부터 현재까지의 모습을 한눈에 볼 수 있어서 의미 있는 시간이었어요.",

        starRate: 4,
        createdAt: getTime(),
        updatedAt: getTime(),
        extra: {
          date: "2025-08-03",
          images: [
            `files/${clientId}/user-neo.png`,
          ],
          tags: ["대왕암공원", "울산대공원", "울산박물관"],
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
              "대왕암공원 정말 예쁘죠!!! 저도 가서 사진 많이 찍었는데 어디서 찍어도 포토존이에요!!",
            createdAt: getTime(),
          },
          {
            _id: await nextSeq("reply"),
            user: {
              _id: 5,
              name: "남주성",
              image: "user-jayg.webp",
            },
            content:
              "울산대공원은 정말 넓어서 하루 종일 있어도 좋을 것 같아요ㅎㅎ",
            createdAt: getTime(),
          },
        ],
      },
      {
        _id: await nextSeq("post"),
        plan_id: 2,
        type: "reviewDaily",
        views: 156,
        user: {
          _id: 4,
          name: "송아현",
          image: `files/${clientId}/user-neo.png`,
        },
        title: "일출과 자연의 울산 2일차",
        content:
          "간절곶에서 본 일출은 정말 잊을 수 없을 만큼 감동적이었어요! 한반도에서 가장 먼저 해가 뜨는 곳이라는 특별함도 있고, 등대와 함께 어우러진 풍경이 너무 아름다웠답니다. 태화강 국가정원은 정말 힐링 그 자체였어요. 특히 대나무숲길이 너무 운치 있고, 강변을 따라 걷는 산책로도 정말 좋았어요. 울산암각화박물관에서는 선사시대 사람들의 생활상을 엿볼 수 있어서 교육적으로도 의미 있는 시간이었습니다.",

        starRate: 5,
        createdAt: getTime(),
        updatedAt: getTime(),
        extra: {
          date: "2025-08-04",
          images: [
            `files/${clientId}/user-neo.png`,
          ],
          tags: ["간절곶", "태화강국가정원", "암각화박물관"],
        },
        replies: [
          {
            _id: await nextSeq("reply"),
            user: {
              _id: 3,
              name: "차형주",
              image: "user-jayg.webp",
            },
            content: "간절곶 일출 보러 일찍 일어나셨겠어요! 대단하시네요ㅎㅎ",
            createdAt: getTime(),
          },
        ],
      },
      //2박 3일 울산place후기
      {
        _id: await nextSeq("post"),
        plan_id: 2,
        type: "reviewPlace",
        views: 134,
        user: {
          _id: 4,
          name: "송아현",
          image: `files/${clientId}/user-neo.png`,
        },
        title: "한반도 최동단의 감동 간절곶",
        content:
          "간절곶은 정말 특별한 곳이에요! 한반도에서 가장 먼저 해가 뜨는 곳이라는 의미도 크고, 등대와 바다가 어우러진 풍경이 너무 아름다웠어요. 특히 일출 시간에 맞춰 가면 정말 감동적인 순간을 경험할 수 있답니다. 주변에 산책로도 잘 조성되어 있어서 여유롭게 둘러보기 좋아요.",

        starRate: 5,
        createdAt: getTime(),
        updatedAt: getTime(),
        extra: {
          date: "2025-08-04",
          images: [
            `files/${clientId}/user-neo.png`,
          ],
          tags: ["간절곶", "일출명소"],
        },
        replies: [
          {
            _id: await nextSeq("reply"),
            user: {
              _id: 1,
              name: "문서인",
              image: "user-jayg.webp",
            },
            content: "일출 보러 가고 싶은데 몇 시쯤 가야 하나요??",
            createdAt: getTime(),
          },
        ],
      },
      {
        _id: await nextSeq("post"),
        plan_id: 2,
        type: "reviewPlace",
        views: 98,
        user: {
          _id: 4,
          name: "송아현",
          image: `files/${clientId}/user-neo.png`,
        },
        title: "도심 속 자연 힐링 태화강 국가정원",
        content:
          "태화강 국가정원은 정말 울산의 보석 같은 곳이에요! 강을 따라 조성된 산책로가 너무 아름답고, 특히 대나무숲 구간은 마치 다른 세계에 온 듯한 느낌이었어요. 계절마다 다른 꽃들을 볼 수 있고, 가족 단위로 피크닉하기에도 완벽한 장소랍니다. 도심에서 이런 자연을 만날 수 있다는 게 정말 행복했어요.",

        starRate: 5,
        createdAt: getTime(),
        updatedAt: getTime(),
        extra: {
          date: "2025-08-04",
          images: [
            `files/${clientId}/user-neo.png`,
          ],
          tags: ["태화강국가정원", "대나무숲", "힐링명소"],
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
              "대나무숲이 정말 예쁘겠어요! 저도 다음에 울산 가면 꼭 가볼게요!!",
            createdAt: getTime(),
          },
          {
            _id: await nextSeq("reply"),
            user: {
              _id: 3,
              name: "차형주",
              image: "user-jayg.webp",
            },
            content: "피크닉하기 좋다니 가족여행으로 딱이겠네요~",
            createdAt: getTime(),
          },
          {
            _id: await nextSeq("reply"),
            user: {
              _id: 5,
              name: "남주성",
              image: "user-jayg.webp",
            },
            content: "울산에 이런 좋은 곳이 있는 줄 몰랐어요. 정보 감사합니다!",
            createdAt: getTime(),
          },
        ],
      },

      //3박 4일 전주all후기
      {
        _id: await nextSeq("post"),
        plan_id: 3,
        type: "reviewAll",
        views: 203,
        user: {
          _id: 2,
          name: "박선영",
          image: `files/${clientId}/user-neo.png`,
        },
        title: "전주에서 만난 한국의 아름다운 전통",
        content:
          "전주 여행은 정말 특별한 경험이었어요! 한옥마을에서 시작해서 경기전, 전동성당 등 역사적인 장소들을 둘러보며 우리나라의 깊은 문화를 느낄 수 있었고, 전통 공예와 한지 체험도 정말 재미있었어요. 특히 남부시장의 푸짐한 먹거리와 자만마을의 아기자기한 벽화들이 인상 깊었고, 공원에서의 여유로운 시간과 예술 공간들에서의 문화 체험까지! 전주는 정말 볼거리, 먹거리, 체험거리가 가득한 완벽한 여행지였답니다.",
        images: [
          `files/${clientId}/user-neo.png`,
        ],
        tags: ["전주", "한옥마을", "전통문화", "힐링여행"],
        starRate: 5,
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
            content: "저도 전주 다녀왔는데 정말 좋더라구요! 특히 한지 체험 재미있죠ㅎㅎ",
            createdAt: getTime(),
          },
          {
            _id: await nextSeq("reply"),
            user: {
              _id: 5,
              name: "남주성",
              image: "user-jayg.webp",
            },
            content: "전주 먹거리도 정말 맛있고 볼거리도 많아서 또 가고 싶어요!",
            createdAt: getTime(),
          },
        ],
      },
      //3박 4일 전주daily후기 1일차, 2일차
      {
        _id: await nextSeq("post"),
        plan_id: 3,
        type: "reviewDaily",
        views: 167,
        user: {
          _id: 2,
          name: "박선영",
          image: `files/${clientId}/user-neo.png`,
        },
        title: "한옥의 매력에 빠져드는! 전주 1일차 여행",
        content:
          "전주 첫날은 정말 완벽했어요! 한옥마을 입구부터 느껴지는 전통의 향기가 마음을 설레게 하더라구요. 경기전에서는 조선왕조의 역사를 느낄 수 있었고, 전동성당의 아름다운 건축미에 감탄했어요. 풍남문을 지나 오목대까지 이어지는 길은 마치 타임머신을 탄 듯한 기분이었답니다. 한복 입고 걸으니 더욱 특별했어요!",

        starRate: 5,
        createdAt: getTime(),
        updatedAt: getTime(),
        extra: {
          date: "2025-06-15",
          images: [
            `files/${clientId}/user-neo.png`,
          ],
          tags: ["한옥마을", "경기전", "전동성당", "한복체험"],
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
              "한복 체험하고 사진 찍으면 진짜 예쁘게 나오죠! 저도 했는데 추억이에요ㅎㅎ",
            createdAt: getTime(),
          },
          {
            _id: await nextSeq("reply"),
            user: {
              _id: 4,
              name: "송아현",
              image: "user-jayg.webp",
            },
            content: "전동성당 건축이 정말 아름답죠! 야경도 너무 예뻐요~",
            createdAt: getTime(),
          },
        ],
      },
      {
        _id: await nextSeq("post"),
        plan_id: 3,
        type: "reviewDaily",
        views: 134,
        user: {
          _id: 2,
          name: "박선영",
          image: `files/${clientId}/user-neo.png`,
        },
        title: "전통 공예의 매력 발견! 전주 2일차 여행",
        content:
          "둘째 날은 전주의 전통 문화를 깊이 체험하는 하루였어요! 전주향교에서 고즈넉한 분위기를 만끽하고, 공예품전시관에서 섬세한 전통 공예품들을 구경하는 재미가 있었어요. 특히 한지원에서 직접 한지 만들기 체험을 해봤는데 생각보다 어렵지만 너무 재미있었답니다! 남부시장에서 맛본 전주 비빔밥과 콩나물국밥은 정말 일품이었고, 자만마을의 예쁜 벽화들 앞에서 인증샷도 많이 찍었어요ㅎㅎ",

        starRate: 4,
        createdAt: getTime(),
        updatedAt: getTime(),
        extra: {
          date: "2025-06-16",
          images: [
            `files/${clientId}/user-neo.png`,
          ],
          tags: ["전주향교", "한지체험", "남부시장맛집", "자만마을"],
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
              "한지 만들기 체험 정말 신기하죠! 저도 해봤는데 은근 집중하게 되더라구요~",
            createdAt: getTime(),
          },
          {
            _id: await nextSeq("reply"),
            user: {
              _id: 1,
              name: "문서인",
              image: "user-jayg.webp",
            },
            content: "남부시장 비빔밥 정말 맛있어요!! 전주 가면 꼭 먹어야 하는 음식인 것 같아요ㅠㅠ",
            createdAt: getTime(),
          },
          {
            _id: await nextSeq("reply"),
            user: {
              _id: 3,
              name: "차형주",
              image: "user-jayg.webp",
            },
            content:
              "자만마을 벽화 정말 알록달록 예쁘죠! 사진 찍기 좋은 곳이 많아서 좋아요",
            createdAt: getTime(),
          },
        ],
      },
      //3박 4일 전주place후기
      {
        _id: await nextSeq("post"),
        plan_id: 3,
        type: "reviewPlace",
        views: 245,
        user: {
          _id: 2,
          name: "박선영",
          image: `files/${clientId}/user-neo.png`,
        },
        title: "전주 여행 필수 코스! 전주한옥마을",
        content:
          "전주한옥마을은 정말 전주 여행의 하이라이트예요! 전통 한옥들이 잘 보존되어 있어서 걸어다니는 것만으로도 힐링이 되고, 한복 대여점도 많아서 한복 체험하기 좋아요. 골목골목마다 숨어있는 전통차 집과 디저트 카페들도 너무 매력적이고, 무엇보다 야경이 정말 아름다워서 밤에도 꼭 가보시길 추천해요!",

        starRate: 5,
        createdAt: getTime(),
        updatedAt: getTime(),
        extra: {
          date: "2025-06-15",
          images: [
            `files/${clientId}/user-neo.png`,
          ],
          tags: ["전주한옥마을", "한복체험", "전통차", "야경"],
        },
      },
      {
        _id: await nextSeq("post"),
        plan_id: 3,
        type: "reviewPlace",
        views: 156,
        user: {
          _id: 2,
          name: "박선영",
          image: `files/${clientId}/user-neo.png`,
        },
        title: "전주 맛집의 성지! 남부시장",
        content:
          "남부시장은 정말 전주의 진짜 맛을 느낄 수 있는 곳이에요! 비빔밥, 콩나물국밥은 기본이고 떡갈비, 한정식까지 정말 다양한 전주 전통 음식을 맛볼 수 있어요. 시장 아주머니들도 너무 친절하시고, 가격도 합리적이라 부담 없이 여러 가지 음식을 시도해볼 수 있어서 좋았어요! 전주 가면 꼭 들러야 할 필수 코스예요!!",

        starRate: 5,
        createdAt: getTime(),
        updatedAt: getTime(),
        extra: {
          date: "2025-06-16",
          images: [
            `files/${clientId}/user-neo.png`,
          ],
          tags: ["남부시장", "전주맛집", "비빔밥", "콩나물국밥"],
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
              "남부시장 떡갈비 정말 맛있더라구요!! 저도 또 먹으러 가고 싶어요ㅠㅠ",
            createdAt: getTime(),
          },
          {
            _id: await nextSeq("reply"),
            user: {
              _id: 1,
              name: "문서인",
              image: "user-jayg.webp",
            },
            content: "전주 가면 남부시장은 진짜 필수죠! 맛집 천국이에요~",
            createdAt: getTime(),
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

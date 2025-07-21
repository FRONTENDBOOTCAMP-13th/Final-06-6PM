export interface fetchKtoProps {
  header: {
    resultCode: string;
    resultMsg: string;
  };
  body: {
    items: AreaProps[];
    numofRows: number;
    pageNo: number;
    totalCount: number;
  };
}

// 지역(시/도) 정보를 나타내는 타입
export interface AreaProps {
  code: number; // 지역 코드 (예: 1 - 서울, 2 - 인천 등)
  name: string; // 지역 이름 (예: "서울", "부산")
  rnum: number;
}

// 지역 기반 여행지 정보를 나타내는 타입
export interface AreaTravelProps {
  addr1: string; // 주소 (기본 주소)
  addr2: string; // 주소 (상세 주소)
  areacode: number; // 지역 코드 (AreaProps의 code와 매칭)
  cat1: string; // 대분류 카테고리 코드 (예: "A01" - 관광지)
  cat2: string; // 중분류 카테고리 코드 (예: "A0101" - 자연)
  cat3: string; // 소분류 카테고리 코드 (예: "A01010100" - 산)
  contentid: number; // 고유 콘텐츠 ID (여행지 식별자)
  contenttypeid: number; // 콘텐츠 유형 ID (예: 12 - 관광지, 14 - 문화시설 등)
  firstimage?: string; // 대표 이미지 URL (선택적)
  firstimage2?: string; // 대표 이미지 썸네일 URL (선택적)
  mapx: number; // 지도 좌표 (경도, X좌표)
  mapy: number; // 지도 좌표 (위도, Y좌표)
  title: string; // 여행지 제목 (명칭)
}

// 지역(시/도) 정보를 나타내는 타입
export interface AreaProps {
  code: number; // 지역 코드 (예: 1 - 서울, 2 - 인천 등)
  name: string; // 지역 이름 (예: "서울", "부산")
  rnum: number; // 응답 순번 또는 번호 (응답용)
}

// 지역 목록 API 응답 타입
export interface GetAreaProps {
  header: {
    resultCode: string; // 결과 코드 ("00"이 성공)
    resultMsg: string; // 결과 메시지
  };
  body: {
    items: {
      item: AreaProps[]; // 지역 목록 배열
    };
    numofRows: number; // 한 페이지에 출력할 데이터 수
    pageNo: number; // 페이지 번호
    totalCount: number; // 전체 데이터 수
  };
}

// 지역 기반 여행지 정보를 나타내는 타입
export interface AreaTravelProps {
  addr1: string; // 주소 (기본 주소)
  addr2: string; // 상세 주소
  areacode: number; // 지역 코드 (AreaProps의 code와 매칭)
  cat1: string; // 대분류 카테고리 코드 (예: "A01" - 관광지)
  cat2: string; // 중분류 카테고리 코드 (예: "A0101" - 자연)
  cat3: string; // 소분류 카테고리 코드 (예: "A01010100" - 산)
  contentid: number; // 고유 콘텐츠 ID (여행지 식별자)
  contenttypeid: number; // 콘텐츠 유형 ID (예: 12 - 관광지, 14 - 문화시설 등)
  firstimage?: string; // 대표 이미지 URL (선택적)
  firstimage2?: string; // 대표 이미지 썸네일 URL (선택적)
  mapx: number; // 지도 좌표 경도 (X 좌표)
  mapy: number; // 지도 좌표 위도 (Y 좌표)
  title: string; // 여행지 제목
}

// 지역 기반 여행지 목록 API 응답 타입
export interface GetAreaTravelProps {
  header: {
    resultCode: string;
    resultMsg: string;
  };
  body: {
    items: {
      item: AreaTravelProps[]; // 여행지 배열
    };
    numofRows: number;
    pageNo: number;
    totalCount: number;
  };
}

// 키워드 기반 여행지 정보를 나타내는 타입
export interface KeywordTravelProps {
  addr1: string; // 기본 주소 (도로명 주소)
  addr2: string; // 상세 주소 (건물명, 층수 등)
  areacode: string; // 지역 코드 (시/도 구분용)
  cat1: string; // 대분류 코드 (예: 관광지, 숙박 등)
  cat2: string; // 중분류 코드
  cat3: string; // 소분류 코드
  contentid: string; // 콘텐츠 ID (고유 식별자)
  contenttypeid: string; // 콘텐츠 유형 ID (관광지, 문화시설 등 분류)
  cpyrhtDivCd: string; // 저작권 구분 코드 (공공데이터 저작권 관련)
  createdtime: string; // 등록 일시 (YYYYMMDDhhmmss 형식)
  firstimage: string; // 대표 이미지 URL
  firstimage2: string; // 대표 이미지 썸네일 URL
  lDongRegnCd: string; // 법정동 지역 코드
  lDongSignguCd: string; // 법정동 시군구 코드
  lclsSystm1: string; // 분류 체계 1단계
  lclsSystm2: string; // 분류 체계 2단계
  lclsSystm3: string; // 분류 체계 3단계
  mapx: string; // 지도 X좌표 (경도)
  mapy: string; // 지도 Y좌표 (위도)
  mlevel: string; // 지도 확대 수준
  modifiedtime: string; // 수정 일시 (YYYYMMDDhhmmss 형식)
  sigungucode: string; // 시군구 코드 (지역 하위 구분)
  tel: string; // 전화번호
  title: string; // 장소 또는 콘텐츠 제목
  zipcode: string; // 우편번호
}

// 키워드 기반 여행지 검색 API 응답 타입
export interface GetKeywordProps {
  header: {
    resultCode: string;
    resultMsg: string;
  };
  body: {
    items: {
      item: KeywordTravelProps[]; // 실제 결과 목록 배열
    };
    numOfRows: number;
    pageNo: number;
    totalCount: number;
  };
}

// 콘텐츠 상세 정보 타입
export interface ContentDataProps {
  contentid: string; // 콘텐츠 ID
  title: string; // 콘텐츠 제목
  overview: string; // 콘텐츠 개요(설명)
  firstimage: string; // 대표 이미지 URL
  addr1: string; // 주소
}

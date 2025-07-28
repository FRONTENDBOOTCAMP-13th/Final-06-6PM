// 사용자 정보를 나타내는 타입
export interface User {
  _id: number; // 사용자 고유 ID
  type: "user" | "admin"; // 사용자 유형
  name: string; // 사용자 이름
  email: string; // 이메일 주소
  desc?: string; // 사용자 설명 (선택적)
  loginType?: "email" | "kakao" | "google" | "github";
  createdAt?: string; // 계정 생성일
  updatedAt?: string; // 계정 수정일
  phone?: string; // 전화번호 (선택적)
  image?: string; // 프로필 이미지 URL (선택적)
  token?: {
    accessToken: string; // 액세스 토큰
    refreshToken: string; // 리프레시 토큰
  };
  extra?: {
    seoul?: string;
    busan?: string;
    jejudo?: string;
    gwangju?: string;
    daejeon?: string;
    ulsan?: string;
    incheon?: string;
    gyeonggido?: string;
    gyeongsangnamdo?: string;
    gyeongsangbukdo?: string;
    chungcheongnamdo?: string;
    chungcheongbukdo?: string;
    jeonrabukdo?: string;
    jeonranamdo?: string;
    gangwondo?: string;
    daegu?: string;
    sejongsi?: string;
  };
}

// Zustand 등 상태 관리용 사용자 상태 타입
export interface UserState {
  token: string | null; // 현재 액세스 토큰
  userInfo: User | null; // 현재 로그인된 사용자 정보
  isLoggedIn: boolean; // 로그인 상태 여부

  setToken: (token: string) => void; // 토큰 저장 함수
  setUserInfo: (info: User) => void; // 사용자 정보 저장 함수
  logout: () => void; // 로그아웃 처리 함수
}

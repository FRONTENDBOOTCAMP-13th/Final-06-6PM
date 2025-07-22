export interface User {
  _id: number; // 사용자 고유 ID
  name: string; // 사용자 이름
  email: string; // 이메일 주소
  phone?: string; // 전화번호
  desc?: string; // 내용
  type: "user" | "admin"; // 사용자 유형
  loginType?: "email" | "kakao" | "google" | "github"; // 로그인 방식
  image?: string; // 프로필 이미지
  token?: {
    // 인증 토큰
    accessToken: string; // 액세스 토큰
    refreshToken: string; // 리프레시 토큰
  };
  createdAt?: string; // 생성일
  updatedAt?: string; // 수정일
}
export interface UserState {
  token: string | null;
  userInfo: User | null;
  isLoggedIn: boolean;

  setToken: (token: string) => void;
  setUserInfo: (info: User) => void;
  logout: () => void;
}

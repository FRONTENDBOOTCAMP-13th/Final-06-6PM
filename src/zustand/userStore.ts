import { User, UserState } from "@/types/user";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

/* 
  1. 로그인 후 상태 설정
  const { setToken, setUserInfo } = useUserStore.getState();
  setToken("my-access-token");
  setUserInfo({ _id: 1, name: "테스트", email: "test@test.com" });
*/

/*
  2. 로그인 여부 확인
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);
*/

/*
  3. 사용자 정보 가져오기
  const user = useUserStore((state) => state.userInfo);
  console.log(user?.name);
*/

/*
  4. 프로필 수정
  const updateUser = useUserStore((state) => state.updateUser);
  updateUser({ name: "새로운 이름", desc: "새로운 소개" });
*/

/*
  5. 로그아웃
  const logout = useUserStore((state) => state.logout);
  logout();
*/

const useUserStore = create(
  persist<UserState>(
    (set) => ({
      userInfo: null, // 로그인한 사용자 정보 저장 (초기값 null)
      token: null, // 액세스 토큰 저장 (초기값 null)
      refreshToken: null, // 리프레쉬 토큰 저장 (초기값 null)
      isLoggedIn: false, // 로그인 여부 상태 (초기값 false)

      // 토큰 저장 및 로그인 상태 true로 변경하는 함수
      setToken: (token, refreshToken) =>
        set(() => ({
          token: token,
          refreshToken: refreshToken,
          isLoggedIn: true,
        })),

      // 사용자 정보 저장
      setUserInfo: (info: User) =>
        set(() => ({
          userInfo: info,
        })),

      // 사용자 정보 업데이트 (프로필 수정 시 사용)
      updateUser: (updates: Partial<User>) =>
        set((state) => ({
          userInfo: state.userInfo ? { ...state.userInfo, ...updates } : null,
        })),

      // 로그아웃: 모든 상태 초기화
      logout: () =>
        set(() => ({
          token: null,
          userInfo: null,
          isLoggedIn: false,
        })),
    }),
    {
      name: "user", // 세션 스토리지 키 이름
      storage: createJSONStorage(() => sessionStorage), // 세션 스토리지에 저장
    },
  ),
);

export default useUserStore;

import { User, UserState } from "@/types/user";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

/* 1. 로그인 후 상태 설정:
    import useUserStore from "@/store/useUserStore";
    const { setToken, setUserInfo } = useUserStore.getState();

    setToken("my-access-token");  // 예: 로그인 API로 받은 토큰
    setUserInfo({
      id: 1,
      name: "박선영",
      email: "hong@example.com",
    });
*/

/* 2. 로그인 여부 확인:
    const isLoggedIn = useUserStore((state) => state.isLoggedIn);
    if (isLoggedIn) {
    // 로그인된 상태
    }
*/

/* 3. 사용자 이름 출력:
    const user = useUserStore((state) => state.userInfo);
    console.log(user?.name); // "박선영"
*/

/* 4. 로그아웃 처리:
    // const logout = useUserStore.getState().logout; 
    // 또는 const { logout } = useUserStore();
    logout(); // 로그인 상태 및 토큰 초기화됨
*/

const useUserStore = create(
  persist<UserState>(
    (set) => ({
      userInfo: null, // 사용자 정보 (로그인 후 세팅)
      token: null, // accessToken 저장
      isLoggedIn: false, // 로그인 여부

      // 토큰 저장 + 로그인 상태 true로 설정
      setToken: (token) =>
        set(() => ({
          token: token,
          isLoggedIn: true,
        })),

      // 사용자 정보 저장
      setUserInfo: (info: User) =>
        set(() => ({
          userInfo: info,
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
    }
  )
);

export default useUserStore;

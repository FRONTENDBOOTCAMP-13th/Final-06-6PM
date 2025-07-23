import { User, UserState } from "@/types/user";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

/* 
  1. 로그인 후 상태 설정 예시
  import useUserStore from "@/store/useUserStore";
  const { setToken, setUserInfo } = useUserStore.getState();

  // 로그인 API로 받은 토큰을 저장하고 로그인 상태 true로 변경
  setToken("my-access-token");

  // 로그인한 사용자 정보를 저장
  setUserInfo({
    _id: 1,
    name: "테스트",
    email: "test@test.com",
  });
*/

/*
  2. 로그인 여부 확인
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);
  if (isLoggedIn) {
    // 로그인된 상태일 때 실행할 코드
  }
*/

/*
  3. 사용자 이름 가져오기 예시
  const user = useUserStore((state) => state.userInfo);
  console.log(user?.name); // "테스트"
*/

/*
  4. 로그아웃 처리 예시
  // 1) 직접 호출
  const logout = useUserStore.getState().logout;
  logout();

  // 2) 컴포넌트 내 훅 사용
  const { logout } = useUserStore();
  logout();

  로그아웃 시 토큰, 사용자 정보, 로그인 상태 모두 초기화됨
*/

const useUserStore = create(
  persist<UserState>(
    (set) => ({
      userInfo: null, // 로그인한 사용자 정보 저장 (초기값 null)
      token: null, // 액세스 토큰 저장 (초기값 null)
      isLoggedIn: false, // 로그인 여부 상태 (초기값 false)

      // 토큰 저장 및 로그인 상태 true로 변경하는 함수
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

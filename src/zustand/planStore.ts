import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { SelectedPlace, PlanExtra, DailyPlan, PlanState, PlanActions } from "@/types/plan";

// 저장할 상태의 타입 정의 (액션 제외하고 상태만)
type PersistedState = Pick<
  PlanState,
  | "selectedArea"
  | "startDate"
  | "endDate"
  | "selectedCategory"
  | "selectedPlaces"
  | "planTitle"
  | "planId"
  | "dailyPlans"
>;

interface PlanStore extends PlanState, PlanActions {}

const usePlanStore = create<PlanStore>()(
  persist(
    (set, get) => ({
      // 초기 상태
      selectedArea: null,
      startDate: null,
      endDate: null,
      planTitle: "",
      planId: null,
      keyword: "",
      selectedCategory: "all",
      isSearching: false,
      isLoading: false,
      filteredData: [],
      searchList: [],
      contentData: undefined,
      selectContentID: "",
      selectedPlaces: [],
      dailyPlans: [],

      // 기본 정보 설정
      setSelectedArea: (area) => set({ selectedArea: area }),
      setStartDate: (date) => set({ startDate: date }),
      setEndDate: (date) => set({ endDate: date }),
      setPlanTitle: (title) => set({ planTitle: title }),
      setPlanId: (id) => set({ planId: id }),

      // 검색 관련 상태 설정
      setKeyword: (keyword) => set({ keyword }),
      setSelectedCategory: (category) =>
        set({
          selectedCategory: category,
          searchList: [], // 카테고리 변경 시 검색 결과 초기화
          keyword: "", // 키워드도 초기화
        }),
      setIsSearching: (isSearching) => set({ isSearching }),
      setIsLoading: (isLoading) => set({ isLoading }),

      // 데이터 설정
      setFilteredData: (data) => set({ filteredData: data }),
      setSearchList: (list) => set({ searchList: list }),
      setContentData: (data) => set({ contentData: data }),
      setSelectContentID: (id) => set({ selectContentID: id }),
      setSelectedPlaces: (places) => set({ selectedPlaces: places }),
      setDailyPlans: (plans) => set({ dailyPlans: plans }),

      // 장소 추가 (중복 체크 포함)
      addSelectedPlace: (place) => {
        const { selectedPlaces } = get();

        // 중복 체크
        if (selectedPlaces.some((p) => p.id === place.id)) {
          return false; // 중복으로 추가 실패
        }

        set({ selectedPlaces: [...selectedPlaces, place] });
        return true; // 추가 성공
      },

      // 장소 제거
      removeSelectedPlace: (id) => {
        const { selectedPlaces } = get();
        set({
          selectedPlaces: selectedPlaces.filter((place) => place.id !== id),
        });
      },

      // 특정 날짜에 장소 추가
      addPlaceToDailyPlan: (day, place) => {
        const { dailyPlans } = get();
        const updatedPlans = dailyPlans.map((plan) =>
          plan.day === day ? { ...plan, places: [...plan.places, place] } : plan,
        );
        set({ dailyPlans: updatedPlans });
      },

      // 특정 날짜에서 장소 제거
      removePlaceFromDailyPlan: (day, placeId) => {
        const { dailyPlans } = get();
        const updatedPlans = dailyPlans.map((plan) =>
          plan.day === day ? { ...plan, places: plan.places.filter((p) => p.id !== placeId) } : plan,
        );
        set({ dailyPlans: updatedPlans });
      },

      // PlanExtra 형태로 날짜 정보 반환
      getPlanExtra: () => {
        const { startDate, endDate } = get();
        if (startDate && endDate) {
          return { startDate, endDate };
        }
        return null;
      },

      // 검색 관련 데이터 초기화
      clearSearchData: () =>
        set({
          keyword: "",
          searchList: [],
          contentData: undefined,
          selectContentID: "",
          isSearching: false,
        }),

      // 모든 데이터 초기화
      clearAllData: () =>
        set({
          selectedArea: null,
          startDate: null,
          endDate: null,
          planTitle: "",
          planId: null,
          keyword: "",
          selectedCategory: "all",
          isSearching: false,
          isLoading: false,
          filteredData: [],
          searchList: [],
          contentData: undefined,
          selectContentID: "",
          selectedPlaces: [],
          dailyPlans: [],
        }),
    }),
    {
      name: "plan-storage", // 세션 스토리지 키 이름
      storage: createJSONStorage(() => sessionStorage), // 세션 스토리지에 저장
      // 일부 상태만 persist (검색 중 상태 등은 제외)
      // partialize: (state) => ({
      //   selectedArea: state.selectedArea,
      //   startDate: state.startDate,
      //   endDate: state.endDate,
      //   selectedCategory: state.selectedCategory,
      //   selectedPlaces: state.selectedPlaces,
      //   planTitle: state.planTitle,
      //   planId: state.planId,
      //   dailyPlans: state.dailyPlans,
      // }),
    },
  ),
);

export default usePlanStore;

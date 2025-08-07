import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { SelectedPlace, PlanExtra, DailyPlan, PlanState, PlanActions } from "@/types/plan";

// 전체 스토어 타입 (상태 + 액션)
type PlanStore = PlanState & PlanActions;

const usePlanStore = create<PlanStore>()(
  persist(
    (set, get) => ({
      // 핵심 여행 데이터만 (persist 됨)
      selectedArea: null,
      startDate: null,
      endDate: null,
      postId: null,
      selectedCategory: "all",
      selectedPlaces: [],
      dailyPlans: [],

      // 검색 관련 임시 상태 (persist 안 됨)
      filteredData: [],
      searchList: [],
      contentData: undefined,
      selectContentID: "",

      // 기본 정보 설정
      setSelectedArea: (area) => set({ selectedArea: area }),
      setStartDate: (date) => set({ startDate: date }),
      setEndDate: (date) => set({ endDate: date }),
      setPostId: (id) => set({ postId: id }),
      setSelectedCategory: (category) =>
        set({
          selectedCategory: category,
          searchList: [], // 카테고리 변경 시 검색 결과 초기화
        }),

      // 데이터 설정 (임시 상태)
      setFilteredData: (data) => set({ filteredData: data }),
      setSearchList: (list) => set({ searchList: list }),
      setContentData: (data) => set({ contentData: data }),
      setSelectContentID: (id) => set({ selectContentID: id }),
      setSelectedPlaces: (places) => set({ selectedPlaces: places }),
      setDailyPlans: (plans) => set({ dailyPlans: plans }),

      // 장소 제거
      removeSelectedPlace: (placeId) => {
        set((state) => ({
          selectedPlaces: state.selectedPlaces.filter((place) => place.id !== placeId),
          // dailyPlans에서도 제거하여 동기화
          dailyPlans: state.dailyPlans.map((plan) => ({
            ...plan,
            places: plan.places.filter((place) => place.id !== placeId),
          })),
        }));
      },

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

      // 중복 체크 추가
      addPlaceToDailyPlan: (day, place) => {
        const { dailyPlans } = get();

        // 해당 날짜에 이미 같은 장소가 있는지 체크
        const targetPlan = dailyPlans.find((plan) => plan.day === day);
        if (targetPlan?.places.some((p) => p.id === place.id)) {
          return false;
        }

        const updatedPlans = dailyPlans.map((plan) =>
          plan.day === day ? { ...plan, places: [...plan.places, place] } : plan,
        );
        set({ dailyPlans: updatedPlans });
        return true;
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
          searchList: [],
          contentData: undefined,
          selectContentID: "",
        }),

      // 모든 데이터 초기화
      clearAllData: () =>
        set({
          selectedArea: null,
          startDate: null,
          endDate: null,
          postId: null,
          selectedCategory: "all",
          filteredData: [],
          searchList: [],
          contentData: undefined,
          selectContentID: "",
          selectedPlaces: [],
          dailyPlans: [],
        }),
    }),
    {
      name: "plan-storage",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        selectedArea: state.selectedArea,
        startDate: state.startDate,
        endDate: state.endDate,
        postId: state.postId,
        selectedCategory: state.selectedCategory,
        selectedPlaces: state.selectedPlaces,
        dailyPlans: state.dailyPlans,
      }),
    },
  ),
);

export default usePlanStore;

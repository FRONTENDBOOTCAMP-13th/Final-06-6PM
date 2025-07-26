import { useEffect } from "react";
import { getContentData } from "@/data/functions/travel";
import usePlanStore from "@/zustand/planStore";

// 콘텐츠 상세 정보 로딩
export const useContentDetail = () => {
  const { selectContentID, setContentData } = usePlanStore();

  useEffect(() => {
    if (selectContentID) {
      const ContentListData = async () => {
        try {
          const res = await getContentData(selectContentID.toString());
          if (res?.header.resultMsg === "OK") {
            const data = res.body.items.item;
            setContentData(data[0]);
          }
        } catch (error) {
          console.error("콘텐츠 상세 정보 조회 에러:", error);
        }
      };
      ContentListData();
    }
  }, [selectContentID]);
};

"use client";

import { createPlanPost } from "@/data/actions/plan";
import useUserStore from "@/zustand/userStore";
import usePlanStore from "@/zustand/planStore";
import Button from "@/components/ui/btn";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function PlanDetailForm() {
  const router = useRouter();

  // 여행 데이터 가져오기
  const { selectedArea, startDate, endDate, setPostId } = usePlanStore();
  const accessToken = useUserStore((state) => state.token);

  const handleClick = async () => {
    // 데이터 유효성 검사
    if (!selectedArea || !startDate || !endDate) {
      // 날짜 선택 안했을 때 경고창 표시
      if (!startDate || !endDate) {
        toast.error("여행 날짜를 선택해주세요!");
      }
      return;
    }

    const formData = new FormData();
    formData.append("startDate", startDate);
    formData.append("endDate", endDate);
    formData.append("selectedRegion", selectedArea.name);

    // console.log("전송 데이터:", {
    //   startDate,
    //   endDate,
    //   selectedRegion: selectedArea.name,
    // });

    try {
      const result = await createPlanPost(formData, accessToken);
      console.log("서버 응답:", result);
      if (result.ok && result.item) {
        const postId = result.item._id;
        setPostId(postId);
        console.log("PostId:", postId);

        // 성공 시 다음 페이지로 이동
        router.push("/plan/edit/schedule");
      } else {
        toast.error("여행 계획 저장에 실패했습니다.");
      }
    } catch (error) {
      console.error("API 호출 에러:", error);
      toast.error("네트워크 오류가 발생했습니다.");
    }
  };

  return (
    <div className="grid grid-cols-1 gap-2 p-4">
      <div className="bg-white fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] p-4 max-h-21 z-20 shadow-[0_-8px_16px_-4px_rgba(0,0,0,0.1)]">
        <Button className="w-full text-16" onClick={handleClick}>
          여행 계획 저장
        </Button>
      </div>
    </div>
  );
}

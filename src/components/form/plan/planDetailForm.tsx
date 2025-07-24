"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createPlanPost } from "@/data/actions/plan";
import useUserStore from "@/zustand/userStore";

export default function PlanDetailForm() {
  
  const [travelData, setTravelData] = useState({
    startDate: '',
    endDate: '',
    selectedRegion: ''
  });

  // 로그인 여부 확인
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);
  const router = useRouter();

  useEffect(() => {
    const data = {
      startDate: sessionStorage.getItem('startDate') || '',
      endDate: sessionStorage.getItem('endDate') || '',
      selectedRegion: sessionStorage.getItem('selectedRegion') || ''
    };
    setTravelData(data);
  }, []);

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace("/login");
    }
  }, [isLoggedIn, router]);

  const handleClick = async () => {
    console.log('버튼 클릭됨');
    console.log('로그인 상태:', isLoggedIn);
    
    
    console.log('로그인됨, 데이터 전송 시작');
    
    const formData = new FormData();
    formData.append('startDate', travelData.startDate);
    formData.append('endDate', travelData.endDate);
    formData.append('selectedRegion', travelData.selectedRegion);
    
    console.log('전송 데이터:', {
      startDate: travelData.startDate,
      endDate: travelData.endDate,
      selectedRegion: travelData.selectedRegion
    });
    
    try {
      const result = await createPlanPost(formData);
      console.log('서버 응답:', result);
      
      if (result.ok) {
        console.log('여행 계획 저장 성공!', result);
      } else {
        console.error('저장 실패:', result.message);
      }
    } catch (error) {
      console.error('API 호출 에러:', error);
    }
  };
  
  return (
    <div className="grid grid-cols-1 gap-2 p-4">
      <div className="bg-travel-bg100 fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] p-4 max-h-21 z-20 shadow-[0_-8px_16px_-4px_rgba(0,0,0,0.1)]">
        <button 
          className="w-full text-16 bg-blue-500 text-white p-4 rounded" 
          onClick={handleClick}
        >
          여행 계획 저장
        </button>
      </div>
    </div>
  );
}
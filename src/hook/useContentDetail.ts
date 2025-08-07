"use client";

import { useEffect, useState } from "react";
import { getContentData } from "@/data/functions/travel";
import usePlanStore from "@/zustand/planStore";

// 선택된 장소 상세정보를 API로 조회해서 contentData에 저장하고 모달 상태 관리
export const useContentDetail = () => {
  const { selectContentID, setContentData, contentData } = usePlanStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [shouldOpenModal, setShouldOpenModal] = useState(false);

  // API로 컨텐츠 상세 정보 조회
  useEffect(() => {
    if (selectContentID && selectContentID !== "" && selectContentID !== null) {
      setShouldOpenModal(true);
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
    } else {
      setShouldOpenModal(false);
    }
  }, [selectContentID, setContentData]);

  // 모달 열기
  useEffect(() => {
    if (
      contentData &&
      typeof contentData === "object" &&
      contentData.title &&
      contentData.title.trim() !== "" &&
      contentData.contentid &&
      shouldOpenModal
    ) {
      // 실제 클릭한 경우에만 모달 열기
      setIsModalOpen(true);
      // 모달이 열릴 때 body 스크롤 막기
      document.body.style.overflow = "hidden";
    }

    return () => {
      // 컴포넌트 언마운트 시 스크롤 복원
      document.body.style.overflow = "";
    };
  }, [contentData, shouldOpenModal]);

  const handleModalClose = () => {
    setIsModalOpen(false);
    setShouldOpenModal(false);
    document.body.style.overflow = "";
  };

  return {
    isModalOpen,
    handleModalClose,
  };
};

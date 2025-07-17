"use client";

import ModalItem from "@/components/Modal";
import CommentItem from "@/components/ui/commentItem";
import ViewItem from "@/components/feature/viewItem";
import { useState } from "react";

// 살펴보기 게시판 목록
export default function FeedViewPage() {
  const [selectItem, setSelectItem] = useState(false);

  return (
    <>
      <div className="py-6 px-4 relative bg-white rounded-2xl">
        {/* 내용 */}
        <div className="flex flex-col gap-8">
          <ViewItem
            userName={"닉네임"}
            userImgURL={"/gwak.png"}
            location={"제주도"}
            content={
              "내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다 내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다 "
            }
            tags={["맛집", "#좋아요", "몰라"]}
            views={200}
            likes={100}
            comments={100}
            date={"2025-07-15"}
            onClick={() => setSelectItem(true)}
          />
        </div>
        <hr className="my-6 text-travel-gray200" />
        <CommentItem
          author={"오둥이"}
          date={"2024-07-18"}
          content={
            "여기 진짜 힐링 그 자체네요 사진만 봐도 여유로워요. 혹시 여긴 어떻게 가면 되나요? 대중교통 가능한가요?"
          }
        />{" "}
        <hr className="my-6 text-travel-gray200" />
        <CommentItem
          author={"오둥이"}
          date={"2024-07-18"}
          content={
            "여기 진짜 힐링 그 자체네요 사진만 봐도 여유로워요. 혹시 여긴 어떻게 가면 되나요? 대중교통 가능한가요?"
          }
        />
        <hr className="my-6 text-travel-gray200" />
        <CommentItem
          author={"오둥이"}
          date={"2024-07-18"}
          content={
            "여기 진짜 힐링 그 자체네요 사진만 봐도 여유로워요. 혹시 여긴 어떻게 가면 되나요? 대중교통 가능한가요?"
          }
        />
        <hr className="my-6 text-travel-gray200" />
        <CommentItem
          author={"오둥이"}
          date={"2024-07-18"}
          content={
            "여기 진짜 힐링 그 자체네요 사진만 봐도 여유로워요. 혹시 여긴 어떻게 가면 되나요? 대중교통 가능한가요?"
          }
        />
      </div>

      {/* 모달 */}
      {selectItem && <ModalItem onClose={() => setSelectItem(false)} />}
    </>
  );
}

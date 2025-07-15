"use client";

import CommentItem from "@/components/ui/commentItem";
import ViewItem from "@/components/ui/viewItem";
import { Send } from "lucide-react";

// 살펴보기 게시판 목록
export default function FeedPage() {
  return (
    <div className="px-2 relative">
      {/* 내용 */}
      <div className="flex flex-col gap-8">
        <ViewItem
          userName={"닉네임"}
          imgURL={"/gwak.png"}
          location={"제주도"}
          content={
            "내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다 내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다 "
          }
          tags={["맛집", "#좋아요", "몰라"]}
          views={200}
          likes={100}
          comments={100}
          date={"2025-07-15"}
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
      />{" "}
      <hr className="my-6 text-travel-gray200" />
      <CommentItem
        author={"오둥이"}
        date={"2024-07-18"}
        content={
          "여기 진짜 힐링 그 자체네요 사진만 봐도 여유로워요. 혹시 여긴 어떻게 가면 되나요? 대중교통 가능한가요?"
        }
      />
      <div className=" absolute bottom-4 w-full left-1/2 -translate-x-1/2">
        <label htmlFor="feedMessage" className="sr-only">
          댓글창
        </label>
        <div className="relative">
          <input
            type="text"
            placeholder="댓글을 입력해주세요."
            id="feedMessage"
            className="w-full py-2 pl-4 pr-10 rounded-full border border-travel-info100 bg-white text-travel-text100 placeholder-travel-gray500  focus:outline-travel-info200 focus:bg-blue-100 focus:text-travel-info200 transition duration-200 text-14"
          />
          <button
            type="submit"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-travel-text100 cursor-pointer"
          >
            <Send className="text-travel-info100 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

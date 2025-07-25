"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import ReviewStar from "@/components/form/reviewStar";
import ReviewTitle from "@/components/form/reviewTitle";
import ReviewContent from "@/components/form/reviewContent";
import ReviewImg from "@/components/form/reviewImg";
import ReviewTag from "@/components/form/reviewTag";
import Button from "@/components/ui/btn";
import useUserStore from "@/zustand/userStore";
import { createReviewAllPost } from "@/data/actions/review";

export default function ReviewFormAll() {
  const token = useUserStore((state) => state.token);

  const [starRate, setStarRate] = useState(5);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [isSubmit, setIsSubmit] = useState(false);

  const searchParams = useSearchParams();
  const planId = searchParams.get("plan_id");
  const place = searchParams.get("place");

  const formSubmit = async (formData: FormData) => {
    console.log("sss");
    setIsSubmit(true);

    try {
      // FormData에 모든 데이터 추가
      formData.append("starRate", starRate.toString());
      formData.append("title", title);
      formData.append("content", content);
      formData.append("tags", JSON.stringify(tags));

      // URL query에서 가져온 값들 추가
      if (planId) formData.append("plan_id", planId);
      if (place) formData.append("place", place);

      // 이미지 파일들 추가
      images.forEach((image, index) => {
        formData.append(`image_${index}`, image);
      });

      const result = await createReviewAllPost(formData, token);

      if (result.ok) {
        console.log("리뷰 작성 성공:", result);
        // 성공 처리 로직 추가 (예: 페이지 이동, 알림 등)
      } else {
        console.error("리뷰 작성 실패:", result.message);
        // 에러 처리 로직 추가
      }
    } catch (err) {
      console.error("폼 제출 오류:", err);
    } finally {
      setIsSubmit(false);
    }
  };

  return (
    <form action={formSubmit} className="grid grid-cols-1 gap-3 p-4">
      <ReviewStar starRate={starRate} setStarRate={setStarRate} />
      <ReviewTitle title={title} setTitle={setTitle} />
      <ReviewContent content={content} setContent={setContent} />
      <ReviewImg images={images} setImages={setImages} />
      <ReviewTag tags={tags} setTags={setTags} />

      <div className="bg-travel-bg100 fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] p-4 max-h-21 z-20 shadow-[0_-8px_16px_-4px_rgba(0,0,0,0.1)]">
        <Button
          className="w-full text-16"
          type="submit"
          disabled={isSubmit || !title.trim() || !planId || !place}
        >
          {isSubmit ? "작성 중..." : "리뷰 작성 완료"}
        </Button>
      </div>
    </form>
  );
}

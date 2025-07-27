"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter, useParams } from "next/navigation";
import ReviewStar from "@/components/form/reviewStar";
import ReviewTitle from "@/components/form/reviewTitle";
import ReviewContent from "@/components/form/reviewContent";
import ReviewImg from "@/components/form/reviewImg";
import ReviewTag from "@/components/form/reviewTag";
import Button from "@/components/ui/btn";
import useUserStore from "@/zustand/userStore";
import { toast } from "react-toastify";
import { createReviewAllPost } from "@/data/actions/review";

export default function ReviewFormAll() {
  const token = useUserStore((state) => state.token);
  const router = useRouter();

  const [starRate, setStarRate] = useState(5);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [isPending, setIsPending] = useState(false);

  const searchParams = useSearchParams();
  const params = useParams();
  const planId = params?.id || "";
  const place = searchParams.get("place");

  const isFormValid = title.trim() && content.trim() && planId && place;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid || isPending) return;

    setIsPending(true);

    try {
      const formData = new FormData();

      // 기본 데이터 추가
      formData.set("starRate", starRate.toString());
      formData.set("title", title);
      formData.set("content", content);
      formData.set("tags", JSON.stringify(tags));
      formData.set("token", token || "");
      formData.set("plan_id", planId.toString());
      formData.set("place", place || "");

      // 이미지 파일들 추가 (Server Action이 기대하는 형식으로)
      images.forEach((image, index) => {
        formData.append(`image_${index}`, image);
      });

      console.log("Submitting with data:", {
        starRate,
        title,
        content,
        tags,
        images: images.length,
        planId,
        place,
        token: !!token,
      });

      const result = await createReviewAllPost(formData);

      if (result?.ok === 1) {
        toast.success("리뷰가 성공적으로 작성되었습니다!");
        router.push(`/review/success`);
      } else if (result?.ok === 0 && result?.message) {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Submit error:", error);
      toast.error("리뷰 작성 중 오류가 발생했습니다.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-3 p-4">
      <ReviewStar starRate={starRate} setStarRate={setStarRate} />
      <ReviewTitle title={title} setTitle={setTitle} />
      <ReviewContent content={content} setContent={setContent} />
      <ReviewImg images={images} setImages={setImages} />
      <ReviewTag tags={tags} setTags={setTags} />

      {/* 제출 버튼 */}
      <div className="bg-white fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] p-4 max-h-21 z-20 shadow-[0_-8px_16px_-4px_rgba(0,0,0,0.1)]">
        <Button
          className="w-full text-16"
          type="submit"
          disabled={isPending || !isFormValid}
        >
          {isPending ? "작성 중..." : "리뷰 작성 완료"}
        </Button>
      </div>
    </form>
  );
}

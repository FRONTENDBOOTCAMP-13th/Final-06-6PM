"use client";
import { useActionState, useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { toast } from "react-toastify";
import useUserStore from "@/zustand/userStore";
import { PlanReviewInfo } from "@/types/plan";
import { GetReviewDetailProps } from "@/types/review";
import Button from "@/components/ui/btn";
import ReviewTag from "@/components/form/review/reviewTag";
import ReviewStar from "@/components/form/review/reviewStar";
import { ReviewTitle } from "@/components/form/review/reviewTitle";
import ReviewContent from "@/components/form/review/reviewContent";
import { uploadFile } from "@/data/actions/file";
import { createReviewAllPost, updateReviewPost } from "@/data/actions/review";
import { Camera, ImagePlus, X } from "lucide-react";

interface ReviewFormAllProps {
  initialData?: GetReviewDetailProps;
  planReviewInfo?: PlanReviewInfo;
}

export default function ReviewFormAll({ initialData, planReviewInfo }: ReviewFormAllProps) {
  // 글작성 또는 수정모드(initialData있을 경우)
  const isEditMode = !!initialData;

  const token = useUserStore((state) => state.token);
  const [state, formAction, isPending] = useActionState(isEditMode ? updateReviewPost : createReviewAllPost, null);
  const router = useRouter();

  // 이미지 관련 상태
  const [images, setImages] = useState<{ path: string; name: string; preview: string }[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  // 초기 데이터 설정 (수정 모드)
  useEffect(() => {
    if (initialData && isEditMode) {
      // console.log("ReviewFormAll 초기 데이터", initialData);

      // 기존 이미지 데이터 설정
      if (initialData.extra?.images && Array.isArray(initialData.extra.images)) {
        const existingImages = initialData.extra.images.map((imagePath: string, index: number) => ({
          path: imagePath,
          name: `기존이미지-${imagePath.split("/").pop() || index}`,
          preview: imagePath.startsWith("http") ? imagePath : `${process.env.NEXT_PUBLIC_API_SERVER}/${imagePath}`,
        }));
        setImages(existingImages);
      }
    }
  }, [initialData, isEditMode]);

  useEffect(() => {
    if (state?.ok) {
      router.back();
    }
  }, [state]);

  // 파일 선택 Dialog
  const openFileDialog = () => {
    if (!isUploading && !isPending) {
      fileRef.current?.click();
    }
  };

  // 이미지 업로드 함수
  const uploadImg = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    if (images.length + files.length > 10) {
      toast.warning("사진은 최대 10장까지 첨부할 수 있습니다.");
      return;
    }
    setIsUploading(true);

    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        // 미리보기 생성
        const preview = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.readAsDataURL(file);
        });

        // 파일 업로드
        const formData = new FormData();
        formData.append("attach", file);
        const res = await uploadFile(formData);

        if (res.ok === 1 && res.item.length > 0) {
          return {
            path: res.item[0].path,
            name: res.item[0].originalname || res.item[0].name,
            preview,
          };
        }
        throw new Error("업로드 실패");
      });

      const completeImg = await Promise.all(uploadPromises);
      setImages((prev) => [...prev, ...completeImg]);
    } catch (error) {
      toast.error("이미지 업로드에 실패했습니다.");
    } finally {
      setIsUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  // 이미지 삭제 함수
  const removeImg = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <form action={formAction} className="grid grid-cols-1 gap-3 p-4 relative">
      {/* 로딩 오버레이 */}
      {(isUploading || isPending) && (
        <div className="absolute inset-0 z-20 bg-black/70 backdrop-blur-xs flex flex-col items-center justify-center space-y-4">
          <div className="w-16 h-16 border-[6px] border-travel-primary100 border-t-transparent rounded-full animate-spin shadow-lg"></div>
          <span className="text-white text-base font-medium animate-pulse tracking-wide">
            {isUploading
              ? "이미지를 업로드하고 있어요"
              : isEditMode
              ? "리뷰를 수정하는 중이에요"
              : "리뷰를 저장하는 중이에요"}
          </span>
        </div>
      )}

      {/* Hidden inputs */}
      <input type="hidden" name="token" value={token || ""} />
      {isEditMode && initialData && (
        <input type="hidden" name="reviewId" value={initialData._id?.toString() || initialData._id?.toString()} />
      )}

      <input type="hidden" name="plan_id" value={planReviewInfo?.plan_id ?? initialData?.extra.plan_id ?? ""} />
      <input type="hidden" name="startDate" value={planReviewInfo?.startDate ?? initialData?.extra?.startDate ?? ""} />
      <input type="hidden" name="endDate" value={planReviewInfo?.endDate ?? initialData?.extra?.endDate ?? ""} />
      <input type="hidden" name="place" value={planReviewInfo?.title ?? initialData?.extra?.place ?? ""} />
      <input
        type="hidden"
        name="location"
        value={initialData?.extra?.location ? JSON.stringify(initialData.extra.location) : ""}
      />

      {/* 이미지 경로들을 hidden input으로 전송 */}
      {images.map((img, index) => (
        <input key={index} type="hidden" name={`imagePath_${index}`} value={img.path} />
      ))}
      {/* 이미지 총 개수도 전송 */}
      <input type="hidden" name="imageCount" value={images.length.toString()} />

      {/* 별점 */}
      <ReviewStar
        name="starRate"
        key={`star-${initialData?._id || "new"}`} // key 추가로 리렌더링 강제
        defaultValue={initialData?.extra?.starRate?.toString() || "5"}
      />

      {/* 제목 */}
      <div>
        <ReviewTitle
          name="title"
          key={`title-${initialData?._id || "new"}`} // key 추가로 리렌더링 강제
          defaultValue={initialData?.title || ""}
        />
        {state?.ok === 0 && state.errors?.title && (
          <p className="mt-1 text-sm text-red-500">{state.errors.title.msg}</p>
        )}
      </div>

      {/* 내용 */}
      <div>
        <ReviewContent
          name="content"
          key={`content-${initialData?._id || "new"}`} // key 추가로 리렌더링 강제
          defaultValue={initialData?.content || ""}
        />
        {state?.ok === 0 && state.errors?.content && (
          <p className="mt-1 text-sm text-red-500">{state.errors.content.msg}</p>
        )}
      </div>

      {/* 이미지 업로드 */}
      <div className="space-y-1.5">
        <div className="flex items-center gap-1.5">
          <Camera className="size-5" />
          <h3 className="font-semibold text-18">
            사진첨부
            {images.length > 0 && <span className="ml-1 text-sm text-travel-gray400">({images.length}/10)</span>}
          </h3>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {/* 업로드 버튼 */}
          {images.length < 10 && (
            <div
              className="relative flex items-center justify-center p-2 transition-colors bg-white border border-dashed rounded-lg cursor-pointer h-21 border-travel-gray400 hover:bg-gray-50"
              onClick={openFileDialog}
            >
              <ImagePlus className="w-10 h-10 text-travel-gray400" />
            </div>
          )}

          {/* 업로드된 이미지들 */}
          {images.map((img, index) => (
            <div
              key={`${img.path}-${index}`}
              className="relative p-2 bg-white border rounded-lg border-travel-gray400 h-21"
            >
              <img
                src={img.preview}
                alt={`첨부이미지-${index + 1}`}
                className="object-cover w-full h-full rounded-lg"
                onError={(e) => {
                  // 이미지 로드 실패 시 대체 이미지 또는 제거
                  console.error("이미지 로드 실패:", img.preview);
                  e.currentTarget.src = "/images/no-image.png"; // 대체 이미지 경로
                }}
              />
              <button
                type="button"
                onClick={() => removeImg(index)}
                className="absolute z-10 p-1 text-white transition-colors rounded-full top-1 right-1 bg-black/60 hover:bg-black/80"
                aria-label={`이미지 ${index + 1} 삭제`}
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>

        {/* 파일 선택용 숨겨진 input */}
        <input
          type="file"
          ref={fileRef}
          accept="image/*"
          multiple
          className="hidden"
          onChange={uploadImg}
          disabled={isUploading || isPending}
        />
      </div>

      {/* 태그 */}
      <ReviewTag
        name="tags"
        key={`tags-${initialData?._id || "new"}`} // key 추가로 리렌더링 강제
        defaultValue={initialData?.extra?.tags || []}
      />

      {/* 에러 메시지 표시 */}
      {state?.ok === 0 && state.message && (
        <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg">{state.message}</div>
      )}

      {/* 제출 버튼 */}
      <div className="bg-white fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] p-4 max-h-21 z-20 shadow-[0_-8px_16px_-4px_rgba(0,0,0,0.1)]">
        <Button className="w-full text-16" type="submit" disabled={isPending || isUploading}>
          {isPending ? (isEditMode ? "수정 중..." : "작성 중...") : isEditMode ? "리뷰 수정 완료" : "리뷰 작성 완료"}
        </Button>
      </div>
    </form>
  );
}

"use client";

import { Camera, ImagePlus, X } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "react-toastify";

interface ReviewImgProps {
  name?: string; // FormData에서 사용할 name
}

export default function ReviewImg({ name = "images" }: ReviewImgProps) {
  const [images, setImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const MAX_IMG = 10;

  // 이미지 업로드
  const uploadImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectFiles = Array.from(e.target.files || []);
    console.log(selectFiles);

    if (images.length + selectFiles.length > MAX_IMG) {
      toast.warning("사진은 최대 10장까지 첨부할 수 있습니다.");
      return;
    }

    const newImages = [...images, ...selectFiles];
    setImages(newImages);

    // 기존 URL 해제
    previewUrls.forEach((url) => URL.revokeObjectURL(url));

    // 새로운 미리보기 URL 생성
    const newUrls = newImages.map((file) => URL.createObjectURL(file));
    setPreviewUrls(newUrls);

    e.target.value = ""; // input 초기화
  };

  // 이미지 삭제
  const removeImg = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);

    // URL 해제
    URL.revokeObjectURL(previewUrls[index]);
    const newUrls = previewUrls.filter((_, i) => i !== index);
    setPreviewUrls(newUrls);
  };

  // 파일 선택 다이얼로그 열기
  const openFileDialog = () => inputRef.current?.click();

  return (
    <div className="space-y-1.5">
      {/* 헤더 */}
      <div className="flex items-center gap-1.5">
        <Camera className="size-5" />
        <h3 className="font-semibold text-18">사진첨부</h3>
      </div>

      {/* 이미지 그리드 */}
      <div className="grid grid-cols-4 gap-2">
        {/* 업로드 버튼 */}
        <div
          className="relative flex items-center justify-center p-2 transition-colors bg-white border border-dashed rounded-lg cursor-pointer min-h-21 border-travel-gray400 hover:bg-gray-50"
          onClick={openFileDialog}
        >
          <ImagePlus className="w-10 h-10 text-travel-gray400" />
        </div>

        {/* 업로드된 이미지들 */}
        {previewUrls.map((src, index) => (
          <div
            key={index}
            className="relative p-2 bg-white border rounded-lg border-travel-gray400 min-h-21"
          >
            <img
              src={src}
              alt={`첨부이미지-${index + 1}`}
              className="object-cover w-full h-full rounded-lg"
            />
            {/* 삭제 버튼 */}
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

      {/* FormData로 전송할 숨겨진 input들 */}
      {images.map((file, index) => (
        <input
          key={index}
          type="file"
          name={`image_${index}`}
          style={{ display: "none" }}
          ref={(input) => {
            if (input) {
              const dataTransfer = new DataTransfer();
              dataTransfer.items.add(file);
              input.files = dataTransfer.files;
            }
          }}
        />
      ))}

      {/* 파일 선택용 숨겨진 input */}
      <input
        type="file"
        accept="image/*"
        multiple
        ref={inputRef}
        className="hidden"
        onChange={uploadImg}
      />
    </div>
  );
}

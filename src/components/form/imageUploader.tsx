"use client";

import { ImagePlus, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";

export default function SignUpImg() {
  // 현재 선택된 이미지의 URL
  const [imgSrc, setImgSrc] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  // 파일선택
  const attachImgPath = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 파일 타입 검증
    if (!file.type.startsWith("image/")) {
      toast.error("이미지 파일만 업로드 가능합니다.");
      return;
    }

    // URL.createObjectURL로 미리보기 설정
    const imgUrl = URL.createObjectURL(file);
    setImgSrc(imgUrl);
  };

  const imgRemove = () => {
    setImgSrc("");

    if (imgSrc && imgSrc.startsWith("blob:")) {
      URL.revokeObjectURL(imgSrc);
    }
    if (inputRef.current)
      // input 초기화
      inputRef.current.value = "";
  };

  // 컴포넌트 언마운트 시 URL 해제
  useEffect(() => {
    return () => {
      if (imgSrc && imgSrc.startsWith("blob:")) {
        URL.revokeObjectURL(imgSrc);
      }
    };
  }, [imgSrc]);

  return (
    <div className="w-full">
      <label htmlFor="attach" className="text-14">
        프로필 사진(선택사항)
      </label>

      {/* 업로드 박스 */}
      <div className="relative w-30 h-30 p-3 border rounded-lg border-travel-gray400  bg-white">
        {/* 이미지 표시 */}
        <div
          className={`w-full h-full rounded-lg border ${
            imgSrc ? "border-travel-gray400" : "border-dashed border-travel-gray300"
          } overflow-hidden flex items-center justify-center cursor-pointer`}
          onClick={() => inputRef.current?.click()}
        >
          {imgSrc ? (
            <img src={imgSrc} alt="미리보기" className="w-full h-full object-cover" />
          ) : (
            <ImagePlus className="w-10 h-10 text-travel-gray400" />
          )}
        </div>

        {/* 삭제 버튼 */}
        {imgSrc && (
          <button
            type="button"
            onClick={imgRemove}
            className="absolute top-1 right-1 bg-black/60 hover:bg-black/80 text-white p-1 rounded-full z-1"
            aria-label="첨부파일 삭제"
          >
            <X size={16} />
          </button>
        )}

        {/* 숨겨진 input */}
        <input
          type="file"
          id="attach"
          name="attach"
          accept="image/*"
          className="hidden"
          onChange={attachImgPath}
          ref={inputRef}
        />
      </div>
    </div>
  );
}

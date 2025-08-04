"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useRef, useActionState } from "react";
import Link from "next/link";
import Image from "next/image";

import useUserStore from "@/zustand/userStore";
import Input from "@/components/ui/input";
import ButtonRounded from "@/components/ui/btnRound";
import { getUser } from "@/data/functions/user";
import { refreshTokenUser, updateUser } from "@/data/actions/user";
import { Camera, Loader2, ImagePlus } from "lucide-react";
import { toast } from "react-toastify";

export default function ProfileItemEdit() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [newImg, setNewImg] = useState<string | null>(null);
  const [selectFile, setSelectFile] = useState<File | null>(null);

  const { setToken } = useUserStore.getState();
  const userInfo = useUserStore((state) => state.userInfo);
  const setUserInfo = useUserStore((state) => state.setUserInfo);
  const userToken = useUserStore((state) => state.token);
  const refreshToken = useUserStore((state) => state.refreshToken) as string;
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);

  // useActionState로 폼 상태 관리
  const [state, formAction, isPending] = useActionState(updateUser, null);

  // 로그인 체크
  useEffect(() => {
    if (!isLoggedIn || !userInfo?._id) {
      router.replace("/login");
      return;
    }
  }, [isLoggedIn, userInfo?._id]);

  // API 응답 처리
  useEffect(() => {
    if (state?.ok) {
      // API 응답에서 받은 사용자 정보로 스토어 업데이트
      const updatedUserInfo = {
        ...userInfo, // 기존 정보 유지
        ...state.item, // 업데이트된 정보로 덮어쓰기
      };
      setUserInfo(updatedUserInfo);
      toast.success("프로필이 성공적으로 업데이트되었습니다.");
      router.replace("/mypage");
    } else if (state?.ok === 0 && !state?.errors) {
      toast.error(state?.message);
    }
  }, [state]);

  // 프로필 이미지 URL 생성
  const imgUrl = userInfo?.image ? userInfo.image : "/uploadFiles/user-default.webp";

  // 사용자 정보 조회
  useEffect(() => {
    if (!isLoggedIn || !userInfo?._id) return;

    const fetchUserData = async () => {
      setIsLoading(true);
      try {
        const res = await getUser(userInfo._id);
        if (res.ok) {
          setUserInfo(res.item);
        } else {
          console.error("사용자 정보를 조회하는데 실패했습니다:", res.message);
          toast.error("사용자 정보를 불러오는데 실패했습니다.");
        }
      } catch (error) {
        console.error("네트워크 오류가 발생하였습니다.", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserData();
  }, [userInfo?._id, isLoggedIn]);

  // 파일 선택
  const attachImgPath = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // 파일 타입 검증
    if (!file.type.startsWith("image/")) {
      toast.error("이미지 파일만 업로드 가능합니다.");
      return;
    }

    // 기존 URL 해제
    if (newImg && newImg.startsWith("blob:")) {
      URL.revokeObjectURL(newImg);
    }

    // 새 URL 생성
    const imgUrl = URL.createObjectURL(file);
    setNewImg(imgUrl);
    setSelectFile(file);
  };

  // 프로필 이미지 클릭
  const handleImgClick = () => {
    fileInputRef.current?.click();
  };

  // 표시할 이미지
  const displayImage = newImg || imgUrl;

  // 컴포넌트 언마운트 시 URL 해제
  useEffect(() => {
    return () => {
      if (newImg && newImg.startsWith("blob:")) {
        URL.revokeObjectURL(newImg);
      }
    };
  }, [newImg]);

  // 폼 제출 시 파일 추가
  const handleFormSubmit = async (formData: FormData) => {
    // 선택된 파일이 있으면 FormData에 추가
    if (selectFile) {
      formData.set("attach", selectFile);
    }

    // 기존 formAction 호출
    formAction(formData);

    const res = await refreshTokenUser(refreshToken);
    const data = res?.accessToken;
    setToken(data, refreshToken);
  };

  // 로딩 중이거나 로그인되지 않은 상태
  if (isLoading || !isLoggedIn || !userInfo) {
    return (
      <div className="flex items-center justify-center w-full h-64">
        <Loader2 className="size-8 animate-spin text-travel-primary" />
      </div>
    );
  }

  return (
    <form
      action={handleFormSubmit}
      className="relative flex flex-col items-center w-full gap-6 px-5 py-8 text-center bg-white shadow rounded-xl"
    >
      <input ref={fileInputRef} type="file" accept="image/*" onChange={attachImgPath} className="hidden" />

      <input type="hidden" name="userId" value={userInfo._id} />
      <input type="hidden" name="userToken" value={userToken || ""} />

      {/* 프로필 이미지 섹션 */}
      <div className="relative overflow-hidden rounded-full cursor-pointer w-25 h-25 bg-travel-gray200 aspect-square group">
        <div className="relative w-25 h-25 bg-travel-gray200 aspect-square">
          {displayImage !== "/images/user-default.webp" ? (
            <Image
              fill
              src={displayImage}
              alt={userInfo.name || "사용자"}
              className="object-cover w-full h-full"
              onError={() => {
                setNewImg("/images/user-default.webp");
              }}
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full border-2 border-dashed border-travel-gray300 rounded-full">
              <ImagePlus className="w-10 h-10 text-travel-gray400" />
            </div>
          )}
        </div>

        {/* 호버 오버레이 */}
        <div
          className="absolute inset-0 flex items-center justify-center transition-opacity opacity-0 bg-black/60 group-hover:opacity-100 rounded-full"
          onClick={handleImgClick}
        >
          <Camera className="text-white size-7" />
        </div>
      </div>

      {/* 닉네임 */}
      <div className="w-full">
        <Input
          size="sm"
          id="username"
          name="username"
          placeholder="닉네임을 입력하세요"
          defaultValue={userInfo.name || ""}
        />
        <p className="mt-1 text-14 font-medium text-travel-fail100">{state?.ok === 0 && state.errors?.name?.msg}</p>
      </div>

      {/* 한줄소개 입력 필드 */}
      <div className="w-full">
        <Input
          key={userInfo._id}
          size="sm"
          id="desc"
          name="desc"
          placeholder="자신을 소개해보세요"
          defaultValue={userInfo.desc || ""}
        />
      </div>

      {/* 취소/수정 버튼 */}
      <div className="grid grid-cols-2 gap-1.5 w-full">
        <Link href="/mypage" className="w-full">
          <ButtonRounded size="md" variant="outline" className="w-full" disabled={isPending}>
            취소
          </ButtonRounded>
        </Link>

        <ButtonRounded
          size="md"
          variant="fill"
          type="submit"
          className="flex items-center justify-center w-full gap-1"
          disabled={isPending}
        >
          {isPending ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              <span>수정 중...</span>
            </>
          ) : (
            "수정"
          )}
        </ButtonRounded>
      </div>
    </form>
  );
}

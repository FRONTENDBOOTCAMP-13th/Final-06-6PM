"use client";

import Link from "next/link";
import { useActionState, useEffect } from "react";
import { createUser } from "@/data/actions/user";
import { useRouter } from "next/navigation";
import Input from "@/components/ui/input";
import Button from "@/components/ui/btn";
import { toast } from "react-toastify";

export default function SignupForm() {
  const [state, formAction, isLoading] = useActionState(createUser, null);
  console.log(isLoading, state);

  const router = useRouter();

  useEffect(() => {
    if (state?.ok) {
      toast.success("회원 가입이 완료되었습니다. 로그인 페이지로 이동합니다.");
      router.replace("/login");
    } else if (state?.ok === 0 && !state?.errors) {
      // 입력값 검증에러가 아닌 경우
      toast.error(state?.message);
    }
  }, [state]);

  return (
    <form
      action={formAction}
      className="w-full bg-white rounded-xl shadow border border-travel-gray400 p-6 flex flex-col gap-4 items-center"
    >
      <input type="hidden" name="type" value="user" />

      {/* 이름 */}
      <div className="w-full">
        <Input
          size="md"
          id="name"
          name="name"
          placeholder="이름을 입력해주세요"
        />
        <p className="mt-1 text-14 font-medium text-travel-fail100">
          {state?.ok === 0 && state.errors?.name?.msg}
        </p>
      </div>

      {/* 이메일 */}
      <div className="w-full">
        <Input
          size="md"
          id="email"
          name="email"
          placeholder="이메일을 입력해주세요"
        />
        <p className="mt-1 text-14 font-medium text-travel-fail100">
          {state?.ok === 0 && state.errors?.email?.msg}
        </p>
      </div>

      {/* 비밀번호 */}
      <div className="w-full">
        <Input
          size="md"
          id="password"
          name="password"
          type="password"
          placeholder="비밀번호를 입력해주세요"
        />
        <p className="mt-1 text-14 font-medium text-travel-fail100">
          {state?.ok === 0 && state.errors?.password?.msg}
        </p>
      </div>

      {/* 이미지 */}
      <div className="w-full">
        <label htmlFor="attach" className="sr-only">
          프로필 이미지
        </label>
        <input
          type="file"
          id="attach"
          accept="image/*"
          placeholder="이미지를 선택하세요"
          className="w-full px-4 py-3.5 text-16 rounded-lg border border-travel-gray400 bg-white text-travel-gray500 placeholder-travel-gray500 ${inputSize[size]} ${className} focus:outline-travel-primary-light100 focus:bg-travel-gray100"
          name="attach"
        />
      </div>

      <div className="flex justify-center items-center gap-4">
        <Button type="submit" variant="primary" size="md">
          회원가입
        </Button>
        <Link href="/">
          <Button variant="outline" size="md">
            취소
          </Button>
        </Link>
      </div>
    </form>
  );
}

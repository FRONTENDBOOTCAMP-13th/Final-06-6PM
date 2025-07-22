"use client";

import React, { useActionState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Input from "@/components/ui/input";
import Button from "@/components/ui/btn";
import { login } from "@/data/actions/user";
import { toast } from "react-toastify";

export default function LoginForm() {
  const router = useRouter();
  const [userState, formAction, isLoading] = useActionState(login, null);
  const redirect = useSearchParams().get("redirect");
  console.log(isLoading, userState);

  useEffect(() => {
    if (userState?.ok) {
      toast.success("로그인이 완료되었습니다.");
      router.replace(redirect || "/home");
    } else if (!userState?.errors && userState?.message) {
      toast.error(userState.message);
    }
  }, [userState]);

  return (
    <form
      action={formAction}
      className="w-full bg-white rounded-xl shadow border border-travel-gray400 p-6 flex flex-col gap-4 items-center"
    >
      {/* 이메일 */}
      <div className="w-full">
        <Input size="md" id="email" name="email" placeholder="test@email.com" />
        <p className="mt-1 text-14 font-medium text-travel-fail100">
          {!userState?.ok && userState?.errors?.email?.msg}
        </p>
      </div>

      {/* 비밀번호 */}
      <div className="w-full">
        <Input
          size="md"
          id="password"
          name="password"
          type="password"
          placeholder="password"
        />
        <p className="mt-1 text-14 font-medium text-travel-fail100">
          {!userState?.ok && userState?.errors?.password?.msg}
        </p>
      </div>

      <Button
        className="w-full"
        size="lg"
        variant="primary"
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? "로그인 중..." : "로그인"}
      </Button>
    </form>
  );
}

"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/ui/input";
import Button from "@/components/ui/btn";

export default function LoginForm() {
  const router = useRouter();
  const [userEmailValue, setUserEmailValue] = useState("");
  const [userPasswordValue, setUserPasswordValue] = useState("");

  const formSubmit = () => {
    console.log("폼 제출");
    router.push("/home");
  };

  return (
    <form
      action={formSubmit}
      className="w-full bg-white rounded-xl shadow border border-travel-gray400 p-6 flex flex-col gap-4 items-center"
    >
      {/* 이메일 */}
      <div className="w-full">
        <Input
          size="md"
          id="userEmail"
          name="userEmail"
          placeholder="test@email.com"
          defaultValue={userEmailValue}
        />
      </div>

      {/* 비밀번호 */}
      <div className="w-full">
        <Input
          size="md"
          id="password"
          name="password"
          type="password"
          placeholder="password"
          defaultValue={userPasswordValue}
        />
      </div>

      <Button className="w-full" size="lg" variant="primary" type="submit">
        로그인
      </Button>
    </form>
  );
}

"use client";

import Button from "@/components/ui/btn";
import Input from "@/components/feature/input";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [userEmailValue, setUserEmailValue] = useState("");
  const [userPasswordValue, setUserPasswordValue] = useState("");

  return (
    <div className="flex flex-col gap-8 items-center justify-center min-h-dvh">
      <Image
        src="/images/log.png"
        alt="여행로그인 로고"
        width={200}
        height={200}
        className="object-contain aspect-ratio w-[60%]"
        priority
      />
      <div className="w-full bg-white rounded-xl shadow border border-travel-gray400 p-6 flex flex-col gap-4 items-center">
        <Input
          size="md"
          placeholder="test@email.com"
          value={userEmailValue}
          onChange={(e) => setUserEmailValue(e.target.value)}
        />
        <Input
          size="md"
          placeholder="password"
          value={userPasswordValue}
          onChange={(e) => setUserPasswordValue(e.target.value)}
        />
        <Button className="w-full" size="lg" variant="primary">
          로그인
        </Button>
        <div className="text-travel-gray400 text-16 flex items-center gap-2">
          <Link
            href="#"
            className="hover:text-travel-primary100 transition text-travel-text100"
          >
            회원가입
          </Link>
          <span>|</span>
          <Link
            href="#"
            className="hover:text-travel-primary100 transition text-travel-text100"
          >
            비밀번호 찾기
          </Link>
        </div>
      </div>
    </div>
  );
}

import LoginForm from "@/components/form/loginForm";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex flex-col gap-8 items-center justify-center min-h-dvh">
      <Image
        src="/images/logo.png"
        alt="여행로그인 로고"
        width={200}
        height={200}
        className="object-contain aspect-ratio w-[60%]"
        priority
      />

      <LoginForm />

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
  );
}

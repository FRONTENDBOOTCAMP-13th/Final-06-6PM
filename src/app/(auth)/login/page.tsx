import MyPassword from "@/components/auth/myPassword";
import LoginForm from "@/components/form/auth/loginForm";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex flex-col gap-8 items-center justify-center min-h-dvh">
      <Image
        src="/images/logo.svg"
        alt="여행로그인 로고"
        width={170}
        height={170}
        className="object-contain aspect-ratio w-[50%]"
        priority
      />

      <LoginForm />

      <div className="text-travel-gray400 text-16 flex items-center gap-2">
        <Link href="/signup" className="hover:text-travel-primary100 transition text-travel-text100">
          회원가입
        </Link>
        <span>|</span>
        <MyPassword />
      </div>
    </div>
  );
}

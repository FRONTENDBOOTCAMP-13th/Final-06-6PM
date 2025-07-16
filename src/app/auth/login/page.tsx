"use client";

import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="flex-1 flex flex-col items-center justify-center w-full">
        <div className="w-full max-w-sm flex flex-col items-center mx-auto">
          <div className="mt-16 mb-8 w-56 h-44 relative">
            <Image
              src="/images/log.png"
              alt="여행로그인 로고"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="w-full bg-white rounded-xl shadow border border-travel-gray400 px-6 py-7 flex flex-col items-center">
            <input
              type="email"
              placeholder="test@email.com"
              className="w-full mb-4 px-4 py-3 rounded-md border border-travel-gray400 bg-travel-bg100 focus:outline-none focus:ring-2 focus:ring-travel-primary100 text-16 text-travel-text100"
            />
            <input
              type="password"
              placeholder="password"
              className="w-full mb-6 px-4 py-3 rounded-md border border-travel-gray400 bg-travel-bg100 focus:outline-none focus:ring-2 focus:ring-travel-primary100 text-16 text-travel-text100"
            />
            <button className="w-full bg-travel-primary100 text-white font-bold py-3 rounded-md text-16 mb-4 hover:bg-travel-secondary100 transition cursor-pointer">
              로그인
            </button>
            <div className="w-full text-center text-travel-gray400 text-14 flex gap-1 justify-center">
              <a
                href="/auth/register"
                className="no-underline hover:text-travel-primary100 transition text-travel-text100"
              >
                회원가입
              </a>
              <span>/</span>
              <a
                href="/auth/findpw"
                className="no-underline hover:text-travel-primary100 transition text-travel-text100"
              >
                비밀번호 찾기
              </a>
            </div>
          </div>
        </div>
      </div>

      <footer className="w-full text-center text-travel-gray600 text-12 py-5">
        © 2025 멋쟁이사자처럼 프론트엔드 부트캠프 13기
        <br />
        Final Project 6팀 6PM
      </footer>
    </div>
  );
}

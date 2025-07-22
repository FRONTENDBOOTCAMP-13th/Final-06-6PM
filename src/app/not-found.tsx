"use client";
import { MapPin, Plane, Home, Search } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-travel-bg200 to-travel-bg100 flex items-center justify-center p-4">
      <div className="w-full text-center">
        <div className="relative mb-6">
          <div className="absolute -top-4 left-10 animate-bounce">
            <div className="bg-travel-secondary300 text-white p-3 rounded-full shadow-lg">
              <Plane className="w-6 h-6" />
            </div>
          </div>
          <div className="absolute -top-2 right-10 animate-bounce">
            <div className="bg-travel-secondary100 text-white p-2 rounded-full shadow-lg">
              <MapPin className="w-5 h-5" />
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h1 className="text-8xl font-bold text-travel-secondary300 mb-4">
            404
          </h1>
          <h2 className="text-28 font-bold text-black mb-2">
            길을 잃으셨나요?
          </h2>
          <p className="text-18 text-travel-gray700">
            여행의 출발점으로 안내할게요!
          </p>
        </div>

        <div className="flex justify-center mb-8">
          <Link
            href="/home"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-travel-secondary300 hover:bg-travel-primary200 text-white font-medium rounded-full transition-colors shadow-md hover:shadow-lg"
          >
            <Home className="w-5 h-5" />
            홈으로 돌아가기
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-travel-bg200 p-6 text-center">
            <div className="bg-travel-bg100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <Search className="w-6 h-6 text-travel-secondary300" />
            </div>
            <h3 className="font-semibold text-black mb-2">리뷰 살펴보기</h3>
            <p className="text-14 text-travel-gray700 mb-3">
              가고 싶은 여행지의 <br /> 생생한 후기
            </p>
            <Link
              href="/feed"
              className="text-travel-secondary300 hover:text-travel-primary200 font-medium text-14 transition-colors"
            >
              살펴보기
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-travel-bg200 p-6 text-center">
            <div className="bg-travel-bg100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <Plane className="w-6 h-6 text-travel-secondary300" />
            </div>
            <h3 className="font-semibold text-black mb-2">여행 일정만들기</h3>
            <p className="text-14 text-travel-gray700 mb-3">
              간편하게 만드는 <br /> 나만의 일정
            </p>
            <Link
              href="/plan"
              className="text-travel-secondary300 hover:text-travel-primary200 font-medium text-14 transition-colors"
            >
              계획하기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

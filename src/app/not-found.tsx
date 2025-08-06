import { MapPin, Plane, Home, Search, ArrowRightCircleIcon } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-travel-bg200 to-travel-bg100">
      <div className="w-full text-center">
        <div className="relative mb-6">
          <div className="absolute -top-4 left-10 animate-bounce">
            <div className="p-3 text-white rounded-full shadow-lg bg-travel-secondary300">
              <Plane className="w-6 h-6" />
            </div>
          </div>
          <div className="absolute -top-2 right-10 animate-bounce">
            <div className="p-2 text-white rounded-full shadow-lg bg-travel-secondary100">
              <MapPin className="w-5 h-5" />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="font-bold text-8xl text-travel-secondary300">404</h1>
          <h2 className="font-bold text-black text-28">길을 잃으셨나요?</h2>
          <p className="text-16 text-travel-gray700">여행의 출발점으로 안내할게요!</p>
        </div>

        <Link
          href="/home"
          className="flex items-center gap-2 px-6 py-3 mx-auto my-8 font-medium text-white transition-colors rounded-full shadow-md w-fit bg-travel-secondary300 hover:bg-travel-primary200 hover:shadow-lg"
        >
          <Home className="w-5 h-5" />
          <span>홈으로 돌아가기</span>
        </Link>

        <div className="grid gap-4 xs:grid-cols-2">
          <div className="p-6 text-center transition-shadow bg-white border rounded-lg shadow-md hover:shadow-lg border-travel-bg200">
            <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 rounded-full bg-travel-bg100">
              <Search className="w-6 h-6 text-travel-secondary300" />
            </div>
            <h3 className="mb-2 font-semibold text-black">여행후기 보기</h3>
            <p className="mb-3 text-14 text-travel-gray700">
              가고 싶은 여행지의 <br /> 생생한 후기
            </p>
            <Link
              href="/feed"
              className="flex items-center justify-center gap-1 font-medium transition-colors text-travel-secondary300 hover:text-travel-primary200 text-14"
            >
              <span>여행후기</span>
              <ArrowRightCircleIcon />
            </Link>
          </div>

          <div className="p-6 text-center transition-shadow bg-white border rounded-lg shadow-md hover:shadow-lg border-travel-bg200">
            <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 rounded-full bg-travel-bg100">
              <Plane className="w-6 h-6 text-travel-secondary300" />
            </div>
            <h3 className="mb-2 font-semibold text-black">여행 일정만들기</h3>
            <p className="mb-3 text-14 text-travel-gray700">
              간편하게 만드는 <br /> 나만의 일정
            </p>
            <Link
              href="/plan"
              className="flex items-center justify-center gap-1 font-medium transition-colors text-travel-secondary300 hover:text-travel-primary200 text-14"
            >
              <span>계획하기</span>
              <ArrowRightCircleIcon />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

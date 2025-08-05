"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { ToastContainer } from "react-toastify";
import Footer from "@/components/Footer";

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const [showIntro, setShowIntro] = useState<boolean | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);

    const introSeen = sessionStorage.getItem("introSeen");

    if (introSeen === null) {
      setShowIntro(true);
      const timer = setTimeout(() => {
        setShowIntro(false);
        sessionStorage.setItem("introSeen", "true");
      }, 3000);

      return () => clearTimeout(timer);
    } else {
      setShowIntro(false);
    }
  }, []);

  if (!isHydrated || showIntro === null) {
    return (
      <>
        <div className="h-screen"></div>
        <Footer />
      </>
    );
  }

  if (showIntro === true) {
    return (
      <>
        <div className="flex items-center justify-center h-screen">
          <div className="text-center px-8">
            <div className="mb-12">
              <div className="flex items-center justify-center mb-6">
                <Image
                  src="/images/logo.svg"
                  alt="여행도감 로고"
                  width={200}
                  height={200}
                  className="object-contain animate-bounce w-[80%]"
                  priority
                />
              </div>
              <div>
                <p className="text-20 font-medium text-black mb-2">여행의 모든 기록이 모이는 곳</p>
                <p className="text-6xl font-extrabold text-black mb-4">여행도감</p>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      {children}
      <ToastContainer position="top-center" autoClose={2000} hideProgressBar closeOnClick pauseOnHover draggable />
    </>
  );
}

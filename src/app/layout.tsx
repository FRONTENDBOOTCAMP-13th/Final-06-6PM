"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import "../styles/globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "@/components/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [showIntro, setShowIntro] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const introSeen = sessionStorage.getItem("introSeen");
    if (introSeen) {
      setShowIntro(false);
      setIsLoading(false);
    } else {
      const timer = setTimeout(() => {
        setShowIntro(false);
        setIsLoading(false);
        sessionStorage.setItem("introSeen", "true");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  if (showIntro || isLoading) {
    return (
      <html lang="ko">
        <body>
          <div className="font-sans w-full max-w-[430px] mx-auto min-h-screen bg-gradient-to-br from-travel-bg200 to-travel-bg100">
            <div className="flex items-center justify-center h-screen">
              <div className="text-center px-8">
                <div className="mb-12">
                  <div className="flex items-center justify-center mb-6">
                    <Image
                      src="/images/logo.png"
                      alt="여행도감 로고"
                      width={200}
                      height={200}
                      className="object-contain animate-bounce w-[80%]"
                      priority
                    />
                  </div>
                  <div>
                    <p className="text-20 font-medium text-black mb-2">
                      여행의 모든 기록이 모이는 곳
                    </p>
                    <p className="text-6xl font-extrabold text-black mb-4">
                      여행도감
                    </p>
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                </div>
              </div>
            </div>
            <Footer />
          </div>
        </body>
      </html>
    );
  }

  return (
    <html lang="ko">
      <body>
        <div className="font-sans w-full max-w-[430px] mx-auto min-h-screen bg-travel-bg100">
          {children}
          <ToastContainer
            position="top-center"
            autoClose={2000}
            hideProgressBar
            closeOnClick
            pauseOnHover
            draggable
          />
        </div>
      </body>
    </html>
  );
}

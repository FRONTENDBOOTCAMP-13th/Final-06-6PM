"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { ToastContainer } from "react-toastify";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import LoadingLottie from "@/components/home/loadingLottie";

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

  if (showIntro === false) {
    return (
      <>
        <div className="flex items-center justify-center h-screen">
          <div className="text-center px-8">
            <motion.div
              className="mb-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.3,
                ease: "easeOut",
              }}
            >
              <div className="mb-6">
                <div className="flex items-center justify-center">
                  <motion.span
                    className="absolute text-2xl z-10"
                    initial={{
                      x: -100,
                      y: 150,
                    }}
                    animate={{
                      x: 60,
                      y: -40,
                    }}
                    transition={{
                      delay: 0,
                      duration: 1,
                      ease: "easeInOut",
                    }}
                  >
                    <Image
                      src="/images/airplane.svg"
                      alt="비행기 로고"
                      width={80}
                      height={80}
                      className="object-contain"
                      priority
                    />
                  </motion.span>

                  <motion.span
                    initial={{
                      x: -100,
                    }}
                    animate={{
                      x: -30,
                    }}
                    transition={{
                      delay: 0,
                      duration: 0.7,
                      ease: "easeInOut",
                    }}
                  >
                    <Image
                      src="/images/favicon.svg"
                      alt="여행도감 로고"
                      width={100}
                      height={100}
                      className="object-contain"
                      priority
                    />
                  </motion.span>

                  <motion.span
                    className="absolute text-2xl"
                    initial={{
                      x: 150,
                      y: 30,
                    }}
                    animate={{
                      x: 40,
                      y: 30,
                    }}
                    transition={{
                      delay: 0,
                      duration: 0.7,
                      ease: "easeInOut",
                    }}
                  >
                    <Image
                      src="/images/car.svg"
                      alt="차 로고"
                      width={100}
                      height={100}
                      className="object-contain"
                      priority
                    />
                  </motion.span>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center">
                <Image
                  src="/images/typo-loading.svg"
                  alt="여행도감"
                  width={200}
                  height={200}
                  className="object-contain w-full my-4"
                  priority
                />
                <Image
                  src="/images/subtitle.svg"
                  alt="부제목"
                  width={100}
                  height={100}
                  className="object-contain w-[70%] mb-4"
                  priority
                />
              </div>
            </motion.div>
            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: 0.8,
                duration: 0.4,
              }}
            >
              <LoadingLottie />
            </motion.div>
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

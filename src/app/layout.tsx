import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import ClientLayout from "@/components/ClientLayout";

export const metadata = {
  title: "여행도감",
  description: "여행을 계획하고 기록하는 나만의 여행도감",
  icons: {
    icon: "/images/favicon.svg",
  },
  openGraph: {
    title: "여행도감",
    description: "여행을 계획하고 기록하는 나만의 여행도감",
    url: "https://final-6-6-pm.vercel.app/",
    siteName: "여행도감",
    images: [
      {
        url: "/images/traveldiary.png",
        width: 300,
        height: 300,
        alt: "여행도감 대표 이미지",
      },
    ],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <div className="font-sans w-full max-w-[430px] mx-auto min-h-screen bg-travel-bg100">
          <ClientLayout>{children}</ClientLayout>
        </div>
      </body>
    </html>
  );
}

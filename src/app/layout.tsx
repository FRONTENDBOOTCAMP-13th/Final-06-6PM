import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import ClientLayout from "@/components/ClientLayout";

export const metadata = {
  title: "여행도감",
  description: "여행을 계획하고 기록하는 나만의 여행도감",
  icons: {
    icon: "/images/favicon.svg",
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

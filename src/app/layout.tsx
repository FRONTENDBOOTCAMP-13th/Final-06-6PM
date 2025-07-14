import Navbar from "@/components/Navbar";
import "../styles/globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <div className="relative w-full max-w-[430px] mx-auto min-h-screen bg-travel-bg100 p-4 pb-25 border">
          {children}
          <Navbar />
        </div>
      </body>
    </html>
  );
}

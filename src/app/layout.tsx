import "../styles/globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <div className="font-sans w-full max-w-[430px] mx-auto min-h-screen bg-travel-bg100">
          {children}
        </div>
      </body>
    </html>
  );
}

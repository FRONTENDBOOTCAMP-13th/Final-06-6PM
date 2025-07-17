import "../styles/globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <div className="absolute w-full max-w-[430px] left-1/2 -translate-x-1/2 min-h-screen bg-travel-bg100">
          {children}
        </div>
      </body>
    </html>
  );
}

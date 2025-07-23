import "../styles/globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

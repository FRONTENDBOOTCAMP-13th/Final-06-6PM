import LoginStatusConfirm from "@/components/feature/loginStatusConfirm";
import "../../../styles/globals.css";

export default function BasicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      {children}
      {/* 로그인 확인 */}
      <LoginStatusConfirm />
    </div>
  );
}

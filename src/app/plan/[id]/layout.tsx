import "../../../styles/globals.css";

export const metadata = {
  title: "공유된 여행일정 보기",
  description: "친구가 공유한 여행 계획을 확인해보세요. 여행지, 일정, 계획까지 한눈에!",
};

export default function BasicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}

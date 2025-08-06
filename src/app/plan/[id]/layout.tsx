import "../../../styles/globals.css";

export async function generateMetadata() {
  return {
    title: "공유된 여행일정 보기",
    description: "친구가 공유한 여행 계획을 확인해보세요. 여행지, 일정, 계획까지 한눈에!",
    openGraph: {
      title: "공유된 여행일정 보기",
      description: "친구가 공유한 여행 계획을 확인해보세요. 여행지, 일정, 계획까지 한눈에!",
      url: "https://final-6-6-pm.vercel.app/plan",
    },
  };
}

export default function BasicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}

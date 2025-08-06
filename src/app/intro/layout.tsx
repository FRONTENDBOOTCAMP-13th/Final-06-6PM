export default function IntroLayout({ children }: { children: React.ReactNode }) {
  return <div className="fixed inset-0 w-screen h-screen overflow-auto bg-travel-secondary200">{children}</div>;
}

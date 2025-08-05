import Navbar from "@/components/Navbar";
import "../../../styles/globals.css";
import BackButton from "@/components/feature/backButton";

export default function NavbarLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className="relative w-full px-4 py-5">
        <BackButton />
        <p className="text-center">여행후기</p>
      </div>
      <div className="relative w-full px-4 pb-25">{children}</div>
      <Navbar />
    </div>
  );
}

import "../../styles/globals.css";
import Footer from "@/components/Footer";

export default function FooterLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className="relative w-full px-4 pb-25 h-dvh">{children}</div>
      <Footer />
    </div>
  );
}

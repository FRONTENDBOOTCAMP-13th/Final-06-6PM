import { Send } from "lucide-react";
import "../../../styles/globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative h-full">
      {children}
      <div className="w-full mt-4">
        <label htmlFor="feedMessage" className="sr-only">
          댓글창
        </label>
        <div className="relative">
          <input
            type="text"
            placeholder="댓글을 입력해주세요."
            id="feedMessage"
            className="w-full py-2 pl-4 pr-10 rounded-full border border-travel-info100 bg-white text-travel-text100 placeholder-travel-gray500  focus:outline-travel-info200 focus:bg-blue-100 focus:text-travel-info200 transition duration-200 text-14"
          />
          <button
            type="submit"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-travel-text100 cursor-pointer"
          >
            <Send className="text-travel-info100 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

import Image from "next/image";
import { ContentDataProps } from "@/types/travel";

interface ContentDetailProps {
  contentData?: ContentDataProps;
}

export default function ContentDetail({ contentData }: ContentDetailProps) {
  if (!contentData) return null;

  return (
    <div className="p-4 border border-gray-300 rounded-2xl bg-white">
      {contentData.firstimage && (
        <Image
          src={contentData.firstimage}
          alt={contentData.title}
          width={400}
          height={300}
          className="aspect-4/3 object-cover rounded-2xl"
        />
      )}
      <h3 className="text-18 font-bold mt-2">{contentData.title}</h3>
      <p className="text-14 mt-1">{contentData.addr1}</p>
      <p className="mt-2 text-14">{contentData.overview}</p>
    </div>
  );
}

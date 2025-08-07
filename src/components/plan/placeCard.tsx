import Image from "next/image";
import { Plus, Star } from "lucide-react";
import { categories } from "@/lib/data/categoryList";
import TagItem from "@/components/feature/tagItem";

export default function PlaceCard({
  item,
  onClick,
  onAdd,
}: {
  item: any;
  onClick?: () => void;
  onAdd?: (e: React.MouseEvent) => void;
}) {
  const categoryName = categories.find((cat) => cat.id === String(item.contenttypeid))?.name || "기타";

  return (
    <div
      className="w-full bg-white rounded-2xl shadow-[0_0_6px_rgba(0,0,0,0.3)] py-4 px-3 grid grid-cols-[auto_1fr_auto] items-center gap-2"
      onClick={onClick}
    >
      <div className="w-[70px] h-[70px] rounded-2xl bg-travel-gray200 overflow-hidden aspect-square">
        {item.firstimage ? (
          <Image
            width={100}
            height={100}
            src={item.firstimage}
            alt={item.title}
            className="object-cover w-full h-full"
            priority
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
        )}
      </div>

      <div className="max-w-[240px] xs:max-w-[270px] text-travel-text100 overflow-hidden">
        <div className="w-full grid grid-cols-[1fr_auto] items-center gap-2">
          <h2 className="font-bold line-clamp-2">{item.title}</h2>
          <TagItem variant="primary" size="sm">
            {categoryName}
          </TagItem>
        </div>

        <p className="mt-1 line-clamp-1 text-travel-gray600 text-14">{item.addr1 || "주소 정보 없음"}</p>

        {/* <div className="flex items-center gap-1">
          <div className="flex items-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                fill="currentColor"
                stroke="currentColor"
                className={`size-4 ${i < Math.floor(0) ? "text-travel-warn100" : "text-travel-gray400"}`}
              />
            ))}
          </div>
          <p className="text-14 text-travel-text100">
            <span>0</span>
            <span>(0)</span>
          </p>
        </div> */}
      </div>

      <button
        type="button"
        aria-label="아이템 추가"
        onClick={(e) => {
          e.stopPropagation();
          onAdd?.(e);
        }}
        className="cursor-pointer"
      >
        <Plus className="size-5 text-travel-gray700" />
      </button>
    </div>
  );
}

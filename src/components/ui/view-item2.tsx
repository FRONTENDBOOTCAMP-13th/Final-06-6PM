import { MapPin, X, Star } from "lucide-react";

type Props = {
  userName: string;
  location: string;
  content: string;
  tags: string[];
  onEdit?: () => void;
  onClose?: () => void;
};

export default function ViewItem2({
  userName,
  location,
  content,
  tags,
  onEdit,
  onClose,
}: Props) {
  return (
    <div className="relative rounded-xl bg-travel-bg100 shadow p-4 w-full max-w-xl">
      <div className="absolute top-4 right-4 flex flex-col items-end gap-1 z-10">
        <button
          className="p-1 rounded-full"
          onClick={onClose}
          type="button"
          aria-label="닫기"
        >
          <X className="w-5 h-5 text-travel-gray600" />
        </button>
        <button
          className="text-12 px-3 py-1 rounded-full border bg-travel-bg100 text-travel-gray700"
          onClick={onEdit}
          type="button"
        >
          수정
        </button>
      </div>
      <div className="mb-2">
        <div className="font-medium text-16 text-travel-gray700">
          {userName}
        </div>
        <div className="flex items-center text-12 text-travel-info100">
          <MapPin className="w-4 h-4 mr-1" />
          {location}
        </div>
      </div>
      <div className="flex items-center mb-2 pl-0">
        {[...Array(5)].map(
          (
            _,
            i //도움 좀 받았습니다 ,,
          ) => (
            <Star
              key={i}
              className="w-4 h-4 text-travel-warn100"
              fill="currentColor"
            />
          )
        )}
      </div>
      <div className="flex gap-3 mb-2">
        <div className="flex-1 h-28 bg-travel-gray200 rounded-lg" />
        <div className="flex-1 h-28 bg-travel-gray200 rounded-lg" />
      </div>
      <div className="text-14 text-travel-text200 mb-2 line-clamp-3">
        {content}
      </div>
      <div className="flex flex-wrap gap-1 mb-2">
        {tags.map((tag) => (
          <span key={tag} className="text-12 text-travel-info100">
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
}

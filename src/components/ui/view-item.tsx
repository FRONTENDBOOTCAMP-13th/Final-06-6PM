import { MapPin, Eye, Heart, MessageCircleMore, Bookmark } from "lucide-react";

type Props = {
  userName: string;
  location: string;
  content: string;
  tags: string[];
  views: number;
  likes: number;
  comments: number;
  date: string;
};

export default function ViewItem({
  userName,
  location,
  content,
  tags,
  views,
  likes,
  comments,
  date,
}: Props) {
  return (
    <div className="relative rounded-xl bg-travel-bg100 shadow p-4 w-full max-w-xl">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-travel-gray300" />
          <div>
            <div className="font-medium text-16 text-travel-gray700">
              {userName}
            </div>
            <div className="flex items-center text-12 text-travel-info100">
              <MapPin className="w-4 h-4 mr-1" />
              {location}
            </div>
          </div>
        </div>
        <Bookmark className="w-6 h-6 text-travel-gray400" />
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
      <div className="flex justify-between items-center text-travel-gray600 text-12">
        <div className="flex gap-4 items-center">
          <span className="flex items-center gap-1">
            <Eye className="w-4 h-4" />
            {views}
          </span>
          <span className="flex items-center gap-1">
            <Heart className="w-4 h-4" />
            {likes}
          </span>
          <span className="flex items-center gap-1">
            <MessageCircleMore className="w-4 h-4" />
            {comments}
          </span>
        </div>
        <span>{date}</span>
      </div>
    </div>
  );
}

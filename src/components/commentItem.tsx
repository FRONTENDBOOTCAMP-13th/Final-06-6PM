interface CommentItemProps {
  author: string;
  date: string;
  content: string;
}

export default function CommentItemComponent({ author, date, content }: CommentItemProps) {
  return (
    <div className="bg-gray-50 rounded-lg">
      <div className="flex gap-3">
        <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
        
        <div className="mb-1">
          <span className="text-10">{author}</span>
          <div className="text-10">{date}</div>
        </div>
      </div>
      
      <div className="ml-1">
        <p className="text-10 text-gray-700 leading-relaxed">{content}</p>
      </div>
    </div>
  );
}


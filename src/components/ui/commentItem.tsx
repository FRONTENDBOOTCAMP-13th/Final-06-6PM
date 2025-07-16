interface CommentItemProps {
  author: string;
  date: string;
  content: string;
}

export default function CommentItem({
  author,
  date,
  content,
}: CommentItemProps) {
  return (
    <div className="rounded-lg text-travel-text100 text-14 font-sans">
      <div className="flex gap-2 items-center mb-2">
        <div className="w-10 h-10 bg-travel-gray300 rounded-full"></div>

        <div>
          <p className="font-semibold">{author}</p>
          <p>{date}</p>
        </div>
      </div>

      <div>
        <p className=" text-travel-gray700">{content}</p>
      </div>
    </div>
  );
}

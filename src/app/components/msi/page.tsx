import CommentItem from "@/components/ui/commentItem";
import FreeItem from "@/components/ui/freeItem";

export default function ComponentPage() {
  return (
    <div className="flex flex-col gap-4 items-center p-4 ">
      <div>
        <h2 className="mb-2">Comment Item</h2>
        <div className="bg-travel-gray100 p-4">
          <CommentItem
            author="작성자"
            content="댓글내용 댓글내용 댓글내용 댓글내용 댓글내용 댓글내용"
            date="2025-07-13"
          />
        </div>
      </div>
      <div>
        <h2 className="mb-2">Free Item</h2>
        <div className="bg-travel-gray100 p-4">
          <FreeItem
            title="제목입니다"
            author="작성자"
            content="내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다"
            date="2025-07-13"
            view={20}
            comment={13}
          />
        </div>
      </div>
    </div>
  );
}

import CommentItem from "@/components/ui/commentItem";
import FreeItem from "@/components/ui/freeItem";
import SelectMenu3 from "@/components/ui/selectMenu3";
import SelectMenu2 from "@/components/ui/selectMenu2";

export default function ComponentPage() {
  return (
    <div className="flex flex-col gap-4 items-center">
      <div className="w-full">
        <h2 className="mb-2">Comment Item</h2>
        <div>
          <CommentItem
            author="작성자"
            content="댓글내용 댓글내용 댓글내용 댓글내용 댓글내용 댓글내용"
            date="2025-07-13"
          />
        </div>
      </div>
      <div>
        <h2 className="mb-2">Free Item</h2>
        <div>
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
      <div className="w-full">
        <h2>Select Menu - 3</h2>
        <SelectMenu3 />
      </div>
      <div className="w-full">
        <h2>Select Menu - 2</h2>
        <SelectMenu2 />
      </div>
    </div>
  );
}

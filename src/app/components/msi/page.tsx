import CommentItem from "@/components/ui/commentItem";
import FreeItem from "@/components/ui/freeItem";
import SelectMenu3 from "@/components/ui/selectMenu3";
import SelectMenu2 from "@/components/ui/selectMenu2";
import TagItem from "@/components/ui/tagItem";

export default function ComponentPage() {
  return (
    <div className="flex flex-col gap-8 items-center">
      <div className="w-full">
        <h2 className="mb-2">Comment Item</h2>
        <CommentItem
          author="작성자"
          content="댓글내용 댓글내용 댓글내용 댓글내용 댓글내용 댓글내용"
          date="2025-07-13"
        />
      </div>
      <div className="w-full">
        <h2 className="mb-2">Free Item</h2>
        <FreeItem
          title="제목입니다"
          author="작성자"
          content="내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다"
          date="2025-07-13"
          view={20}
          comment={13}
        />
      </div>
      <div className="w-full">
        <h2>Select Menu - 3</h2>
        <SelectMenu3 />
      </div>
      <div className="w-full">
        <h2>Select Menu - 2</h2>
        <SelectMenu2 />
      </div>
      <div className="w-full">
        <h2>tag Item</h2>
        <TagItem>전체</TagItem>
        <TagItem variant="success">맛집</TagItem>
        <TagItem variant="fail">숙박</TagItem>
        <TagItem variant="warn">축제</TagItem>
        <TagItem variant="info">관광지</TagItem>
        <TagItem variant="outline">관광지</TagItem>
        <TagItem variant="fill">관광지</TagItem>

        <TagItem variant="outline" closeIcon>관광지 </TagItem>
        <TagItem variant="outline" closeIcon>기이이이이인 관광지 </TagItem>
      </div>
    </div>
  );
}

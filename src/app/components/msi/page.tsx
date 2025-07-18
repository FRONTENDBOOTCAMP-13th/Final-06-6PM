import CommentItem from "@/components/ui/commentItem";
import FreeItem from "@/components/ui/freeItem";
import SelectMenu3 from "@/components/feature/selectMenu3";
import SelectMenu2 from "@/components/feature/selectMenu2";
import TagItem from "@/components/ui/tagItem";
import DropdownItem from "@/components/ui/dropdownItem";

export default function ComponentPage() {
  return (
    <div className="flex flex-col items-center">
      {/* CommentItem */}
      <div className="w-full py-4 space-y-4">
        <h2 className="font-bold">CommentItem</h2>
        <CommentItem
          imgUrl="/images/user4.png"
          author="문서인"
          content="바다 보면서 먹는 회는 진짜 최고였어요. 또 가고 싶네요! 
          산책로가 잘 정비되어 있어서 가족끼리 걷기 너무 좋았어요.  
          숙소 뷰가 미쳤어요... 아침에 창문 열자마자 감탄함."
          date="2025-07-13"
        />
      </div>

      {/* FreeItem :: 07-18기준 사용하지 않는 컴포넌트*/}
      <div className="w-full py-4 space-y-4">
        <h2 className="font-bold">FreeItem</h2>
        <FreeItem
          title="제목입니다"
          author="작성자"
          content="내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다"
          date="2025-07-13"
          view={20}
          comment={13}
        />
      </div>

      <div className="w-full py-4 space-y-4">
        <h2 className="font-bold">Select Menu - 3</h2>
        <SelectMenu3 />
      </div>

      <div className="w-full py-4 space-y-4">
        <h2 className="font-bold">Select Menu - 2</h2>
        <SelectMenu2 />
      </div>

      <div className="w-full py-4 space-y-4">
        <h2 className="font-bold">tag Item</h2>
        <div className="flex flex-wrap gap-1">
          <TagItem>전체</TagItem>
          <TagItem variant="success">맛집</TagItem>
          <TagItem variant="fail">숙박</TagItem>
          <TagItem variant="warn">축제</TagItem>
          <TagItem variant="info">관광지</TagItem>
          <TagItem variant="outline">관광지</TagItem>
          <TagItem variant="fill">관광지</TagItem>
          <TagItem variant="outline" closeIcon>
            관광지{" "}
          </TagItem>
          <TagItem variant="outline" closeIcon>
            기이이이이인 관광지{" "}
          </TagItem>
        </div>
      </div>

      <div className="w-full py-4 space-y-4">
        <h2 className="font-bold">Select Item</h2>
        <DropdownItem label="오래된순" />
      </div>
    </div>
  );
}

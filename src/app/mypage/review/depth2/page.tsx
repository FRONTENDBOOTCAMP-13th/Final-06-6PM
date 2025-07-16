import DropdownItem from "@/components/ui/dropdownItem";
import Input from "@/components/ui/input";
import SelectMenu3 from "@/components/ui/selectMenu3";
import ViewItem from "@/components/ui/viewItem";

// 마이페이지/리뷰
export default function MypageReviewPage() {
  return (
    <>
      <h2>마이페이지/리뷰</h2>

      <div className="flex items-center gap-2 m-4">
        <DropdownItem label="제주도 여행" />
      </div>
      <div className=" m-2 bg-white text-center">
        <div>
          <SelectMenu3 />
        </div>
        <div className="m-4 grid grid-cols-1 gap-2 shadow-xl rounded-2xl">
          <ViewItem
            userName={"닉네임"}
            userImgURL={"/gwak.png"}
            location={"제주도"}
            content={
              "내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다 내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다 "
            }
            tags={["맛집", "#좋아요", "몰라"]}
            views={200}
            likes={100}
            comments={100}
            date={"2025-07-15"}
          />
        </div>
        <div className="m-4 grid grid-cols-1 gap-2 shadow-xl rounded-2xl">
          <ViewItem
            userName={"닉네임"}
            userImgURL={"/gwak.png"}
            location={"제주도"}
            content={
              "내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다 내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다 "
            }
            tags={["맛집", "#좋아요", "몰라"]}
            views={200}
            likes={100}
            comments={100}
            date={"2025-07-15"}
          />
        </div>
        <div className="m-4 grid grid-cols-1 gap-2 shadow-xl rounded-2xl">
          <ViewItem
            userName={"닉네임"}
            userImgURL={"/gwak.png"}
            location={"제주도"}
            content={
              "내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다 내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다 "
            }
            tags={["맛집", "#좋아요", "몰라"]}
            views={200}
            likes={100}
            comments={100}
            date={"2025-07-15"}
          />
        </div>
      </div>
    </>
  );
}

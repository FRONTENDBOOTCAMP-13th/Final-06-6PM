import BookAndReview from "@/components/form/mypage/bookAndReview";
import ProfileItem from "@/components/mypage/profileItem";
import SelectMypage from "@/components/mypage/selectMypage";

export default function MypagePage() {
  return (
    <div className="space-y-6">
      <ProfileItem />
      <BookAndReview />
      <div className="w-full overflow-hidden bg-white shadow-xl rounded-2xl ">
        <SelectMypage />
      </div>
    </div>
  );
}

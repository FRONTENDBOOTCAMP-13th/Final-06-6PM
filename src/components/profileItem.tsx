import { Settings } from "lucide-react";
import React from "react";

const ProfileCard = ({
  profileImage = "/gwak.png",
  username = "여행덕후",
  description = "새로운 곳을 발견하는 것을 좋아하는 자유로운 여행자 입니다. \n 어디로든 떠나요~",
  postsCount = 100,
  likesCount = 100,
  totalLikes = 100,
}) => {
  return (
    <div className="relative bg-white rounded-2xl p-6 shadow-2xl max-w-md mx-auto text-center font-sans">
      <div className="absolute top-4 right-4 text-16 cursor-pointer text-cancel">
        <Settings></Settings>
      </div>
      <div className="mb-4 mt-4">
        <div className="top-28 w-28 h-28 mx-auto mb-4">
          {profileImage ? (
            <img
              src={profileImage}
              alt="프로필"
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <div className="w-full h-full rounded-full"></div>
          )}
        </div>
      </div>

      <h2 className="text-20 font-semibold mb-3 text-primary">{username}</h2>
      <p
        style={{ whiteSpace: "pre-wrap" }}
        className="text-14 text-cancel mb-6"
      >
        {description}
      </p>

      <div className="flex justify-around items-center">
        <div className="text-center">
          <div className="text-20 font-semibold mb-1 text-success">
            {postsCount}
          </div>
          <div className="text-20 text-cancel">작성한 글</div>
        </div>
        <div className="text-center">
          <div className="text-20 font-semibold mb-1 text-info">
            {likesCount}
          </div>
          <div className="text-20 text-cancel">받은 좋아요</div>
        </div>
        <div className="text-center">
          <div className="text-20 text-warn font-semibold mb-1">
            {totalLikes}
          </div>
          <div className="text-20 text-cancel">총 조회수</div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;

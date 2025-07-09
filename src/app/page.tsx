import {
  CalendarDays,
  MessageCircleMore,
  Search,
  UserRoundIcon,
} from "lucide-react";

export default function Home() {
  return (
    <>
      <h1>Final-6-6pm</h1>
      <h2>팀원 : 박선영, 남주성, 차형주, 송아현, 문서인</h2>
      파이팅..! ~ 힘내자..!
      <div className="p-4 bg-primary">
        <h3 className="text-white">test</h3>
      </div>
      <div>
        <h4>아이콘예시</h4>
        <div className="flex items-center gap-4">
          <Search className="w-4 h-4"></Search>
          <UserRoundIcon className="w-4 h-4"></UserRoundIcon>
          <MessageCircleMore className="w-4 h-4"></MessageCircleMore>
          <CalendarDays className="w-4 h-4"></CalendarDays>
        </div>
      </div>
    </>
  );
}

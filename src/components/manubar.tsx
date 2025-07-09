import {
  Home,
  LayoutList,
  SquarePen,
  Newspaper,
  UserRound,
} from "lucide-react";

export default function Menubar() {
  return (
    <nav className="w-full max-w-[428px] h-[95px] bg-[#5FA185] flex justify-between items-center px-6 rounded-none mx-auto mt-10 shadow">
      <NavItem icon={<Home size={36} color="#FFFFFF" />} label="홈" />
      <NavItem
        icon={<LayoutList size={36} color="#FFFFFF" />}
        label="살펴보기"
      />
      <NavItem
        icon={<SquarePen size={36} color="#FFFFFF" />}
        label="기록하기"
      />
      <NavItem
        icon={<Newspaper size={36} color="#FFFFFF" />}
        label="커뮤니티"
      />
      <NavItem
        icon={<UserRound size={36} color="#FFFFFF" />}
        label="마이페이지"
      />
    </nav>
  );
}

function NavItem({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      {icon}
      <span className="text-white text-sm">{label}</span>
    </div>
  );
}

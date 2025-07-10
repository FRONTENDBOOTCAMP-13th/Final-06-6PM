import {
  Home,
  LayoutList,
  SquarePen,
  Newspaper,
  UserRound,
  LucideIcon,
} from "lucide-react";

// NavItem에 타입 명시!
interface NavItemProps {
  icon: LucideIcon; // 아이콘 컴포넌트
  label: string;
}

export default function Menubar() {
  return (
    <nav
      className="w-full max-w-[428px] h-[95px] flex justify-between items-center px-6 rounded-none mx-auto mt-10 shadow"
      style={{
        backgroundColor: "var(--color-secondary)",
      }}
    >
      <NavItem icon={Home} label="홈" />
      <NavItem icon={LayoutList} label="살펴보기" />
      <NavItem icon={SquarePen} label="기록하기" />
      <NavItem icon={Newspaper} label="커뮤니티" />
      <NavItem icon={UserRound} label="마이페이지" />
    </nav>
  );
}

// NavItem 컴포넌트
function NavItem({ icon: Icon, label }: NavItemProps) {
  return (
    <div className="flex flex-col items-center gap-1">
      <Icon size={36} style={{ color: "var(--color-white)" }} />
      <span
        style={{
          color: "var(--color-white)",
          fontSize: "var(--text-14)",
          fontFamily: "var(--font-sans)",
        }}
      >
        {label}
      </span>
    </div>
  );
}

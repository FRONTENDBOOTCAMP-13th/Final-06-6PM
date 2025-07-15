import Button from "@/components/ui/btn";
import ButtonRounded from "@/components/ui/btnRound";
import Link from "next/link";

export default function ComponentPage() {
  return (
    <div className="flex flex-col gap-8 items-center">
      <div className="w-full">
        <h2 className="mb-2">기본형 버튼</h2>
        <div className="flex gap-2 items-center flex-wrap">
          <Button variant="info" size="sm">
            안내
          </Button>
          <Button variant="warn" size="md">
            주의
          </Button>
          <Button variant="fail" size="lg">
            실패
          </Button>
          <Button variant="success">성공</Button>
          <Button variant="outline">아웃라인</Button>
          <Button variant="fill">필</Button>
          <Button>메인컬러</Button>
        </div>
      </div>
      <div className="w-full">
        <h2 className="mb-2">라운드형 버튼</h2>
        <div className="flex gap-2  items-center flex-wrap">
          <ButtonRounded variant="info" size="sm">
            안내
          </ButtonRounded>
          <ButtonRounded variant="warn" size="md">
            주의
          </ButtonRounded>
          <ButtonRounded variant="fail" size="lg">
            실패
          </ButtonRounded>
          <ButtonRounded variant="success">성공</ButtonRounded>
          <ButtonRounded variant="outline">아웃라인</ButtonRounded>
          <ButtonRounded variant="fill">필</ButtonRounded>
          <ButtonRounded>메인컬러</ButtonRounded>
        </div>
      </div>
      <Link
        href="/components/psy/travel"
        className="p-2 bg-travel-primary100 text-white  w-full"
      >
        여행
      </Link>
    </div>
  );
}

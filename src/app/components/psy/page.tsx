import Button from "@/components/ui/btn";
import ButtonRounded from "@/components/ui/btnRound";
import Link from "next/link";

export default function ComponentPage() {
  return (
    <div className="flex flex-col items-center">
      {/* Btn */}
      <div className="w-full py-4 space-y-4">
        <h2 className="font-bold">Btn</h2>
        <div className="flex flex-wrap items-center gap-2">
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

      {/* BtnRoundend */}
      <div className="w-full py-4 space-y-4">
        <h2 className="font-bold">BtnRoundend</h2>
        <div className="flex flex-wrap items-center gap-2">
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

      {/* 테스트페이지 */}
      <Link
        href="/components/psy/travel"
        className="w-full p-2 text-white bg-travel-primary100"
      >
        여행
      </Link>
    </div>
  );
}

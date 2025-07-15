import Button from "@/components/ui/btn";
// 여행날짜
export default function TravelPage() {
  return (
    <div className="flex flex-col justify-between">
      <div>
        <h2>여행일정만들기</h2>
        <h2 className="text-travel-primary200 text-28 font-extrabold">여행 기간이 어떻게 되시나요?</h2>
        <p className="text-travel-gray700">여행기간은 최대 5일까지 선택 가능합니다.</p>
        <div className="w-full h-75 bg-gray-100 rounded-xl flex items-center justify-center mt-4">
          달력 들어갈 자리
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full bg-white max-h-21">
        <div className="p-4 shadow-[0_-8px_16px_-4px_rgba(0,0,0,0.1)]">
          <Button className="w-full text-16">05.08. ~ 05.12. 일정 선택 완료</Button> 
        </div>
      </div>
    </div>
  );
}

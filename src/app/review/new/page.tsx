"use client";
import DayItem from "@/components/ui/dayItem";
import DropdownItem from "@/components/ui/dropdownItem";
import { useState } from "react";

const dummyList = [
  {
    title: "최신순",
  },
  {
    title: "오래된순",
  },
];

// 여행기록_일정선택하기
export default function ReviewPlanPage() {
  const [selectOpen, setSelectOpen] = useState(false);
  const [selectData, setSelectData] = useState(dummyList[0].title);

  const listData = (
    <>
      {dummyList.map((item, idx) => (
        <li
          key={idx}
          onClick={() => {
            setSelectData(item.title);
            setSelectOpen((prev) => !prev);
          }}
          className="hover:bg-travel-primary200 hover:text-white py-1 px-3 text-[13px]"
        >
          {item.title}
        </li>
      ))}
    </>
  );
  return (
    <>
      <div className="flex flex-row-reverse my-3 relative">
        <DropdownItem
          label={selectData}
          openModal={() => setSelectOpen((prev) => !prev)}
        />

        {selectOpen && (
          <ul className="flex flex-col bg-white absolute top-[28px] right-0 w-24 border border-travel-gray400 rounded">
            {listData}
          </ul>
        )}
      </div>
      <div className="space-y-4">
        <DayItem name="부산" period="2025.07.12 ~ 2025.07.15." />
        <DayItem name="부산" period="2025.07.12 ~ 2025.07.15." />
        <DayItem name="제주도" period="2025.07.12 ~ 2025.07.15." dday="D-2" />
        <DayItem empty />
      </div>
    </>
  );
}

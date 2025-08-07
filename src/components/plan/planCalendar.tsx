"use client";

import { ko } from "date-fns/locale/ko";
import { useState, useEffect } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import usePlanStore from "@/zustand/planStore";

interface DateSelection {
  startDate: Date;
  endDate: Date;
  key: string;
}

interface DateRanges {
  [key: string]: DateSelection;
}

export default function PlanCalendar() {
  const { startDate, endDate, setStartDate, setEndDate } = usePlanStore();

  // 초기값
  const [dates, setDates] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const [isClient, setIsClient] = useState(false);

  // 파싱함수 추가
  const parseDate = (dateString: string): Date => {
    return new Date(dateString.replace(/\./g, "-"));
  };

  useEffect(() => {
    setIsClient(true);

    // parseDate 사용
    if (startDate && endDate) {
      setDates({
        startDate: parseDate(startDate),
        endDate: parseDate(endDate),
        key: "selection",
      });
    }
  }, [startDate, endDate]);

  // 날짜 변경될 때 호출되는 함수
  const updateDates = (ranges: DateRanges) => {
    if (!isClient) return;

    const selection = ranges["selection"];
    const updatedDates = {
      startDate: selection.startDate,
      endDate: selection.endDate,
      key: selection.key,
    };

    setDates(updatedDates);

    // 날짜 포맷팅
    const format = (date: Date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}.${month}.${day}`;
    };

    const formattedStart = format(updatedDates.startDate);
    const formattedEnd = format(updatedDates.endDate);

    // Zustand에 저장
    setStartDate(formattedStart);
    setEndDate(formattedEnd);
  };

  return (
    <div className="scale-120 origin-top">
      <DateRange locale={ko} onChange={updateDates} ranges={[dates]} showDateDisplay={false} />
    </div>
  );
}

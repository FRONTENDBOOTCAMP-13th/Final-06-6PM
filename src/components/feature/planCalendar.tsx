"use client";

import { ko } from 'date-fns/locale/ko'
import { useState } from 'react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

interface DateSelection {
  startDate: Date;
  endDate: Date;
  key: string;
}

interface DateRanges {
  [key: string]: DateSelection;
}

export default function PlanCalendar() {
  // localStorage에서 저장된 날짜를 불러오는 함수
  const loadDates = () => {
    if (typeof window !== 'undefined') {
      const start = localStorage.getItem('startDate');
      const end = localStorage.getItem('endDate');

      // 저장된 날짜가 둘 다 존재하는 경우
      if (start && end) {
        return {
          startDate: new Date(start),
          endDate: new Date(end),
          key: 'selection'
        };
      }
    }

   // 저장된 날짜가 없으면 오늘 날짜를 시작/종료로 설정해서 기본값으로 사용
    return {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    };
  };

  const [dates, setDates] = useState(loadDates);

  const updateDates = (ranges: DateRanges) => {
    
    // 사용자 입력에 따라 선택된 날짜 범위를 가져옴
    const selection = ranges['selection'];
    const updatedDates = {
      startDate: selection.startDate,
      endDate: selection.endDate,
      key: selection.key,
    };
    
    setDates(updatedDates);

    // 2025.07.21 형태로 포맷팅
    const format = (date: Date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}.${month}.${day}`;
    };
    
    // 로컬 스트리지에 저장
    localStorage.setItem('startDate', format(updatedDates.startDate));
    localStorage.setItem('endDate', format(updatedDates.endDate));
  };

  return (
    <div className='scale-120 origin-top'>
      <DateRange
        locale={ko}
        onChange={updateDates}
        ranges={[dates]}
        showDateDisplay={false}
      />

      {/* 레이아웃 페이지에 연결할 것들 */}
      <div>Start Date : {dates.startDate.toLocaleDateString('ko-KR')}</div>
      <div>End Date : {dates.endDate.toLocaleDateString('ko-KR')}</div>
    </div>
  );
}
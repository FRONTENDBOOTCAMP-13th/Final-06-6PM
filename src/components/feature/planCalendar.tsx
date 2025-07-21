"use client";

import { ko } from 'date-fns/locale/ko'
import { useState, useEffect } from 'react';
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
  // 초기값을 서버 렌더링과 동일하게 설정
  const [dates, setDates] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
  });
  
  // hydration 문제 해결용...
  const [Client, setClient] = useState(false);

  // 클라이언트에서만 sessionStorage 읽기
  useEffect(() => {
    setClient(true);
    const start = sessionStorage.getItem('startDate');
    const end = sessionStorage.getItem('endDate');

    // 저장된 날짜가 있으면 상태 업데이트
    if (start && end) {
      setDates({
        startDate: new Date(start),
        endDate: new Date(end),
        key: 'selection'
      });
    }
  }, []);

  // 날짜 변경될 때 호출되는 함수
  const updateDates = (ranges: DateRanges) => {
    const selection = ranges['selection'];
    const updatedDates = {
      startDate: selection.startDate,
      endDate: selection.endDate,
      key: selection.key,
    };
    
    setDates(updatedDates);

    // sessionStorage에 저장
    if (Client) {
      const format = (date: Date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}.${month}.${day}`;
      };
      
      sessionStorage.setItem('startDate', format(updatedDates.startDate));
      sessionStorage.setItem('endDate', format(updatedDates.endDate));
    }
  };

  return (
    <div className='scale-120 origin-top'>
      <DateRange
        locale={ko}
        onChange={updateDates}
        ranges={[dates]}
        showDateDisplay={false}
      />
    </div>
  );
}
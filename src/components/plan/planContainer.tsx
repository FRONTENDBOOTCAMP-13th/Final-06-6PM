'use client'

import { useState } from 'react';
import ScheduleStep from './stepSchedule';
import SearchStep from './stepSearch';
import PreviewStep from './stepPreview';

type Step = 'schedule' | 'search' | 'preview';

export interface TravelData {
  dates: { start: Date | null; end: Date | null };
  destinations: string[];
  preferences: any;
}

export default function PlanContainer() {
  
  const [currentStep, setCurrentStep] = useState<Step>('schedule');
  
  // 여행 데이터 저장
  const [travelData, setTravelData] = useState<TravelData>({
    dates: { start: null, end: null },
    destinations: [],
    preferences: {}
  });

  // 다음 스텝으로 이동
  const goToNext = (stepData: any) => {
    setTravelData(prev => ({ ...prev, ...stepData }));
    
    if (currentStep === 'schedule') setCurrentStep('search');
    else if (currentStep === 'search') setCurrentStep('preview');
  };

  // 이전 스텝으로 이동
  const goToPrev = () => {
    if (currentStep === 'search') setCurrentStep('schedule');
    else if (currentStep === 'preview') setCurrentStep('search');
  };

  return (
    <div className="container">
      {currentStep === 'schedule' && (
        <ScheduleStep onNext={goToNext} data={travelData} />
      )}
      {currentStep === 'search' && (
        <SearchStep onNext={goToNext} onPrev={goToPrev} data={travelData} />
      )}
      {currentStep === 'preview' && (
        <PreviewStep onPrev={goToPrev} data={travelData} />
      )}
    </div>
  );
}
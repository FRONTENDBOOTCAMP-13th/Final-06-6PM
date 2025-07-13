"use client";

import useTravelInstance from "@/hook/useTravelInstance";
import { AreaProps, AreaTravelProps } from "@/types/travelApi";
import Image from "next/image";
import { useEffect, useState } from "react";

/**
 * Request Parameter
 * serviceKey 인증키
 * numOfRows  한페이지결과수
 * pageNo     페이지번호
 * MobileOS   OS구분
 * MobileApp  서비스명
 * _type      응담베시지 형식
 */

export default function TravelPage() {
  const api_key = process.env.NEXT_PUBLIC_TOUR_API_KEY;
  const travelInstance = useTravelInstance();

  const [areaList, setAreaList] = useState<AreaProps[]>([]);
  const [selectedAreaCode, setSelectedAreaCode] = useState<number>(1);
  const [travelDataArray, setTravelDataArray] = useState<AreaTravelProps[]>([]);

  // 1-지역코드조회
  const fetchAreaList = async () => {
    const url = `/areaCode2?serviceKey=${api_key}&numOfRows=5&pageNo=1&MobileOS=ETC&MobileApp=AppTest&_type=json`; // areaCode  지역코드

    try {
      const res = await travelInstance.get(url);
      const items = res.data.response.body.items?.item;
      const areaArray = Array.isArray(items) ? items : [items];
      setAreaList(areaArray);

      if (areaArray.length > 0) {
        setSelectedAreaCode(areaArray[0].code);
      }
    } catch (error) {
      console.error("지역 코드 조회 API 실패:", error);
    }
  };

  // 3-지역기반 관광정보조회
  /* contenttypeid = 관광타입(12:관광지, 14:문화시설, 15:축제공연행사, 25:여행코스, 28:레포츠, 32:숙박, 38:쇼핑, 39:음식점)
   */
  const fetchTravelList = async (areaCode: number) => {
    const dataURL = `/areaBasedList2?serviceKey=${api_key}&areaCode=${areaCode}&numOfRows=6&pageNo=5&MobileOS=ETC&MobileApp=AppTest&contentTypeId=12&_type=json`;

    try {
      const res = await travelInstance.get(dataURL);
      const items = res.data.response.body.items?.item;
      const travelItemArray = Array.isArray(items) ? items : [items];
      setTravelDataArray(travelItemArray);

      console.log("areaProps", travelItemArray);
    } catch (error) {
      console.error("관광정보조회 API 실패:", error);
    }
  };

  useEffect(() => {
    fetchAreaList();
  }, []);

  useEffect(() => {
    fetchTravelList(selectedAreaCode);
  }, [selectedAreaCode]);

  return (
    <div className="p-10 space-y-4">
      <h2 className="text-20 font-bold">공공데이터 연습</h2>
      <div className="flex gap-4">
        {areaList.map((area) => (
          <button
            key={area.code}
            onClick={() => setSelectedAreaCode(area.code)}
            className={`px-4 py-1 rounded-3xl text-14 transition-colors duration-300 ${
              selectedAreaCode === area.code
                ? "bg-travel-info100 hover:bg-travel-info200 text-white"
                : "bg-travel-gray200 hover:bg-travel-gray300"
            }`}
          >
            {area.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-4">
        {travelDataArray.map((data, idx) => (
          <div
            key={idx}
            className="py-4 px-6 border border-gray-300 rounded-2xl flex flex-col items-center gap-4"
          >
            {data.firstimage && (
              <Image
                src={data.firstimage}
                alt={data.title}
                width={400}
                height={300}
                className="object-cover rounded-2xl"
              />
            )}

            <h3 className="font-bold text-14">{data.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

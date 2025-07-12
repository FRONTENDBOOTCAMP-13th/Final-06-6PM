"use client";

import useTravelInstance from "@/hook/useTravelInstance";
import Image from "next/image";
import { useEffect, useState } from "react";

interface DataProps {
  title: string;
  firstimage: string;
}

export default function TravelPage() {
  const travelInstance = useTravelInstance();
  const [dataArray, setDataArray] = useState<DataProps[]>([]);

  const fetchTravelList = async () => {
    console.log("서버 요청 ㅎㅎ");
    const api_key = process.env.NEXT_PUBLIC_TOUR_API_KEY;
    const dataURL = `https://apis.data.go.kr/B551011/KorService2/areaBasedList2?serviceKey=${api_key}&MobileApp=AppTest&MobileOS=ETC&arrange=C&contentTypeId=12&areaCode=6&sigunguCode=10&cat1=A01&cat2=A0101&cat3=A01010500&modifiedtime=&_type=json&numOfRows=10&pageNo=1&lDongRegnCd=26&lDongSignguCd=380&lclsSystm1=NA&lclsSystm2=NA04&lclsSystm3=NA040500`;

    try {
      const res = await travelInstance.get(dataURL);
      const items = res.data.response.body.items?.item;
      const travelItemArray = Array.isArray(items) ? items : [items];

      setDataArray(travelItemArray);
      console.log("traveArray", travelItemArray);
    } catch (error) {
      console.error("API 요청 실패:", error);
    }
  };

  useEffect(() => {
    fetchTravelList();
  }, []);

  return (
    <div>
      {dataArray.map((data, index) => (
        <div key={index}>
          <h3>{data.title}</h3>
          <Image
            src={data.firstimage}
            alt="여행지 이미지"
            width={400}
            height={300}
          />
        </div>
      ))}
    </div>
  );
}

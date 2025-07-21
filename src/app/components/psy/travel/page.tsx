"use client";
import { useEffect, useState } from "react";
import { AreaProps, AreaTravelProps } from "@/types/travel";
import { fetchAreaList, fetchTravelList } from "@/data/actions/travel";
import Image from "next/image";

export default function TravelPage() {
  const [areaList, setAreaList] = useState<AreaProps[]>([]);
  const [selectAreaCode, setSelectAreaCode] = useState<number>(1);
  const [travelData, setTravelData] = useState<AreaTravelProps[]>([]);

  useEffect(() => {
    const areaListData = async () => {
      const res = await fetchAreaList();
      if (res?.header.resultMsg === "OK") {
        setAreaList(res.body.items.item);
      }
    };
    areaListData();
  }, []);
  // console.log("area", areaList);

  useEffect(() => {
    const travelListData = async () => {
      const res = await fetchTravelList(selectAreaCode);
      if (res?.header.resultMsg === "OK") {
        setTravelData(res.body.items.item);
      }
    };
    travelListData();
  }, [selectAreaCode]);
  // console.log("areacode", selectAreaCode);
  // console.log("travelData", travelData);

  return (
    <div className="space-y-4">
      <h2 className="text-20 font-bold">공공데이터 연습</h2>
      <div className="flex gap-4 flex-wrap">
        {areaList.map((area) => (
          <button
            key={area.code}
            onClick={() => setSelectAreaCode(area.code)}
            className={`px-4 py-1 rounded-3xl text-14 transition-colors duration-300 ${
              selectAreaCode === area.code
                ? "bg-travel-info100 hover:bg-travel-info200 text-white"
                : "bg-travel-gray200 hover:bg-travel-gray300"
            }`}
          >
            {area.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {travelData.map((data, idx) => (
          <div
            key={idx}
            className="p-4 border border-gray-300 rounded-2xl flex flex-col items-center gap-4 bg-white"
          >
            {data.firstimage ? (
              <Image
                src={data.firstimage}
                alt={data.title}
                width={400}
                height={300}
                className="aspect-[4/3] object-cover rounded-2xl"
              />
            ) : (
              <div className="w-full aspect-[4/3] rounded-2xl bg-travel-gray200"></div>
            )}

            <h3 className="font-bold text-14">{data.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

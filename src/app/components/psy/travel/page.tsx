"use client";
import { useEffect, useState } from "react";
import { AreaProps, AreaTravelProps, fetchKtoProps } from "@/types/travel";
import { fetchAreaList, fetchTravelList } from "@/data/actions/travel";

export default function TravelPage() {
  const [areaList, setAreaList] = useState<AreaProps[]>([]);
  const [selectedAreaCode, setSelectedAreaCode] = useState<number>(1);
  const [travelData, setTravelData] = useState<AreaTravelProps[]>([]);

  useEffect(() => {
    // fetchAreaList();
    // console.log(fetchAreaList());

    const fetchAreaListData = async () => {
      const res: fetchKtoProps = await fetchAreaList();

      if (res?.header.resultMsg === "OK") {
        setAreaList(res.body.items.item);
      }
    };

    fetchAreaListData();
  }, []);

  console.log("area", areaList);

  useEffect(() => {
    fetchTravelList(selectedAreaCode);
  }, [selectedAreaCode]);

  return (
    <div className="space-y-4">
      <h2 className="text-20 font-bold">공공데이터 연습</h2>
      <div className="flex gap-4 flex-wrap">
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

      {/* <div className="grid grid-cols-2 gap-4">
        {travelDataArray.map((data, idx) => (
          <div
            key={idx}
            className="p-4 border border-gray-300 rounded-2xl flex flex-col items-center gap-4"
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
      </div> */}
    </div>
  );
}

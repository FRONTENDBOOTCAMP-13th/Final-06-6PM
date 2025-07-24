"use client";
import { useEffect, useState } from "react";
import {
  AreaProps,
  AreaTravelProps,
  ContentDataProps,
  KeywordTravelProps,
} from "@/types/travel";
import Image from "next/image";

import SearchInput from "@/components/form/searchInput";
import {
  getAreaList,
  getContentData,
  getKeywordData,
  getTravelList,
} from "@/data/functions/travel";
import BackButton from "@/components/feature/backButton";
import { Bookmark, CalendarDays, Star } from "lucide-react";
import NextButton from "@/components/feature/nextButton";
import RemoveTag from "@/components/ui/removeTag";
import { destinationList, Destination } from "@/lib/data/destinationList";

const tourData = [
  { id: 1, name: "가나디" },
  { id: 2, name: "성산일출봉" },
  { id: 3, name: "한라산" }
];

export default function SearchPage() {
  const [areaList, setAreaList] = useState<AreaProps[]>([]);
  const [selectAreaCode, setSelectAreaCode] = useState<number>(1);
  const [travelData, setTravelData] = useState<AreaTravelProps[]>([]);

  const [keyword, setKeyword] = useState("");
  const [searchList, setSearchList] = useState<KeywordTravelProps[]>([]);
  const [selectContentID, setSelectContentID] = useState<string | number>("");
  const [contentData, setContentData] = useState<ContentDataProps>();

  // 지역코드조회
  useEffect(() => {
    const areaListData = async () => {
      const res = await getAreaList();
      if (res?.header.resultMsg === "OK") {
        const data = res.body.items.item;
        setAreaList(data);
      }
    };
    areaListData();
  }, []);

  // 지역코드기반 관광지조회
  useEffect(() => {
    const travelListData = async () => {
      const res = await getTravelList(selectAreaCode);
      if (res?.header.resultMsg === "OK") {
        const data = res.body.items.item;
        setTravelData(data);
      }
    };
    travelListData();
  }, [selectAreaCode]);

  // 상세정보 키워드
  useEffect(() => {
    if (selectContentID) {
      const ContentListData = async () => {
        const res = await getContentData(selectContentID.toString());
        if (res?.header.resultMsg === "OK") {
          const data = res.body.items.item;
          setContentData(data[0]);
        }
      };
      ContentListData();
    }
  }, [selectContentID]);

  console.log(contentData);

  return (
    <div>
      <div className="w-full relative py-5 px-4">
        <BackButton path="/plan/edit/schedule"/>
        <p className="text-center">여행일정만들기</p>
      </div>
      
      <div className="relative w-full px-4">
        <div>
          <h2 className="text-28 text-travel-primary200 font-semibold">
            울산
          </h2>
          <p className="text-16 text-travel-gray700">
            2025.08.03 ~ 2025.08.05
          </p>
        </div>
      </div>

      <div className="px-4 space-y-4 mb-32">
        <div className="flex flex-col gap-2">
          <SearchInput
            placeholder="관광지를 검색하세요"
            onSearch={async (value) => {
              setKeyword(value);
              const trimKeyword = value.trim();
              if (!trimKeyword) {
                console.warn("검색어가 비어 있습니다.");
                return;
              }

              console.log("검색어 입력 : ", trimKeyword);

              const res = await getKeywordData(trimKeyword);
              if (res?.header.resultMsg === "OK" && res.body?.items?.item) {
                const keywordData = res.body.items.item;
                console.log("검색결과", keywordData);

                const keywordList = Array.isArray(keywordData)
                  ? keywordData
                  : [keywordData];
                setSearchList(keywordList);
              }
            }}
          />

          {searchList.length > 0 && (
            <div className="space-y-3 mt-4">
              <h3 className="font-bold text-16">검색 결과</h3>
              {searchList.map((item) => (
                <div
                  key={item.contentid}
                  className="w-full bg-white rounded-2xl shadow-[0_0_6px_rgba(0,0,0,0.3)] py-4 px-3 grid grid-cols-[auto_1fr_auto] items-center gap-2"
                  onClick={() => {
                    console.log("contentid:", item.contentid);
                    setSelectContentID(item.contentid.toString());
                  }}
                >

                  <div className="w-[70px] h-[70px] rounded-2xl bg-travel-gray200 overflow-hidden aspect-square">
                    {item.firstimage && (
                      <Image
                        width={100}
                        height={100}
                        src={item.firstimage}
                        alt={item.title}
                        className="object-cover w-full h-full"
                        priority
                      />
                    )}
                  </div>

                  <div className="max-w-[240px] text-travel-text100 overflow-hidden">
                    <div className="flex items-center gap-1">
                      <h2 className="font-bold">{item.title}</h2>
                      <span className="bg-travel-info100 text-white px-2 py-1 rounded-xl text-xs">
                        관광지
                      </span>
                    </div>

                    <p className="my-1 truncate text-travel-gray600 text-14 whitespace-nowrap">
                      {item.addr1 || "지역설명"}
                    </p>

                    <div className="flex items-center gap-1">
                      <div className="flex items-center">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            fill="currentColor"
                            stroke="currentColor"
                            className={`size-4 ${
                              i < Math.floor(0)
                                ? "text-travel-warn100"
                                : "text-travel-gray400"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-14 text-travel-text100">
                        <span>0</span>
                        <span>(0)</span>
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    aria-label="아이템 추가"
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log("아이템 추가");
                    }}
                    className="cursor-pointer"
                  >
                    <span className="text-travel-gray700 text-xl">+</span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {searchList.length === 0 && (
          <div className="flex flex-col gap-2">
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
            
            <div className="space-y-3">
              {travelData.map((data, idx) => (
                <div
                  key={idx}
                  className="w-full bg-white rounded-2xl shadow-[0_0_6px_rgba(0,0,0,0.3)] py-4 px-3 grid grid-cols-[auto_1fr_auto] items-center gap-2"
                  onClick={() => setSelectContentID(data.contentid)}
                >

                  <div className="w-[70px] h-[70px] rounded-2xl bg-travel-gray200 overflow-hidden aspect-square">
                    {data.firstimage && (
                      <Image
                        width={100}
                        height={100}
                        src={data.firstimage}
                        alt={data.title}
                        className="object-cover w-full h-full"
                        priority
                      />
                    )}
                  </div>

                  <div className="max-w-[240px] text-travel-text100 overflow-hidden">
                    <div className="flex items-center gap-1">
                      <h2 className="font-bold">{data.title}</h2>
                      <span className="bg-travel-info100 text-white px-2 py-1 rounded-xl text-xs">
                        관광지
                      </span>
                    </div>

                    <p className="my-1 truncate text-travel-gray600 text-14 whitespace-nowrap">
                      {data.addr1 || "지역설명"}
                    </p>

                    <div className="flex items-center gap-1">
                      <div className="flex items-center">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            fill="currentColor"
                            stroke="currentColor"
                            className={`size-4 ${
                              i < Math.floor(0)
                                ? "text-travel-warn100"
                                : "text-travel-gray400"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-14 text-travel-text100">
                        <span>0</span>
                        <span>(0)</span>
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    aria-label="아이템 추가"
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log("아이템 추가");
                    }}
                    className="cursor-pointer"
                  >
                    <span className="text-travel-gray700 text-xl">+</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {contentData && (
          <div className="p-4 border border-gray-300 rounded-2xl bg-white">
            {contentData?.firstimage && (
              <Image
                src={contentData?.firstimage}
                alt={contentData?.title}
                width={400}
                height={300}
                className="aspect-4/3 object-cover rounded-2xl"
              />
            )}
            <h3 className="text-lg font-bold mt-2">{contentData?.title}</h3>
            <p className="text-sm mt-1">{contentData?.addr1}</p>
            <p className="mt-2 text-sm">{contentData?.overview}</p>
          </div>
        )}
      </div>

      <div className="fixed bottom-15 bg-white w-full py-3">
        <div className="flex gap-2 pb-2">
            <RemoveTag tagData={tourData} />
        </div>
      </div>
      <NextButton path="/plan/edit/schedule" />
    </div>
  );
}
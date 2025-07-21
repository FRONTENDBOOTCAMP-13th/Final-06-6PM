"use client";
import { useEffect, useState } from "react";
import {
  AreaProps,
  AreaTravelProps,
  ContentDataProps,
  KeywordTravelProps,
} from "@/types/travel";
import {
  fetchAreaList,
  fetchContentData,
  fetchKeywordData,
  fetchTravelList,
} from "@/data/actions/travel";
import Image from "next/image";
import ButtonRounded from "@/components/ui/btnRound";

export default function TravelPage() {
  const [areaList, setAreaList] = useState<AreaProps[]>([]);
  const [selectAreaCode, setSelectAreaCode] = useState<number>(1);
  const [travelData, setTravelData] = useState<AreaTravelProps[]>([]);

  const [keyword, setKeyword] = useState("");
  const [searchList, setSearchList] = useState<KeywordTravelProps[]>([]);
  const [selectContentID, setSelectContentID] = useState("");
  const [contentData, setContentData] = useState<ContentDataProps>();

  // 지역코드조회
  useEffect(() => {
    const areaListData = async () => {
      const res = await fetchAreaList();
      if (res?.header.resultMsg === "OK") {
        const data = res.body.items.item;
        setAreaList(data);
      }
    };
    areaListData();
  }, []);
  // console.log("area", areaList);

  // 지역코드기반 관광지조회
  useEffect(() => {
    const travelListData = async () => {
      const res = await fetchTravelList(selectAreaCode);
      if (res?.header.resultMsg === "OK") {
        const data = res.body.items.item;
        setTravelData(data);
      }
    };
    travelListData();
  }, [selectAreaCode]);
  // console.log("areacode", selectAreaCode);
  // console.log("travelData", travelData);

  // 검색
  const searchSubmit = async () => {
    const trimKeyword = keyword.trim();
    if (!trimKeyword) {
      console.warn("검색어가 비어 있습니다.");
      return;
    }

    console.log("검색어 입력 : ", trimKeyword);

    const res = await fetchKeywordData(trimKeyword);
    if (res?.header.resultMsg === "OK" && res.body?.items?.item) {
      const keywordData = res.body.items.item;
      console.log("검색결과", keywordData);

      const keywordList = Array.isArray(keywordData)
        ? keywordData
        : [keywordData];
      setSearchList(keywordList);
    }
  };

  // 키워드
  useEffect(() => {
    const ContentListData = async () => {
      const res = await fetchContentData(selectContentID);
      if (res?.header.resultMsg === "OK") {
        const data = res.body.items.item;
        setContentData(data[0]);
      }
    };

    ContentListData();
  }, [selectContentID]);

  console.log(contentData);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2">
        <h2 className="text-20 font-bold">지역버튼기반 관광지 출력</h2>
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
                  className="aspect-4/3 object-cover rounded-2xl"
                  priority
                />
              ) : (
                <div className="w-full aspect-[4/3] rounded-2xl bg-travel-gray200"></div>
              )}
              <h3 className="font-bold text-14">{data.title}</h3>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-20 font-bold">검색기반 관광지정보 출력</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            searchSubmit();
          }}
          className="flex gap-1"
        >
          <label htmlFor="searchLabel" className="sr-only">
            검색어입력
          </label>
          <input
            id="searchLabel"
            type="text"
            value={keyword}
            placeholder="검색어를 입력하세요"
            className="py-1 px-2 bg-white border border-travel-gray300 rounded-2xl flex-1"
            onChange={(e) => setKeyword(e.target.value)}
          />
          <ButtonRounded type="submit" variant="success" size="md">
            검색
          </ButtonRounded>
        </form>
        <ul>
          {searchList.map((item) => (
            <li
              key={item.contentid}
              onClick={() => {
                console.log("contentid:", item.contentid);
                setSelectContentID(item.contentid);
              }}
            >
              {item.title}
            </li>
          ))}
        </ul>
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
    </div>
  );
}

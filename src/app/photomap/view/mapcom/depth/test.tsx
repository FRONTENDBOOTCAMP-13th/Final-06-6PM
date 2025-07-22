// "use client";
// import React, { useState } from "react";
// // JSON 파일 경로에 맞게 수정하세요
// import data from "./coords_with_props.json";

// type Coord = [number, number];

// interface Region {
//   properties: {
//     SIG_CD: string;
//     SIG_ENG_NM: string;
//     SIG_KOR_NM: string;
//     // 필요시 추가 프로퍼티도 선언
//   };
//   coords: Coord[];
// }

// export default function MapVisualize() {
//   const [selectedId, setSelectedId] = useState<string | null>(null);

//   // SVG 크기 및 투영(좌표 정규화)을 위한 기본 설정
//   const width = 800;
//   const height = 600;

//   // 전체 좌표에서 최소/최대 경도, 위도 찾기 (투영을 위한 범위 계산)
//   const allLngs = data.flatMap((region) => region.coords.map(([lng]) => lng));
//   const allLats = data.flatMap((region) => region.coords.map(([, lat]) => lat));

//   const minLng = Math.min(...allLngs);
//   const maxLng = Math.max(...allLngs);
//   const minLat = Math.min(...allLats);
//   const maxLat = Math.max(...allLats);

//   // 위경도 → SVG 좌표계 변환 함수 (min-max 정규화 & Y축 반전)
//   const project = ([lng, lat]: Coord): [number, number] => {
//     const x = ((lng - minLng) / (maxLng - minLng)) * width;
//     const y = height - ((lat - minLat) / (maxLat - minLat)) * height;
//     return [x, y];
//   };

//   // JSON 데이터 한 개당 polygon points 문자열 생성 함수
//   const getPointsStr = (coords: Coord[]) =>
//     coords
//       .map((coord) => {
//         const [x, y] = project(coord);
//         return `${x},${y}`;
//       })
//       .join(" ");

//   return (
//     <svg width={width} height={height} style={{ border: "1px solid #ccc" }}>
//       {data.map((region) => (
//         <polygon
//           key={region.properties.SIG_CD}
//           points={getPointsStr(region.coords)}
//           fill={selectedId === region.properties.SIG_CD ? "#ffa" : "#ccc"}
//           stroke="#333"
//           strokeWidth={0.5}
//           onClick={() => setSelectedId(region.properties.SIG_CD)}
//           style={{ cursor: "pointer" }}
//           title={`${region.properties.SIG_KOR_NM} (${region.properties.SIG_ENG_NM})`}
//         />
//       ))}
//     </svg>
//   );
// }

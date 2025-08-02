"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    naver: any;
  }
}

interface NaverMapProps {
  width?: string;
  height?: string;
  center?: {
    lat: number;
    lng: number;
  };
  zoom?: number;
}

export default function NaverMap({
  width = "100%",
  height = "400px",
  center = { lat: 37.5665, lng: 126.978 }, // 서울시청 기본값
  zoom = 15,
}: NaverMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);

  useEffect(() => {
    const initMap = () => {
      if (mapRef.current && window.naver) {
        const mapOptions = {
          center: new window.naver.maps.LatLng(center.lat, center.lng),
          zoom: zoom,
          mapTypeControl: true,
        };

        mapInstance.current = new window.naver.maps.Map(mapRef.current, mapOptions);

        // 마커 추가 (선택사항)
        new window.naver.maps.Marker({
          position: new window.naver.maps.LatLng(center.lat, center.lng),
          map: mapInstance.current,
        });
      }
    };

    // 네이버 지도 스크립트가 이미 로드되었는지 확인
    if (window.naver && window.naver.maps) {
      initMap();
    } else {
      // 스크립트 동적 로드
      const script = document.createElement("script");
      script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${process.env.NEXT_PUBLIC_NCP_CLIENT_ID}`;
      script.async = true;
      script.onload = initMap;
      script.onerror = () => {
        console.error("네이버 지도 API 로드 실패");
      };
      document.head.appendChild(script);

      // 컴포넌트 언마운트 시 스크립트 제거
      return () => {
        document.head.removeChild(script);
      };
    }
  }, [center.lat, center.lng, zoom]);

  return (
    <div
      ref={mapRef}
      style={{
        width,
        height,
        borderRadius: "8px",
      }}
    />
  );
}

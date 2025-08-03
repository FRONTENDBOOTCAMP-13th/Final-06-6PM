"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    naver: any;
  }
}

// 장소 데이터 타입 정의
interface Place {
  id: number;
  title: string;
  lat: number;
  lng: number;
  tag?: string;
}

interface NaverMapProps {
  width?: string;
  height?: string;
  center?: {
    lat: number;
    lng: number;
  };
  zoom?: number;
  places?: Place[];
}

export default function NaverMap({
  width = "100%",
  height = "400px",
  center = { lat: 37.5665, lng: 126.978 },
  zoom = 20,
  places = [],
}: NaverMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);

  useEffect(() => {
    const initMap = () => {
      if (mapRef.current && window.naver) {
        const mapOptions = {
          center: new window.naver.maps.LatLng(center.lat, center.lng),
          zoom: zoom,
          draggable: true,
          scrollWheel: false,
        };

        mapInstance.current = new window.naver.maps.Map(mapRef.current, mapOptions);

        // 장소 배열이 있으면 각 장소에 마커 추가
        if (places.length > 0) {
          places.forEach((place, index) => {
            // 마커 생성
            const marker = new window.naver.maps.Marker({
              position: new window.naver.maps.LatLng(place.lat, place.lng),
              map: mapInstance.current,
            });

            // 마커 클릭 시 정보창 표시
            const infoWindow = new window.naver.maps.InfoWindow({
              content: `
                <div style="padding: 5px; min-width: 120px; text-align: center;">
                  <p>${index + 1}. ${place.title}</p>
                </div>
              `,
            });

            window.naver.maps.Event.addListener(marker, "click", function () {
              if (infoWindow.getMap()) {
                infoWindow.close();
              } else {
                infoWindow.open(mapInstance.current, marker);
              }
            });
          });

          // 장소가 1개면 해당 위치로 이동, 2개 이상이면 모든 마커가 보이도록 자동 줌
          if (places.length === 1) {
            // 해당 위치로 지도 중심 이동
            mapInstance.current.setCenter(new window.naver.maps.LatLng(places[0].lat, places[0].lng));
          } else if (places.length > 1) {
            // 모든 마커가 보이도록 줌
            const bounds = new window.naver.maps.LatLngBounds();
            places.forEach((place) => {
              bounds.extend(new window.naver.maps.LatLng(place.lat, place.lng));
            });
            mapInstance.current.fitBounds(bounds, {
              padding: 50,
            });
          }
        } else {
          // 기본 마커
          new window.naver.maps.Marker({
            position: new window.naver.maps.LatLng(center.lat, center.lng),
            map: mapInstance.current,
          });
        }
      }
    };

    if (window.naver && window.naver.maps) {
      initMap();
    } else {
      const script = document.createElement("script");
      script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${process.env.NEXT_PUBLIC_NCP_CLIENT_ID}`;
      script.async = true;
      script.onload = initMap;
      script.onerror = () => {
        console.error("네이버 지도 API 로드 실패");
      };
      document.head.appendChild(script);

      return () => {
        try {
          document.head.removeChild(script);
        } catch (e) {
          // 이미 제거된 경우 무시
        }
      };
    }
  }, [center.lat, center.lng, zoom, places.length, JSON.stringify(places)]);

  return (
    <div
      ref={mapRef}
      style={{
        width,
        height,
        borderRadius: "8px",
        position: "relative",
        zIndex: 1,
      }}
    />
  );
}

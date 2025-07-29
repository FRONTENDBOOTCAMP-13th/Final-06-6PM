// 데이터 검증 실패 메세지
export interface ServerValidationError {
  type: string;
  value: string;
  msg: string;
  location: string;
}

// Record<K, T>: K(key)로 이루어진 객체의 각 속성의 타입을 T로 지정하는 유틸리티 타입
// Partial<T>: T의 모든 속성을 옵셔널로 지정하는 유틸리티 타입
// E: 검증에 사용될 속성값을 가지고 있는 타입
// 예) 검증에 사용될 속성값을 가지고 있는 타입이 { title: string, content: string } 이면,
// keyof E의 타입은 "title" | "content"
export type ServerValidationErrors<E> = Partial<Record<keyof E, ServerValidationError>>;

// API 서버의 응답
// E = never: E가 생략되면 errors 속성도 없음
export type ApiRes<T, E = never> = { ok: 1; item: T } | { ok: 0; message: string; errors?: ServerValidationErrors<E> };

// 서버 함수에서 반환할 타입(Promise를 반환해야 함)
export type ApiResPromise<T> = Promise<ApiRes<T>>;

// 지도에 쓸 사진 타입(지역 정보와 이미지 url)
export type UserPhoto = {
  regionId: string;
  imageUrl: string;
};
// api 서버의 응답인데 얼러트 메시지 포함
export type ApiMsgRes<T> = {
  ok: number;
  data?: T;
  message?: string;
};

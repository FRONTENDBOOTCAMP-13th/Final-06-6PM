import TagItem from "@/components/feature/tagItem";
import { Book, Home, Plane, Search, SquarePen, Map, Download, UserRound, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import IntroimgSwiper from "@/components/feature/introimgSwiper";

export default function IntroPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50">
      <section className="relative flex items-center justify-center min-h-screen p-4">
        <div className="relative w-full max-w-6xl mx-auto text-center">
          {/* 모바일 디자인 */}
          <div className="block sm:hidden">
            <div className="flex flex-col gap-6">
              <div className="w-full asepect-[5/1]">
                <Image
                  src="/images/typo-loading.svg"
                  alt="여행도감 로고"
                  width={300}
                  height={100}
                  className="object-contain mx-auto"
                  priority
                />
              </div>
              <p className="p-4 font-semibold leading-relaxed border-l-4 border-yellow-400 shadow-lg text-travel-gray700 text-14 break-keep bg-yellow-100/80 rounded-2xl">
                "여행 계획부터 리뷰까지, 하나로 끝내는 기록 플랫폼"
              </p>

              <div className="grid grid-cols-2 gap-6 font-semibold text-14 xs:grid-cols-1">
                <p className="content-center p-4 text-blue-700 border-l-4 border-blue-400 shadow-lg bg-white/95 backdrop-blur-sm rounded-2xl">
                  기억은 흐려져도, 기록은 선명하니까
                </p>
                <p className="content-center p-4 text-indigo-700 border-l-4 border-indigo-400 shadow-lg bg-white/95 backdrop-blur-sm rounded-2xl">
                  지도에 여행을 새기다
                </p>
              </div>

              <div className="p-6 border border-gray-200 shadow-xl bg-white/95 backdrop-blur-sm rounded-2xl">
                <p className="leading-relaxed text-14 break-keep text-travel-gray70">
                  사용자는 여행 일정을 시/도 단위로 계획하고, 네이버 지도 API를 통해 각 위치를 지도에서 시각적으로
                  확인할 수 있으며, 친구들과 손쉽게 일정을 공유할 수 있습니다. 여행을 다녀온 후에는 전체 여행, 일자별,
                  장소별로 후기를 남길 수 있어 보다 풍부한 기록이 가능하며, 이를 다른 사용자들과 나눌 수 있습니다. 또한
                  대한민국 지도를 기반으로 지역별 사진을 첨부해 나만의 여행 지도를 만들어가는 특별한 경험도 제공합니다.
                </p>
              </div>

              <Link
                href="/home"
                className="flex items-center gap-2 px-8 py-4 mx-auto my-4 font-bold text-center text-white transition-all duration-300 rounded-full shadow-lg w-fit bg-travel-secondary300 hover:bg-travel-primary200 hover:shadow-xl hover:scale-105"
              >
                <Book className="size-5" />
                <span>여행도감 바로가기</span>
              </Link>
            </div>
          </div>

          {/* PC 디자인 */}
          <div className="hidden sm:block">
            <div className="relative p-16 transition-transform duration-500 transform border-l-8 shadow-2xl bg-white/90 backdrop-blur-sm rounded-3xl border-travel-primary-light100 rotate-1 hover:rotate-0">
              <div className="absolute space-y-6 left-4 top-8">
                {Array.from({ length: 8 }, (_, i) => (
                  <div key={i} className="w-3 h-3 bg-blue-100 border border-blue-200 rounded-full" />
                ))}
              </div>
              <div className="absolute transform top-6 right-6 rotate-12">
                <div className="px-3 py-2 border-2 border-blue-300 rounded-lg bg-blue-50">
                  <div className="text-xs text-travel-secondary300">PROJECT</div>
                  <div className="text-xs text-travel-secondary300">6PM</div>
                </div>
              </div>
              <div className="relative z-10">
                <div className="w-full asepect-[5/1]">
                  <Image
                    src="/images/typo-loading.svg"
                    alt="여행도감 로고"
                    width={400}
                    height={100}
                    className="object-contain mx-auto"
                    priority
                  />
                </div>
                <div className="flex flex-col items-center gap-6 my-8">
                  <p className="p-6 font-semibold transform border-l-4 border-yellow-400 shadow-lg text-travel-gray-700 sm:text-18 lg:text-20 bg-yellow-100/80 rounded-r-2xl -rotate-1">
                    "여행 계획부터 리뷰까지, 하나로 끝내는 기록 플랫폼"
                  </p>
                  <div className="flex gap-4 font-semibold">
                    <p className="px-6 py-3 text-blue-700 border-l-4 border-blue-400 rounded-full shadow-md bg-white/95">
                      기억은 흐려져도, 기록은 선명하니까
                    </p>
                    <p className="px-6 py-3 text-indigo-700 border-l-4 border-indigo-400 rounded-full shadow-md bg-white/95">
                      지도에 여행을 새기다
                    </p>
                  </div>
                </div>
                <p className="break-keep mx-auto max-w-[800px] p-6 leading-relaxed border border-gray-200 shadow-lg text-travel-gray700 bg-white/95 rounded-3xl backdrop-blur-sm">
                  사용자는 여행 일정을 시/도 단위로 계획하고, 네이버 지도 API를 통해 각 위치를 지도에서 시각적으로
                  확인할 수 있으며, 친구들과 손쉽게 일정을 공유할 수 있습니다. 여행을 다녀온 후에는 전체 여행, 일자별,
                  장소별로 후기를 남길 수 있어 보다 풍부한 기록이 가능하며, 이를 다른 사용자들과 나눌 수 있습니다. 또한
                  대한민국 지도를 기반으로 지역별 사진을 첨부해 나만의 여행 지도를 만들어가는 특별한 경험도 제공합니다.
                </p>

                <Link
                  href="/home"
                  className="flex items-center gap-2 px-8 py-4 mx-auto mt-8 font-bold text-center text-white transition-all duration-300 rounded-full shadow-lg text-18 w-fit bg-travel-secondary300 hover:bg-travel-primary200 hover:shadow-xl hover:scale-105"
                >
                  <Book className="size-6" />
                  <span>여행도감 바로가기</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative px-4 py-10 md:py-24 sm:px-8">
        <div className="max-w-[1600px] mx-auto">
          <h2 className="relative mb-10 font-semibold text-center text-28 text-travel-text100 sm:text-3xl">
            프로젝트 주요 기능
          </h2>

          <div className="grid items-center gap-6 lg:grid-cols-5 xl:gap-10">
            <IntroimgSwiper />

            <div className="grid grid-cols-2 max-[500px]:grid-cols-1 order-2 mb-4 gap-x-4 lg:col-span-3 lg:grid-cols-2 sm:gap-8">
              <div className="my-2 px-4 py-8 max-[500px]:py-4 transition-all duration-300 border-l-4 shadow-lg bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl sm:shadow-2xl sm:border-l-8 border-travel-primary-light100 sm:transform sm:rotate-2 sm:hover:rotate-0">
                <div className="flex items-center gap-2 mb-3 sm:gap-4 sm:mb-6">
                  <div className="p-2 bg-blue-100 rounded-full sm:p-3">
                    <Home className="w-5 h-5 sm:w-8 sm:h-8 text-travel-primary-light100" />
                  </div>
                  <h3 className="font-bold text-gray-800 text-18 sm:text-20 xl:text-24">홈 화면</h3>
                </div>
                <p className="leading-relaxed text-14 break-keep md:text-16 text-travel-gray700">
                  오늘 날짜/날씨 표시, 예정/완료 일정 관리, 랜덤 여행지 추천 기능으로 여행 계획을 한눈에 확인할 수
                  있습니다.
                </p>
              </div>

              <div className="my-2 px-4 py-8 max-[500px]:py-4 transition-all duration-300 border-l-4 border-green-400 shadow-lg bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl sm:shadow-2xl sm:border-l-8 sm:transform sm:-rotate-2 sm:hover:rotate-0">
                <div className="flex items-center gap-2 mb-3 sm:gap-4 sm:mb-6">
                  <div className="p-2 bg-green-100 rounded-full sm:p-3">
                    <Plane className="w-5 h-5 text-green-600 sm:w-8 sm:h-8" />
                  </div>
                  <h3 className="font-bold text-gray-800 text-18 sm:text-20 xl:text-24">여행 일정 계획</h3>
                </div>
                <p className="leading-relaxed text-14 break-keep md:text-16 text-travel-gray700">
                  가고 싶은 지역과 여행 기간을 정한 뒤, 날짜별로 방문지를 검색해 추가하고, 지도를 통해 효율적인 일정을
                  계획할 수 있습니다.
                </p>
              </div>

              <div className="my-2 px-4 py-8 max-[500px]:py-4 transition-all duration-300 border-l-4 border-purple-400 shadow-lg bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl sm:shadow-2xl sm:border-l-8 sm:transform sm:-rotate-2 sm:hover:rotate-0">
                <div className="flex items-center gap-2 mb-3 sm:gap-4 sm:mb-6">
                  <div className="p-2 bg-purple-100 rounded-full sm:p-3">
                    <Search className="w-5 h-5 text-purple-600 sm:w-8 sm:h-8" />
                  </div>
                  <h3 className="font-bold text-gray-800 text-18 sm:text-20 xl:text-24">여행지 리뷰</h3>
                </div>
                <p className="leading-relaxed text-14 break-keep md:text-16 text-travel-gray700">
                  검색, 북마크, 댓글 기능으로 자신의 리뷰 뿐만 아니라 다른 사용자가 작성한 다양한 여행 리뷰를 탐색하고
                  소통할 수 있습니다.
                </p>
              </div>

              <div className="my-2 px-4 py-8 max-[500px]:py-4 transition-all duration-300 border-l-4 border-orange-400 shadow-lg bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl sm:shadow-2xl sm:border-l-8 sm:transform sm:rotate-2 sm:hover:rotate-0">
                <div className="flex items-center gap-2 mb-3 sm:gap-4 sm:mb-6">
                  <div className="p-2 bg-orange-100 rounded-full sm:p-3">
                    <SquarePen className="w-5 h-5 text-orange-600 sm:w-8 sm:h-8" />
                  </div>
                  <h3 className="font-bold text-gray-800 text-18 sm:text-20 xl:text-24">기록하기</h3>
                </div>
                <p className="leading-relaxed text-14 break-keep md:text-16 text-travel-gray700">
                  여행 일정을 기반으로 완료된 여행에 대해 장소 정보, 제목, 내용, 사진, 태그, 별점을 추가하여 생생한
                  기록을 작성할 수 있습니다.
                </p>
              </div>

              <div className="my-2 px-4 py-8 max-[500px]:py-4 transition-all duration-300 border-l-4 border-pink-400 shadow-lg bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl sm:shadow-2xl sm:border-l-8 sm:transform sm:rotate-2 sm:hover:rotate-0">
                <div className="flex items-center gap-2 mb-3 sm:gap-4 sm:mb-6">
                  <div className="p-2 bg-pink-100 rounded-full sm:p-3">
                    <Map className="w-5 h-5 text-pink-600 sm:w-8 sm:h-8" />
                  </div>
                  <h3 className="font-bold text-gray-800 text-18 sm:text-20 xl:text-24">나만의 여행 지도</h3>
                </div>
                <p className="leading-relaxed text-14 break-keep md:text-16 text-travel-gray700">
                  대한민국 지도에 다녀온 지역을 클릭하여 여행 사진을 업로드하고, 완성된 커스텀 지도를 다운로드 할 수
                  있습니다.
                </p>
                <div className="flex items-center gap-2 mt-2 text-12 sm:text-14 text-travel-gray600">
                  <Download className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>지도 다운로드 기능 제공</span>
                </div>
              </div>

              <div className="my-2 px-4 py-8 max-[500px]:py-4 transition-all duration-300 border-l-4 border-yellow-400 shadow-lg bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl sm:shadow-2xl sm:border-l-8 sm:transform sm:-rotate-2 sm:hover:rotate-0">
                <div className="flex items-center gap-2 mb-3 sm:gap-4 sm:mb-6">
                  <div className="p-2 bg-yellow-100 rounded-full sm:p-3">
                    <UserRound className="w-5 h-5 text-yellow-600 sm:w-8 sm:h-8" />
                  </div>
                  <h3 className="font-bold text-gray-800 text-18 sm:text-20 xl:text-24">마이페이지</h3>
                </div>
                <p className="leading-relaxed text-14 break-keep md:text-16 text-travel-gray700">
                  작성한 글의 조회수와 좋아요 수 확인, 북마크한 글과 작성한 리뷰 관리, 전체 여행 일정을 한눈에 볼 수
                  있습니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative px-4 py-10 md:py-24 sm:px-8">
        <div className="max-w-[1600px] mx-auto">
          <h2 className="relative mb-10 font-semibold text-center text-28 text-travel-text100 sm:text-3xl">
            프로젝트 팀원 소개
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="relative flex flex-col gap-4 py-6 overflow-hidden transition-all duration-300 transform bg-white border-t-4 shadow-lg sm:border-l-4 sm:border-t-0 xl:border-l-4 xl:border-t-0 md:border-t-4 md:border-l-0 rounded-xl sm:rounded-2xl sm:shadow-xl hover:scale-101 border-travel-primary-light100">
              <div className="flex flex-col items-center gap-4 px-6 sm:flex-row md:flex-col xl:flex-row">
                <div className="relative overflow-hidden rounded-3xl w-50 aspect-square">
                  <Image src="/images/teamprofile/sy.png" alt="박선영 프로필" className="object-cover" fill />
                </div>
                <div className="w-full">
                  <h3 className="flex items-center gap-2 mb-2 font-bold text-gray-800 text-24">
                    <span>박선영</span>
                    <TagItem size="md">팀장 / PM</TagItem>
                  </h3>
                  <p className="flex flex-col gap-1 font-medium text-travel-primary100 text-14 lg:text-16">
                    <span>- 여행 후기 페이지 전반 담당</span>
                    <span>- 여행 후기 등록 / 수정 / 삭제 / 조회 기능</span>
                    <span>- 회원 정보 등록 및 수정, 로그인 기능</span>
                    <span>- 여행 일정 공유 기능</span>
                    <span>- 메인 페이지 현재 위치 및 주소 변환 기능</span>
                    <span className="hidden text-white md:block">-</span>
                  </p>
                </div>
              </div>
              <div className="px-6">
                <p className="p-4 rounded-xl break-keep text-travel-gray700 bg-travel-gray100">
                  한 달이란 시간이 숨 쉴 틈 없이 지나갔다고 느껴집니다. 프로젝트를 처음 기획하는 단계에서는 과연 우리가
                  이 프로젝트를 잘 완성할 수 있을까란 막연함이 컸지만, 주차별 스프린트를 거치며 프로젝트가 점차 완성되는
                  모습을 볼 때의 뿌듯함은 말로 다 표현할 수 없을 것 같습니다. 처음엔 일단 기능만 되게 하자란 마음으로
                  시작했지만 프로젝트가 진행되면서 코드의 방향성을 고민하고, AI도 활용하면서 제 지식과 함께 AI 활용
                  능력까지 함께 성장할 수 있는 계기가 되었다고 생각합니다. 열정 가득한 PM과 함께 불타오르며 달려준
                  팀원들에게 진심으로 감사하고, 앞으로도 더욱 멋진 개발자로 성장하고 싶습니다.
                </p>
              </div>
              <Link
                href="https://github.com/seonyoungg"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute p-2 transition-all duration-300 transform bg-black rounded-full top-6 right-6 bg-opacity-70 hover:bg-opacity-90 hover:scale-105"
              >
                <Github className="text-white size-5 " />
              </Link>
            </div>

            <div className="relative flex flex-col gap-4 py-6 overflow-hidden transition-all duration-300 transform bg-white border-t-4 shadow-lg sm:border-l-4 sm:border-t-0 xl:border-l-4 xl:border-t-0 md:border-t-4 md:border-l-0 rounded-xl sm:rounded-2xl sm:shadow-xl hover:scale-101 border-travel-primary-light100">
              <div className="flex flex-col items-center gap-4 px-6 sm:flex-row md:flex-col xl:flex-row">
                <div className="relative overflow-hidden rounded-3xl w-50 aspect-square">
                  <Image src="/images/teamprofile/si.png" alt="문서인 프로필" className="object-cover" fill />
                </div>
                <div className="w-full">
                  <h3 className="flex items-center gap-2 mb-2 font-bold text-gray-800 text-24">
                    <span>문서인</span>
                    <TagItem size="md">PL</TagItem>
                  </h3>
                  <p className="flex flex-col gap-1 font-medium text-travel-primary100 text-14 lg:text-16">
                    <span>- 여행 일정 페이지 전반 담당</span>
                    <span>- 여행 일정 등록 / 수정 / 삭제 기능</span>
                    <span>- 여행 일차별 등록 / 수정 / 삭제 기능</span>
                    <span>- 여행 일정 검색 페이지에 관광 API 연동</span>
                    <span>- 메인 페이지 랜덤 여행지 추천 기능</span>
                    <span>- 네이버 지도 API 기반 위치 연동 처리</span>
                  </p>
                </div>
              </div>
              <div className="px-6">
                <p className="p-4 rounded-xl break-keep text-travel-gray700 bg-travel-gray100">
                  부트캠프 마지막 프로젝트인만큼 그동안 배운 걸 다 쏟아부을 수 있어서 뿌듯했습니다! 이번 프로젝트 하면서
                  충분한 기획부터 시작해 디자인, 개발, 테스트까지 제대로 경험할 수 있었습니다. 처음엔 기능이 불안했지만
                  계속 리팩토링하며 개선해 나가고 사용자 경험까지 고려할 여유가 있어서 좋았습니다. 많이 성장할 수 있었던
                  값진 시간이었습니다~ 감사합니다
                </p>
              </div>
              <Link
                href="https://github.com/SeOinm"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute p-2 transition-all duration-300 transform bg-black rounded-full top-6 right-6 bg-opacity-70 hover:bg-opacity-90 hover:scale-105"
              >
                <Github className="text-white size-5 " />
              </Link>
            </div>

            <div className="relative flex flex-col gap-4 py-6 overflow-hidden transition-all duration-300 transform bg-white border-t-4 shadow-lg sm:border-l-4 sm:border-t-0 xl:border-l-4 xl:border-t-0 md:border-t-4 md:border-l-0 rounded-xl sm:rounded-2xl sm:shadow-xl hover:scale-101 border-travel-primary-light100">
              <div className="flex flex-col items-center gap-4 px-6 sm:flex-row md:flex-col xl:flex-row">
                <div className="relative overflow-hidden rounded-3xl w-50 aspect-square">
                  <Image src="/images/teamprofile/ah.png" alt="송아현 프로필" className="object-cover" fill />
                </div>
                <div className="w-full">
                  <h3 className="flex items-center gap-2 mb-2 font-bold text-gray-800 text-24">
                    <span>송아현</span>
                    <TagItem size="md">UX/UI</TagItem>
                  </h3>
                  <p className="flex flex-col gap-1 font-medium text-travel-primary100 text-14 lg:text-16">
                    <span>- 전체 피그마 디자인 담당</span>
                    <span>- 여행 후기 데이터 연동 및 필터링 기능</span>
                    <span>- 댓글 등록 / 수정 / 삭제 기능</span>
                    <span>- 404 Not Found 페이지 구성</span>
                    <span>- 인덱스 페이지 구성</span>
                  </p>
                </div>
              </div>
              <div className="px-6">
                <p className="p-4 rounded-xl break-keep text-travel-gray700 bg-travel-gray100">
                  프로젝트 시작 전에는 두려움과 걱정이 많았지만, 팀원분들께서 잘 이끌어주셔서 기획부터 개발까지 모든
                  과정을 직접 경험하고 많은 것을 배울 수 있었습니다. 단순한 기능 구현을 넘어 사용자에게 어떤 경험을 줄
                  수 있을지 고민하며 개발한 점이 인상 깊었고, 협업의 중요성을 깊이 느꼈습니다. 여전히 부족하지만 한 단계
                  성장했다는 성취감도 얻게 되어 의미 있는 시간이었습니다. 다들 고생 많으셨습니다! 감사합니다.
                </p>
              </div>
              <Link
                href="https://github.com/ineahe"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute p-2 transition-all duration-300 transform bg-black rounded-full top-6 right-6 bg-opacity-70 hover:bg-opacity-90 hover:scale-105"
              >
                <Github className="text-white size-5 " />
              </Link>
            </div>

            <div className="relative flex flex-col gap-4 py-6 overflow-hidden transition-all duration-300 transform bg-white border-t-4 shadow-lg sm:border-l-4 sm:border-t-0 xl:border-l-4 xl:border-t-0 md:border-t-4 md:border-l-0 rounded-xl sm:rounded-2xl sm:shadow-xl hover:scale-101 border-travel-primary-light100">
              <div className="flex flex-col items-center gap-4 px-6 sm:flex-row md:flex-col xl:flex-row">
                <div className="relative overflow-hidden rounded-3xl w-50 aspect-square">
                  <Image src="/images/teamprofile/hj.png" alt="차형주 프로필" className="object-cover" fill />
                </div>
                <div className="w-full">
                  <h3 className="flex items-center gap-2 mb-2 font-bold text-gray-800 text-24">
                    <span>차형주</span>
                    <TagItem size="md">Documenter</TagItem>
                  </h3>
                  <p className="flex flex-col gap-1 font-medium text-travel-primary100 text-14 lg:text-16">
                    <span>- 지도 생성 페이지 전반 담당</span>
                    <span>- 지역 이미지 업로드 + 회원 정보 수정 연동</span>
                    <span>- 여행 후기 북마크 등록 / 삭제 / 조회 기능</span>
                    <span>- 프로젝트 README 작성</span>
                    <span>- GitHub Wiki 문서화</span>
                  </p>
                </div>
              </div>
              <div className="px-6">
                <p className="p-4 rounded-xl break-keep text-travel-gray700 bg-travel-gray100">
                  마지막 프로젝트인데 모르는게 아직 많아서 처음엔 정말 걱정했습니다. 막상 프로젝트가 시작하여 다같이
                  기획하고 또 코드 작업을 진행하면서 몰랐던 부분을 스스로 찾아가며 점점 성장하는 제 자신을 볼 수 있었고,
                  항상 서로를 격려하는 분위기를 만들어주신 팀장님과 다른 팀원분들 모두 정말 감사합니다. 제 실력이 많이
                  모자랐지만 좋은 팀원분들을 만나 열심히 해볼 수 있어서 좋았습니다.
                </p>
              </div>
              <Link
                href="https://github.com/HyungJuCha"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute p-2 transition-all duration-300 transform bg-black rounded-full top-6 right-6 bg-opacity-70 hover:bg-opacity-90 hover:scale-105"
              >
                <Github className="text-white size-5 " />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 border-t-2 border-blue-400 sm:py-16 bg-travel-bg100">
        <p className="flex flex-col gap-1.5 text-center text-14 sm:text-16 text-travel-gray700">
          <span>© 2025 멋쟁이사자처럼 프론트엔드 부트캠프 13기</span>
          <span>Final Project 6팀 6PM</span>
          <span>박선영, 문서인, 송아현, 차형주</span>
        </p>
      </footer>
    </div>
  );
}

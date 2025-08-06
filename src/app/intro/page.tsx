import { Book, Home, Plane, Search, SquarePen, Map, Download, UserRound, Github } from "lucide-react";

export default function IntroPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 relative overflow-hidden">
      <section className="relative min-h-screen flex items-center justify-center p-4">
        <div className="max-w-6xl mx-auto text-center relative w-full">
          {/* 모바일 디자인 */}
          <div className="block sm:hidden">
            <div className="space-y-6">
              <div className="h-22 mx-auto flex items-center justify-center mb-8">
                <img
                  src="/images/typo-loading.svg"
                  alt="여행도감 로고"
                  className="h-full w-auto object-contain"
                  loading="eager"
                />
              </div>
              <div className="bg-yellow-100/80 border-l-4 border-yellow-400 rounded-r-2xl p-4 shadow-lg">
                <p className="text-16 font-bold text-gray-800 leading-relaxed">
                  "여행 계획부터 리뷰까지, 하나로 끝내는 기록 플랫폼"
                </p>
              </div>

              <div className="space-y-3">
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg p-5 border-l-4 border-blue-400">
                  <p className="text-14 font-semibold text-blue-700">기억은 흐려져도, 기록은 선명하니까</p>
                </div>
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg p-5 border-l-4 border-indigo-400">
                  <p className="text-14 font-semibold text-indigo-700">지도에 여행을 새기다</p>
                </div>
              </div>

              <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl p-6 border border-gray-200">
                <p className="text-14 text-travel-gray700 leading-relaxed">
                  여행도감은 사용자들이 자신의 여행 경험을 체계적으로 기록하고 보관할 수 있도록 도움으로써, 마치
                  사용자만의 지도가 완성되는 느낌을 주는 도감 프로젝트입니다. 다양한 여행 정보와 후기를 한 곳에 모아,
                  사용자 간의 소통과 정보 공유를 통해 신뢰할 수 있고 누구나 쉽게 여행을 계획할 수 있도록 하였습니다.
                </p>
              </div>

              <div className="pt-2">
                <a
                  href="/home"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-travel-secondary300 hover:bg-travel-primary200 text-white font-bold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 text-16"
                >
                  <Book className="w-5 h-5" />
                  여행도감 바로가기
                </a>
              </div>
            </div>
          </div>

          {/* PC 디자인 */}
          <div className="hidden sm:block">
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border-l-8 border-travel-primary-light100 p-16 relative transform rotate-1 hover:rotate-0 transition-transform duration-500">
              <div className="absolute left-4 top-8 space-y-6">
                {Array.from({ length: 8 }, (_, i) => (
                  <div key={i} className="w-3 h-3 rounded-full bg-blue-100 border border-blue-200" />
                ))}
              </div>
              <div className="absolute top-6 right-6 transform rotate-12">
                <div className="border-2 border-blue-300 rounded-lg px-3 py-2 bg-blue-50">
                  <div className="text-xs text-travel-secondary300">PROJECT</div>
                  <div className="text-xs text-travel-secondary300">6PM</div>
                </div>
              </div>
              <div className="relative z-10">
                <div className="mb-8">
                  <div className="h-32 mx-auto flex items-center justify-center">
                    <img
                      src="/images/typo-loading.svg"
                      alt="여행도감 로고"
                      className="h-full w-auto object-contain"
                      loading="eager"
                    />
                  </div>
                </div>
                <div className="space-y-6 mb-12">
                  <div className="bg-yellow-100/80 border-l-4 border-yellow-400 p-6 rounded-r-2xl transform -rotate-1 shadow-lg">
                    <p className="sm:text-18 lg:text-20 font-semibold text-gray-800">
                      "여행 계획부터 리뷰까지, 하나로 끝내는 기록 플랫폼"
                    </p>
                  </div>
                  <div className="flex flex-row flex-wrap justify-center gap-4">
                    <div className="px-6 py-3 rounded-full shadow-md bg-white/95 border-l-4 border-blue-400">
                      <span className="text-14 text-blue-700 font-semibold">기억은 흐려져도, 기록은 선명하니까</span>
                    </div>
                    <div className="px-6 py-3 rounded-full shadow-md bg-white/95 border-l-4 border-indigo-400">
                      <span className="text-14 text-indigo-700 font-semibold">지도에 여행을 새기다</span>
                    </div>
                  </div>
                </div>
                <div className="bg-white/95 border border-gray-200 rounded-3xl p-6 mb-8 shadow-lg backdrop-blur-sm">
                  <p className="text-16 text-travel-gray700 leading-relaxed">
                    여행도감은 사용자들이 자신의 여행 경험을 체계적으로 기록하고 보관할 수 있도록 도움으로써, 마치
                    사용자만의 지도가 완성되는 느낌을 주는 도감 프로젝트입니다. 다양한 여행 정보와 후기를 한 곳에 모아,
                    사용자 간의 소통과 정보 공유를 통해 신뢰할 수 있고 누구나 쉽게 여행을 계획할 수 있도록 하였습니다.
                  </p>
                </div>
                <a
                  href="/home"
                  className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-travel-secondary300 hover:bg-travel-primary200 text-white font-bold rounded-full transition-all duration-300 shadow-xl hover:shadow-blue-500/25 hover:scale-105 text-18 transform hover:-rotate-1"
                >
                  <Book className="w-6 h-6" />
                  여행도감 바로가기
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-24 px-6 sm:px-4 relative">
        <div className="max-w-[1600px] mx-auto">
          <div className="text-center mb-10 sm:mb-20">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-black mb-4 sm:mb-8 relative px-4">
              프로젝트 주요 기능
            </h2>
          </div>

          {/* 화면 캡처해서 스와이프 형태로 재구성 */}
          <div className="grid lg:grid-cols-5 gap-6 sm:gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-2 order-1 lg:order-1">
              <div className="p-2 sm:p-4 lg:p-8 sm:transform sm:-rotate-2 sm:hover:rotate-0 transition-transform duration-300">
                <div className="p-2 sm:p-4">
                  <img
                    src="/images/iphone-img.png"
                    alt="6PM 여행도감 앱 스크린샷"
                    className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-none h-auto rounded-lg sm:rounded-xl mx-auto"
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-3 order-2">
              <div className="grid lg:grid-cols-2 gap-4 sm:gap-8 mb-4 sm:mb-8">
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-2xl p-4 sm:p-8 border-l-4 sm:border-l-8 border-travel-primary-light100 sm:transform sm:rotate-2 sm:hover:rotate-0 transition-all duration-300">
                  <div className="flex items-center gap-2 sm:gap-4 mb-3 sm:mb-6">
                    <div className="bg-blue-100 p-2 sm:p-3 rounded-full">
                      <Home className="w-5 h-5 sm:w-8 sm:h-8 text-travel-primary-light100" />
                    </div>
                    <h3 className="text-18 sm:text-24 font-bold text-gray-800">홈 화면</h3>
                  </div>
                  <p className="text-14 md:text-16 text-travel-gray700 mb-4 leading-relaxed">
                    오늘 날짜/날씨 표시, 예정/완료 일정 관리, 랜덤 여행지 추천 기능으로 여행 계획을 한눈에 확인할 수
                    있습니다.
                  </p>
                </div>

                <div className="bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-2xl p-4 sm:p-8 border-l-4 sm:border-l-8 border-green-400 sm:transform sm:-rotate-1 sm:hover:rotate-0 transition-all duration-300">
                  <div className="flex items-center gap-2 sm:gap-4 mb-3 sm:mb-6">
                    <div className="bg-green-100 p-2 sm:p-3 rounded-full">
                      <Plane className="w-5 h-5 sm:w-8 sm:h-8 text-green-600" />
                    </div>
                    <h3 className="text-18 sm:text-24 font-bold text-gray-800">여행 일정 계획</h3>
                  </div>
                  <p className="text-14 md:text-16 text-travel-gray700 mb-4 leading-relaxed">
                    가고 싶은 지역과 여행 기간을 정한 뒤, 날짜별로 방문지를 검색해 추가하고, 지도를 통해 효율적인 일정을
                    계획할 수 있습니다.
                  </p>
                </div>
              </div>

              <div className="grid lg:grid-cols-2 gap-4 sm:gap-8 mb-4 sm:mb-8">
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-2xl p-4 sm:p-8 border-l-4 sm:border-l-8 border-purple-400 sm:transform sm:rotate-1 sm:hover:rotate-0 transition-all duration-300">
                  <div className="flex items-center gap-2 sm:gap-4 mb-3 sm:mb-6">
                    <div className="bg-purple-100 p-2 sm:p-3 rounded-full">
                      <Search className="w-5 h-5 sm:w-8 sm:h-8 text-purple-600" />
                    </div>
                    <h3 className="text-18 sm:text-24 font-bold text-gray-800">여행지 리뷰</h3>
                  </div>
                  <p className="text-14 md:text-16 text-travel-gray700 mb-4 leading-relaxed">
                    검색, 북마크, 댓글 기능으로 자신의 리뷰 뿐만 아니라 다른 사용자가 작성한 다양한 여행 리뷰를 탐색하고
                    소통할 수 있습니다.
                  </p>
                </div>

                <div className="bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-2xl p-4 sm:p-8 border-l-4 sm:border-l-8 border-orange-400 sm:transform sm:-rotate-1 sm:hover:rotate-0 transition-all duration-300">
                  <div className="flex items-center gap-2 sm:gap-4 mb-3 sm:mb-6">
                    <div className="bg-orange-100 p-2 sm:p-3 rounded-full">
                      <SquarePen className="w-5 h-5 sm:w-8 sm:h-8 text-orange-600" />
                    </div>
                    <h3 className="text-18 sm:text-24 font-bold text-gray-800">기록하기</h3>
                  </div>
                  <p className="text-14 md:text-16 text-travel-gray700 mb-4 leading-relaxed">
                    여행 일정을 기반으로 완료된 여행에 대해 장소 정보, 제목, 내용, 사진, 태그, 별점을 추가하여 생생한
                    기록을 작성할 수 있습니다.
                  </p>
                </div>
              </div>

              <div className="grid lg:grid-cols-2 gap-4 sm:gap-8">
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-2xl p-4 sm:p-8 border-l-4 sm:border-l-8 border-pink-400 sm:transform sm:rotate-1 sm:hover:rotate-0 transition-all duration-300">
                  <div className="flex items-center gap-2 sm:gap-4 mb-3 sm:mb-6">
                    <div className="bg-pink-100 p-2 sm:p-3 rounded-full">
                      <Map className="w-5 h-5 sm:w-8 sm:h-8 text-pink-600" />
                    </div>
                    <h3 className="text-18 sm:text-24 font-bold text-gray-800">나만의 여행 지도</h3>
                  </div>
                  <p className="text-14 md:text-16 text-travel-gray700 mb-4 leading-relaxed">
                    대한민국 지도에 다녀온 지역을 클릭하여 여행 사진을 업로드하고, 완성된 커스텀 지도를 다운로드 할 수
                    있습니다.
                  </p>
                  <div className="flex items-center gap-1 sm:gap-2 text-12 sm:text-14 text-travel-gray600">
                    <Download className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>지도 다운로드 기능 제공</span>
                  </div>
                </div>

                <div className="bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-2xl p-4 sm:p-8 border-l-4 sm:border-l-8 border-yellow-400 sm:transform sm:rotate-2 sm:hover:rotate-0 transition-all duration-300">
                  <div className="flex items-center gap-2 sm:gap-4 mb-3 sm:mb-6">
                    <div className="bg-yellow-100 p-2 sm:p-3 rounded-full">
                      <UserRound className="w-5 h-5 sm:w-8 sm:h-8 text-yellow-600" />
                    </div>
                    <h3 className="text-18 sm:text-24 font-bold text-gray-800">마이페이지</h3>
                  </div>
                  <p className="text-14 md:text-16 text-travel-gray700 mb-4 leading-relaxed">
                    작성한 글의 조회수와 좋아요 수 확인, 북마크한 글과 작성한 리뷰 관리, 전체 여행 일정을 한눈에 볼 수
                    있습니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-24 px-10 sm:px-4 mt-12 sm:mt-24 mb-16 sm:mb-32">
        <div className="mx-auto" style={{ maxWidth: "1480px" }}>
          <div className="text-center mb-10 sm:mb-20">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-black mb-4 sm:mb-8 relative px-4">
              프로젝트 팀원 소개
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
            <div className="group">
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-300 border-t-4 border-travel-primary-light100">
                <div className="relative">
                  <div className="w-full h-56 sm:h-64 bg-gray-100 flex items-center justify-center overflow-hidden">
                    <img
                      src="/images/teamprofile/sy.png"
                      alt="박선영 프로필"
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <a
                    href="https://github.com/seonyoungg"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-3 right-3 bg-black bg-opacity-70 hover:bg-opacity-90 text-white p-2 rounded-full transition-all duration-300 transform hover:scale-110"
                  >
                    <Github size={16} className="sm:w-5 sm:h-5" />
                  </a>
                </div>
                <div className="p-6 sm:p-8">
                  <h3 className="text-20 font-bold text-gray-800 mb-2">박선영</h3>
                  <p className="text-blue-700 font-semibold mb-2 text-16">팀장 / PM</p>
                  <p className="text-14 text-travel-secondary300 mb-3 sm:mb-4 font-medium">
                    - 여행 후기 페이지 전반 담당 <br /> - 여행 후기 등록 / 수정 / 삭제 / 조회 기능 <br /> - 회원 정보
                    등록 및 수정, 로그인 기능 <br /> - 여행 일정 공유 기능 <br /> - 메인 페이지 현재 위치 및 주소 변환
                    기능
                  </p>
                  <p className="text-14 text-travel-gray700 leading-relaxed">
                    한 달이란 시간이 숨 쉴 틈 없이 지나갔다고 느껴집니다. 프로젝트를 처음 기획하는 단계에서는 과연
                    우리가 이 프로젝트를 잘 완성할 수 있을까란 막연함이 컸지만, 주차별 스프린트를 거치며 프로젝트가 점차
                    완성되는 모습을 볼 때의 뿌듯함은 말로 다 표현할 수 없을 것 같습니다. 처음엔 일단 기능만 되게 하자란
                    마음으로 시작했지만 프로젝트가 진행되면서 코드의 방향성을 고민하고, AI도 활용하면서 제 지식과 함께
                    AI 활용 능력까지 함께 성장할 수 있는 계기가 되었다고 생각합니다. 열정 가득한 PM과 함께 불타오르며
                    달려준 팀원들에게 진심으로 감사하고, 앞으로도 더욱 멋진 개발자로 성장하고 싶습니다.
                  </p>
                </div>
              </div>
            </div>

            <div className="group">
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-300 border-t-4 border-travel-primary-light100">
                <div className="relative">
                  <div className="w-full h-56 sm:h-64 bg-gray-100 flex items-center justify-center overflow-hidden">
                    <img
                      src="/images/teamprofile/si.png"
                      alt="문서인 프로필"
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <a
                    href="https://github.com/SeOinm"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-3 right-3 bg-black bg-opacity-70 hover:bg-opacity-90 text-white p-2 rounded-full transition-all duration-300 transform hover:scale-110"
                  >
                    <Github size={16} className="sm:w-5 sm:h-5" />
                  </a>
                </div>
                <div className="p-6 sm:p-8">
                  <h3 className="text-20 font-bold text-gray-800 mb-2">문서인</h3>
                  <p className="text-blue-700 font-semibold mb-2 text-16">PL</p>
                  <p className="text-14 text-travel-secondary300 mb-3 sm:mb-4 font-medium">
                    - 여행 일정 페이지 전반 담당 <br /> - 여행 일정 등록 / 수정 / 삭제 기능 <br /> - 여행 일차별 등록 /
                    수정 / 삭제 기능
                    <br /> - 여행 일정 검색 페이지에 관광 API 연동 <br /> - 메인 페이지 랜덤 여행지 추천 기능
                    <br /> - 네이버 지도 API 기반 위치 연동 처리
                  </p>
                  <p className="text-14 text-travel-gray700 leading-relaxed">
                    부트캠프 마지막 프로젝트인만큼 그동안 배운 걸 다 쏟아부을 수 있어서 뿌듯했습니다! 이번 프로젝트
                    하면서 충분한 기획부터 시작해 디자인, 개발, 테스트까지 제대로 경험할 수 있었습니다. 처음엔 기능이
                    불안했지만 계속 리팩토링하며 개선해 나가고 사용자 경험까지 고려할 여유가 있어서 좋았습니다. 많이
                    성장할 수 있었던 값진 시간이었습니다~ 감사합니다
                  </p>
                </div>
              </div>
            </div>

            <div className="group">
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-300 border-t-4 border-travel-primary-light100">
                <div className="relative">
                  <div className="w-full h-56 sm:h-64 bg-gray-100 flex items-center justify-center overflow-hidden">
                    <img
                      src="/images/teamprofile/ah.png"
                      alt="송아현 프로필"
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <a
                    href="https://github.com/ineahe"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-3 right-3 bg-black bg-opacity-70 hover:bg-opacity-90 text-white p-2 rounded-full transition-all duration-300 transform hover:scale-110"
                  >
                    <Github size={16} className="sm:w-5 sm:h-5" />
                  </a>
                </div>
                <div className="p-6 sm:p-8">
                  <h3 className="text-20 font-bold text-gray-800 mb-2">송아현</h3>
                  <p className="text-blue-700 font-semibold mb-2 text-16">UX/UI</p>
                  <p className="text-14 text-travel-secondary300 mb-3 sm:mb-4 font-medium">
                    - 전체 피그마 디자인 담당 <br /> - 여행 후기 데이터 연동 및 필터링 기능 <br /> - 댓글 등록 / 수정 /
                    삭제 기능 기능 <br /> - 404 Not Found 페이지 구성 <br /> - 인덱스 페이지 구성
                  </p>
                  <p className="text-14 text-travel-gray700 leading-relaxed">
                    프로젝트 시작 전에는 두려움과 걱정이 많았지만, 팀원분들께서 잘 이끌어주셔서 기획부터 개발까지 모든
                    과정을 직접 경험하고 많은 것을 배울 수 있었습니다. 단순한 기능 구현을 넘어 사용자에게 어떤 경험을 줄
                    수 있을지 고민하며 개발한 점이 인상 깊었고, 협업의 중요성을 깊이 느꼈습니다. 여전히 부족하지만 한
                    단계 성장했다는 성취감도 얻게 되어 의미 있는 시간이었습니다. 다들 고생 많으셨습니다! 감사합니다.
                  </p>
                </div>
              </div>
            </div>

            <div className="group">
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-300 border-t-4 border-travel-primary-light100">
                <div className="relative">
                  <div className="w-full h-56 sm:h-64 bg-gray-100 flex items-center justify-center overflow-hidden">
                    <img
                      src="/images/teamprofile/hj.png"
                      alt="차형주 프로필"
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <a
                    href="https://github.com/HyungJuCha"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-3 right-3 bg-black bg-opacity-70 hover:bg-opacity-90 text-white p-2 rounded-full transition-all duration-300 transform hover:scale-110"
                  >
                    <Github size={16} className="sm:w-5 sm:h-5" />
                  </a>
                </div>
                <div className="p-6 sm:p-8">
                  <h3 className="text-20 font-bold text-gray-800 mb-2">차형주</h3>
                  <p className="text-blue-700 font-semibold mb-2 text-16">Doc</p>
                  <p className="text-14 text-travel-secondary300 mb-3 sm:mb-4 font-medium">
                    - 지도 생성 페이지 전반 담당 <br /> - 지역 이미지 업로드 + 회원 정보 수정 연동 <br /> - 여행 후기
                    북마크 등록 / 삭제 / 조회 기능 <br /> - 프로젝트 README 작성 <br /> - GitHub Wiki 문서화
                  </p>
                  <p className="text-14 text-travel-gray700 leading-relaxed">
                    마지막 프로젝트인데 모르는게 아직 많아서 처음엔 정말 걱정했습니다. 막상 프로젝트가 시작하여 다같이
                    기획하고 또 코드 작업을 진행하면서 몰랐던 부분을 스스로 찾아가며 점점 성장하는 제 자신을 볼 수
                    있었고, 항상 서로를 격려하는 분위기를 만들어주신 팀장님과 다른 팀원분들 모두 정말 감사합니다. 제
                    실력이 많이 모자랐지만 좋은 팀원분들을 만나 열심히 해볼 수 있어서 좋았습니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-white border-t-4 border-blue-400 py-8 sm:py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-14 sm:text-base text-travel-gray700">
            © 2025 멋쟁이사자처럼 프론트엔드 부트캠프 13기
            <br /> Final Project 6팀 6PM
          </p>
        </div>
      </footer>
    </div>
  );
}

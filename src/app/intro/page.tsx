import { Book, Home, Plane, Search, SquarePen, Map, Download, UserRound, Github } from "lucide-react";

export default function IntroPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 relative overflow-hidden">
      <section className="relative min-h-screen flex items-center justify-center p-4 sm:p-4">
        <div className="max-w-6xl mx-auto text-center relative w-full">
          {/* 모바일 디자인 */}
          <div className="block sm:hidden">
            <div className="space-y-6">
              <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl p-6 border border-blue-100">
                <div className="h-16 mx-auto flex items-center justify-center mb-4">
                  <img
                    src="/images/typo-loading.svg"
                    alt="여행도감 로고"
                    className="h-full w-auto object-contain"
                    loading="eager"
                  />
                </div>
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-4">
                  <p className="text-lg font-bold text-gray-800 leading-relaxed">
                    "여행 계획부터 리뷰까지,
                    <br />
                    하나로 끝내는 기록 플랫폼"
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg p-5 border-l-4 border-blue-400">
                  <p className="text-sm font-semibold text-blue-700">기억은 흐려져도, 기록은 선명하니까</p>
                </div>
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg p-5 border-l-4 border-indigo-400">
                  <p className="text-sm font-semibold text-indigo-700">지도에 여행을 새기다</p>
                </div>
              </div>

              <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl p-6 border border-gray-200">
                <p className="text-sm text-gray-700 leading-relaxed">
                  여행도감은 사용자들이 자신의 여행 경험을 체계적으로 기록하고 보관할 수 있도록 도움으로써, 마치
                  사용자만의 지도가 완성되는 느낌을 주는 도감 프로젝트입니다. 다양한 여행 정보와 후기를 한 곳에 모아,
                  사용자 간의 소통과 정보 공유를 통해 신뢰할 수 있고 누구나 쉽게 여행을 계획할 수 있도록 하였습니다.
                </p>
              </div>

              <div className="pt-2">
                <a
                  href="/home"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-travel-secondary300 hover:bg-travel-primary200 text-white font-bold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 text-base w-full max-w-xs"
                >
                  <Book className="w-5 h-5" />
                  여행도감 바로가기
                </a>
              </div>
            </div>
          </div>

          {/* PC 디자인 */}
          <div className="hidden sm:block">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl border-l-4 sm:border-l-8 border-travel-primary-light100 p-4 sm:p-8 md:p-12 lg:p-16 relative sm:transform sm:rotate-1 sm:hover:rotate-0 transition-transform duration-500 mx-4 sm:mx-0">
              <div className="absolute left-3 sm:left-4 top-6 sm:top-8 space-y-3 sm:space-y-6">
                {Array.from({ length: 8 }, (_, i) => (
                  <div key={i} className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-blue-100 border border-blue-200" />
                ))}
              </div>
              <div className="hidden sm:block absolute top-3 sm:top-6 right-3 sm:right-6 transform rotate-6 sm:rotate-12">
                <div className="border-2 border-blue-300 rounded-lg px-2 py-1 sm:px-3 sm:py-2 bg-blue-50">
                  <div className="text-xs text-travel-secondary300 font-mono">PROJECT</div>
                  <div className="text-xs text-travel-secondary300 font-mono">6PM</div>
                </div>
              </div>
              <div className="relative z-10">
                <div className="mb-4 sm:mb-8">
                  <div className="h-16 sm:h-20 md:h-24 lg:h-32 mx-auto flex items-center justify-center">
                    <img
                      src="/images/typo-loading.svg"
                      alt="여행도감 로고"
                      className="h-full w-auto object-contain"
                      loading="eager"
                      style={{ minHeight: "4rem" }}
                    />
                  </div>
                </div>
                <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-12">
                  <div className="bg-yellow-100/80 border-l-2 sm:border-l-4 border-yellow-400 p-4 sm:p-6 rounded-r-lg sm:rounded-r-2xl sm:transform sm:-rotate-1 shadow-lg mx-6 sm:mx-0">
                    <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-gray-800">
                      "여행 계획부터 리뷰까지, 하나로 끝내는 기록 플랫폼"
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 px-6 sm:px-0">
                    <div className="px-4 sm:px-6 py-3 rounded-full border shadow-md bg-white/95 p-5 border-l-4 border-blue-400">
                      <span className="text-sm text-blue-700 font-medium">기억은 흐려져도, 기록은 선명하니까</span>
                    </div>
                    <div className="px-4 sm:px-6 py-3 rounded-full border shadow-md bg-white/95 p-5 border-l-4 border-indigo-400">
                      <span className="text-sm text-indigo-700 font-medium">지도에 여행을 새기다</span>
                    </div>
                  </div>
                </div>
                <div className="bg-blue-50/80 border border-blue-200 sm:border-2 rounded-lg sm:rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 shadow-lg mx-2 sm:mx-0">
                  <p className="text-sm sm:text-sm lg:text-base text-gray-700 leading-relaxed">
                    여행도감은 사용자들이 자신의 여행 경험을 체계적으로 기록하고 보관할 수 있도록 도움으로써, 마치
                    사용자만의 지도가 완성되는 느낌을 주는 도감 프로젝트입니다. 다양한 여행 정보와 후기를 한 곳에 모아,
                    사용자 간의 소통과 정보 공유를 통해 신뢰할 수 있고 누구나 쉽게 여행을 계획할 수 있도록 하였습니다.
                  </p>
                </div>
                <a
                  href="/home"
                  className="inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-10 py-3 sm:py-5 bg-travel-secondary300 hover:bg-travel-primary200 text-white font-bold rounded-full transition-all duration-300 shadow-lg sm:shadow-xl hover:shadow-blue-500/25 hover:scale-105 text-sm sm:text-lg sm:transform sm:hover:-rotate-1"
                >
                  <Book className="w-4 h-4 sm:w-6 sm:h-6" />
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
                    <h3 className="text-lg sm:text-2xl font-bold text-gray-800">홈 화면</h3>
                  </div>
                  <p className="text-sm sm:text-sm lg:text-base text-gray-700 mb-4 leading-relaxed">
                    오늘 날짜/날씨 표시, 예정/완료 일정 관리, 랜덤 여행지 추천 기능으로 여행 계획을 한눈에 확인할 수
                    있습니다.
                  </p>
                </div>

                <div className="bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-2xl p-4 sm:p-8 border-l-4 sm:border-l-8 border-green-400 sm:transform sm:-rotate-1 sm:hover:rotate-0 transition-all duration-300">
                  <div className="flex items-center gap-2 sm:gap-4 mb-3 sm:mb-6">
                    <div className="bg-green-100 p-2 sm:p-3 rounded-full">
                      <Plane className="w-5 h-5 sm:w-8 sm:h-8 text-green-600" />
                    </div>
                    <h3 className="text-lg sm:text-2xl font-bold text-gray-800">여행 일정 계획</h3>
                  </div>
                  <p className="text-sm sm:text-sm lg:text-base text-gray-700 mb-4 leading-relaxed">
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
                    <h3 className="text-lg sm:text-2xl font-bold text-gray-800">여행지 리뷰</h3>
                  </div>
                  <p className="text-sm sm:text-sm lg:text-base text-gray-700 mb-4 leading-relaxed">
                    검색, 북마크, 댓글 기능으로 자신의 리뷰 뿐만 아니라 다른 사용자가 작성한 다양한 여행 리뷰를 탐색하고
                    소통할 수 있습니다.
                  </p>
                </div>

                <div className="bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-2xl p-4 sm:p-8 border-l-4 sm:border-l-8 border-orange-400 sm:transform sm:-rotate-1 sm:hover:rotate-0 transition-all duration-300">
                  <div className="flex items-center gap-2 sm:gap-4 mb-3 sm:mb-6">
                    <div className="bg-orange-100 p-2 sm:p-3 rounded-full">
                      <SquarePen className="w-5 h-5 sm:w-8 sm:h-8 text-orange-600" />
                    </div>
                    <h3 className="text-lg sm:text-2xl font-bold text-gray-800">기록하기</h3>
                  </div>
                  <p className="text-sm sm:text-sm lg:text-base text-gray-700 mb-4 leading-relaxed">
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
                    <h3 className="text-lg sm:text-2xl font-bold text-gray-800">나만의 여행 지도</h3>
                  </div>
                  <p className="text-sm sm:text-sm lg:text-base text-gray-700 mb-4 leading-relaxed">
                    대한민국 지도에 다녀온 지역을 클릭하여 여행 사진을 업로드하고, 완성된 커스텀 지도를 다운로드 할 수
                    있습니다.
                  </p>
                  <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-600">
                    <Download className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>지도 다운로드 기능 제공</span>
                  </div>
                </div>

                <div className="bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-2xl p-4 sm:p-8 border-l-4 sm:border-l-8 border-yellow-400 sm:transform sm:rotate-2 sm:hover:rotate-0 transition-all duration-300">
                  <div className="flex items-center gap-2 sm:gap-4 mb-3 sm:mb-6">
                    <div className="bg-yellow-100 p-2 sm:p-3 rounded-full">
                      <UserRound className="w-5 h-5 sm:w-8 sm:h-8 text-yellow-600" />
                    </div>
                    <h3 className="text-lg sm:text-2xl font-bold text-gray-800">마이페이지</h3>
                  </div>
                  <p className="text-sm sm:text-sm lg:text-base text-gray-700 mb-4 leading-relaxed">
                    작성한 글의 조회수와 좋아요 수 확인, 북마크한 글과 작성한 리뷰 관리, 전체 여행 일정을 한눈에 볼 수
                    있습니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-24 px-6 sm:px-4 bg-gradient-to-r from-blue-50 to-slate-50 mt-12 sm:mt-24 mb-16 sm:mb-32">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 sm:mb-20">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-black mb-4 sm:mb-8 relative px-4">
              프로젝트 팀원 소개
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="group">
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-300 border-t-4 border-travel-primary-light100">
                <div className="relative">
                  <div className="w-full h-48 sm:h-56 bg-gray-100 flex items-center justify-center overflow-hidden">
                    <img
                      src="/images/user1.png"
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
                <div className="p-5 sm:p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">박선영</h3>
                  <p className="text-blue-600 font-semibold mb-2 text-base">팀장 / PM</p>
                  <p className="text-sm text-blue-500 mb-3 sm:mb-4 font-medium">무엇을담당했는지</p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    단순한 여행 기록이 아니라, 사람들의 추억을 담는 플랫폼을 만든다는 생각으로 임했습니다. 카테고리
                    분류부터 리뷰 흐름, 지도 연동까지 생각보다 많은 고민이 필요했어요. 기획부터 개발까지, 협업의 힘을
                    깊이 느낄 수 있었던 프로젝트였습니다.
                  </p>
                </div>
              </div>
            </div>

            <div className="group">
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-300 border-t-4 border-travel-primary-light100">
                <div className="relative">
                  <div className="w-full h-48 sm:h-56 bg-gray-100 flex items-center justify-center overflow-hidden">
                    <img
                      src="/images/user3.png"
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
                <div className="p-5 sm:p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">문서인</h3>
                  <p className="text-blue-600 font-semibold mb-2 text-base">PL</p>
                  <p className="text-sm text-blue-500 mb-3 sm:mb-4 font-medium">무엇을담당했는지</p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    단순한 여행 기록이 아니라, 사람들의 추억을 담는 플랫폼을 만든다는 생각으로 임했습니다. 카테고리
                    분류부터 리뷰 흐름, 지도 연동까지 생각보다 많은 고민이 필요했어요. 기획부터 개발까지, 협업의 힘을
                    깊이 느낄 수 있었던 프로젝트였습니다.
                  </p>
                </div>
              </div>
            </div>

            <div className="group">
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-300 border-t-4 border-travel-primary-light100">
                <div className="relative">
                  <div className="w-full h-48 sm:h-56 bg-gray-100 flex items-center justify-center overflow-hidden">
                    <img
                      src="/images/user2.png"
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
                <div className="p-5 sm:p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">송아현</h3>
                  <p className="text-blue-600 font-semibold mb-2 text-base">UI/UX</p>
                  <p className="text-sm text-blue-500 mb-3 sm:mb-4 font-medium">무엇을담당했는지</p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    단순한 여행 기록이 아니라, 사람들의 추억을 담는 플랫폼을 만든다는 생각으로 임했습니다. 카테고리
                    분류부터 리뷰 흐름, 지도 연동까지 생각보다 많은 고민이 필요했어요. 기획부터 개발까지, 협업의 힘을
                    깊이 느낄 수 있었던 프로젝트였습니다.
                  </p>
                </div>
              </div>
            </div>

            <div className="group">
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-300 border-t-4 border-travel-primary-light100">
                <div className="relative">
                  <div className="w-full h-48 sm:h-56 bg-gray-100 flex items-center justify-center overflow-hidden">
                    <img
                      src="/images/user5.png"
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
                <div className="p-5 sm:p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">차형주</h3>
                  <p className="text-blue-600 font-semibold mb-2 text-base">Doc</p>
                  <p className="text-sm text-blue-500 mb-3 sm:mb-4 font-medium">무엇을담당했는지</p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    단순한 여행 기록이 아니라, 사람들의 추억을 담는 플랫폼을 만든다는 생각으로 임했습니다. 카테고리
                    분류부터 리뷰 흐름, 지도 연동까지 생각보다 많은 고민이 필요했어요. 기획부터 개발까지, 협업의 힘을
                    깊이 느낄 수 있었던 프로젝트였습니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-white border-t-4 border-blue-400 py-8 sm:py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm sm:text-base text-gray-600">
            © 2025 멋쟁이사자처럼 프론트엔드 부트캠프 13기
            <br /> Final Project 6팀 6PM
          </p>
        </div>
      </footer>
    </div>
  );
}

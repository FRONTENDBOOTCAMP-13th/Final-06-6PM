import { Book, Home, Plane, Search, SquarePen, Map, Download, UserRound, Github } from "lucide-react";

export default function IndexPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 relative overflow-hidden">
      <section className="relative min-h-screen flex items-center justify-center p-4">
        <div className="max-w-6xl mx-auto text-center relative">
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border-l-8 border-blue-400 p-12 md:p-16 relative transform rotate-1 hover:rotate-0 transition-transform duration-500">
            <div className="absolute left-4 top-8 space-y-6">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="w-3 h-3 rounded-full bg-blue-100 border border-blue-200" />
              ))}
            </div>

            <div className="absolute top-6 right-6 transform rotate-12">
              <div className="border-2 border-blue-300 rounded-lg px-3 py-2 bg-blue-50">
                <div className="text-xs text-blue-600 font-mono">PROJECT</div>
                <div className="text-xs text-blue-600 font-mono">6PM</div>
              </div>
            </div>

            <div className="relative z-10">
              <div className="mb-8">
                <img src="/images/typo.svg" alt="여행도감 로고" className="h-24 md:h-32 mx-auto" />
              </div>

              <div className="space-y-6 mb-12">
                <div className="bg-yellow-100/80 border-l-4 border-yellow-400 p-6 rounded-r-2xl transform -rotate-1 shadow-lg">
                  <p className="text-xl md:text-2xl font-semibold text-gray-800">
                    "여행 계획부터 리뷰까지, 하나로 끝내는 기록 플랫폼"
                  </p>
                </div>
                <div className="flex flex-wrap justify-center gap-4">
                  <div className="bg-blue-100/80 px-6 py-3 rounded-full border-2 border-blue-200 transform rotate-1 shadow-md">
                    <span className="text-blue-700 font-medium">기억은 흐려져도, 기록은 선명하니까</span>
                  </div>
                  <div className="bg-blue-50/80 px-6 py-3 rounded-full border-2 border-blue-200 transform -rotate-1 shadow-md">
                    <span className="text-blue-700 font-medium">지도에 여행을 새기다</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50/80 border-2 border-blue-200 rounded-2xl p-6 mb-8 transform shadow-lg">
                <p className="text-gray-700 text-16">
                  여행도감은 사용자들이 자신의 여행 경험을 체계적으로 기록하고 보관할 수 있도록 도움으로써, <br /> 마치
                  사용자만의 지도가 완성되는 느낌을 주는 도감 프로젝트입니다. <br />
                  다양한 여행 정보와 후기를 한 곳에 모아, 사용자 간의 소통과 정보 공유를 통해 신뢰할 수 있고 누구나 쉽게
                  여행을 계획할 수 있도록 하였습니다.
                </p>
              </div>

              <a
                href="/home"
                className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-full transition-all duration-300 shadow-xl hover:shadow-blue-500/25 hover:scale-105 text-lg transform hover:-rotate-1"
              >
                <Book className="w-6 h-6" />
                여행도감 바로가기
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 relative">
        <div className="max-w-[1600px] mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-black text-black mb-8 relative">프로젝트 주요 기능</h2>
          </div>
          <div className="grid lg:grid-cols-5 gap-14 items-center">
            <div className="lg:col-span-2 order-1 lg:order-1">
              <div className="p-8 transform -rotate-2 hover:rotate-0 transition-transform duration-300">
                <div className="p-4">
                  <img src="/images/11.png" alt="6PM 여행도감 앱 스크린샷" className="w-full h-auto rounded-xl" />
                </div>
              </div>
            </div>

            <div className="lg:col-span-3 order-2 lg:order-2">
              <div className="grid lg:grid-cols-2 gap-8 mb-8">
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border-l-8 border-blue-400 transform rotate-2 hover:rotate-0 transition-all duration-300">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-blue-100 p-3 rounded-full">
                      <Home className="w-8 h-8 text-blue-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800">홈 화면</h3>
                  </div>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    오늘 날짜/날씨 표시, 예정/완료 일정 관리, 랜덤 여행지 추천 기능으로 여행 계획을 한눈에 확인할 수
                    있습니다.
                  </p>
                </div>

                <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border-l-8 border-green-400 transform -rotate-1 hover:rotate-0 transition-all duration-300">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-green-100 p-3 rounded-full">
                      <Plane className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800">여행 일정 계획</h3>
                  </div>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    가고 싶은 지역과 여행 기간을 정한 뒤, 날짜별로 방문지를 검색해 추가하고, 지도를 통해 효율적인 일정을
                    계획할 수 있습니다.
                  </p>
                </div>
              </div>

              <div className="grid lg:grid-cols-2 gap-8 mb-8">
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border-l-8 border-purple-400 transform rotate-1 hover:rotate-0 transition-all duration-300">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-purple-100 p-3 rounded-full">
                      <Search className="w-8 h-8 text-purple-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800">여행지 리뷰</h3>
                  </div>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    검색, 북마크, 댓글 기능으로 자신의 리뷰 뿐만 아니라 다른 사용자가 작성한 다양한 여행 리뷰를 탐색하고
                    소통할 수 있습니다.
                  </p>
                </div>

                <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border-l-8 border-orange-400 transform -rotate-1 hover:rotate-0 transition-all duration-300">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-orange-100 p-3 rounded-full">
                      <SquarePen className="w-8 h-8 text-orange-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800">기록하기</h3>
                  </div>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    여행 일정을 기반으로 완료된 여행에 대해 장소 정보, 제목, 내용, 사진, 태그, 별점을 추가하여 생생한
                    기록을 작성할 수 있습니다.
                  </p>
                </div>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border-l-8 border-pink-400 transform rotate-1 hover:rotate-0 transition-all duration-300">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-pink-100 p-3 rounded-full">
                      <Map className="w-8 h-8 text-pink-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800">나만의 여행 지도</h3>
                  </div>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    대한민국 지도에 다녀온 지역을 클릭하여 여행 사진을 업로드하고, 완성된 커스텀 지도를 다운로드 할 수
                    있습니다.
                  </p>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Download className="w-4 h-4" />
                    <span>지도 다운로드 기능 제공</span>
                  </div>
                </div>

                <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border-l-8 border-yellow-400 transform rotate-2 hover:rotate-0 transition-all duration-300">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-yellow-100 p-3 rounded-full">
                      <UserRound className="w-8 h-8 text-yellow-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800">마이페이지</h3>
                  </div>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    작성한 글의 조회수와 좋아요 수 확인, 북마크한 글과 작성한 리뷰 관리, 전체 여행 일정을 한눈에 볼 수
                    있습니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 bg-gradient-to-r from-blue-50 to-slate-5 mt-24 mb-32">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-black text-black mb-8 relative">프로젝트 팀원 소개</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "박선영",
                role: "팀장 / PM",
                feature: "무엇을담당했는지",
                description:
                  "단순한 여행 기록이 아니라, 사람들의 추억을 담는 플랫폼을 만든다는 생각으로 임했습니다. 카테고리 분류부터 리뷰 흐름, 지도 연동까지 생각보다 많은 고민이 필요했어요. 기획부터 개발까지, 협업의 힘을 깊이 느낄 수 있었던 프로젝트였습니다.",
                profileImage: "images/user1.png",
                githubUrl: "https://github.com/seonyoungg",
              },
              {
                name: "문서인",
                role: "PL",
                feature: "무엇을담당했는지",
                description:
                  "단순한 여행 기록이 아니라, 사람들의 추억을 담는 플랫폼을 만든다는 생각으로 임했습니다. 카테고리 분류부터 리뷰 흐름, 지도 연동까지 생각보다 많은 고민이 필요했어요. 기획부터 개발까지, 협업의 힘을 깊이 느낄 수 있었던 프로젝트였습니다.",
                profileImage: "images/user3.png",
                githubUrl: "https://github.com/SeOinm",
              },
              {
                name: "송아현",
                role: "UI/UX",
                feature: "무엇을담당했는지",
                description:
                  "단순한 여행 기록이 아니라, 사람들의 추억을 담는 플랫폼을 만든다는 생각으로 임했습니다. 카테고리 분류부터 리뷰 흐름, 지도 연동까지 생각보다 많은 고민이 필요했어요. 기획부터 개발까지, 협업의 힘을 깊이 느낄 수 있었던 프로젝트였습니다.",
                profileImage: "images/user2.png",
                githubUrl: "https://github.com/ineahe",
              },
              {
                name: "차형주",
                role: "Doc",
                feature: "무엇을담당했는지",
                description:
                  "단순한 여행 기록이 아니라, 사람들의 추억을 담는 플랫폼을 만든다는 생각으로 임했습니다. 카테고리 분류부터 리뷰 흐름, 지도 연동까지 생각보다 많은 고민이 필요했어요. 기획부터 개발까지, 협업의 힘을 깊이 느낄 수 있었던 프로젝트였습니다.",
                profileImage: "images/user5.png",
                githubUrl: "https://github.com/HyungJuCha",
              },
            ].map((member, index) => (
              <div key={index} className="group">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-300 border-t-4 border-blue-400">
                  <div className="relative">
                    <div className="w-full h-56 overflow-hidden">
                      <img
                        src={member.profileImage || "/placeholder.svg"}
                        alt={`${member.name} 프로필`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <a
                      href={member.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute top-4 right-4 bg-black bg-opacity-70 hover:bg-opacity-90 text-white p-2 rounded-full transition-all duration-300 transform hover:scale-110"
                    >
                      <Github size={20} />
                    </a>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{member.name}</h3>
                    <p className="text-blue-600 font-semibold mb-1">{member.role}</p>
                    <p className="text-sm text-blue-500 mb-4 font-medium">{member.feature}</p>
                    <p className="text-sm text-gray-600 leading-relaxed">{member.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-white border-t-4 border-blue-400 py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-600">
            © 2025 멋쟁이사자처럼 프론트엔드 부트캠프 13기
            <br /> Final Project 6팀 6PM
          </p>
        </div>
      </footer>
    </div>
  );
}

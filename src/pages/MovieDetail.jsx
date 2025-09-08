import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";

const baseUrl = "https://image.tmdb.org/t/p/w500";

export default function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const ACCESS_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;

  const navigate = useNavigate();
  const location = useLocation(); // 검색에서 넘어온 상태 데이터 확인

  useEffect(() => {
    // 1️⃣ 검색에서 넘어온 state가 있으면 먼저 보여주기
    if (location.state?.movie) {
      setMovie(location.state.movie);
    }

    // 2️⃣ 상세 정보 API 호출 (runtime, budget, revenue 등)
    const fetchMovieDetail = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?language=ko-KR`,
          {
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${ACCESS_TOKEN}`,
            },
          }
        );
        const data = await response.json();
        setMovie(data); // 상세 정보로 업데이트
      } catch (error) {
        console.error("영화 상세 데이터 가져오는 중 오류:", error);
      }
    };

    fetchMovieDetail();
  }, [id, ACCESS_TOKEN, location.state]);

  if (!movie)
    return <p className="text-white p-4">영화 정보를 불러오는 중...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* 3️⃣ 뒤로가기 버튼: 이전 검색 페이지로 이동 */}
      <button
        className="mb-4 px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
        onClick={() => {
          if (location.key !== "default") navigate(-1);
          else navigate("/"); // 직접 접근 시 홈으로
        }}
      >
        뒤로가기
      </button>

      {/* 영화 배경 및 제목 */}
      <div className="relative w-full h-96 overflow-hidden rounded-lg">
        <img
          className="w-full h-full object-cover filter brightness-50"
          src={`${baseUrl}${movie.backdrop_path || movie.poster_path}`}
          alt={movie.title}
        />
        <h1 className="absolute bottom-4 left-4 text-3xl font-bold text-white">
          {movie.title}
        </h1>
      </div>

      {/* 상세 정보 */}
      <div className="bg-gray-900 rounded-lg p-6 mt-6 text-gray-200">
        <p className="text-yellow-400 mb-2">⭐ {movie.vote_average}</p>
        <p className="mb-2">
          장르: {movie.genres?.map((g) => g.name).join(", ") || "정보 없음"}
        </p>
        <p className="mb-4">{movie.overview || "줄거리 정보 없음"}</p>
        <div className="grid grid-cols-2 gap-4 text-gray-300">
          <div>개봉일: {movie.release_date || "정보 없음"}</div>
          <div>상영 시간: {movie.runtime || "정보 없음"}분</div>
          <div>제작 예산: ${movie.budget?.toLocaleString() || "정보 없음"}</div>
          <div>수익: ${movie.revenue?.toLocaleString() || "정보 없음"}</div>
        </div>
      </div>
    </div>
  );
}


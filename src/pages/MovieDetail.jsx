import React from "react";
import { useParams } from "react-router-dom";
import movieListData from "../data/movieListData.json";

const baseUrl = "https://image.tmdb.org/t/p/w500";

export default function MovieDetail() {
  const { id } = useParams();

  const movies = movieListData.results || movieListData;
  const movie = movies.find((m) => m.id === Number(id));

  if (!movie) return <p className="text-white p-4">영화를 찾을 수 없습니다.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
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

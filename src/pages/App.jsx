import React, { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";

export default function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        let allMovies = [];
        let page = 1;
        const maxMovies = 20; // 화면에 표시할 최대 영화 수

        while (allMovies.length < maxMovies) {
          const response = await fetch(
            `https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=${page}`,
            {
              headers: {
                accept: "application/json",
                Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
              },
            }
          );

          const data = await response.json();
          const filtered = (data.results || []).filter(movie => {
            if (movie.adult) return false;
            const forbiddenWords = ["엄마", "아빠", "18+", "Adult"]; // 필터링 단어
            for (let word of forbiddenWords) {
              if (movie.title.includes(word)) return false;
            }
            return true;
          });

          allMovies = allMovies.concat(filtered);
          page++;
          if (page > 5) break; // 안전 장치: 최대 5페이지
        }

        setMovies(allMovies.slice(0, maxMovies)); // 최대 영화 수 맞춤
        console.log("영화 데이터:", allMovies.slice(0, maxMovies)); // 디버깅용
      } catch (error) {
        console.error("영화 데이터를 불러오는 중 오류 발생:", error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-white mb-6">상영중 영화</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {Array.isArray(movies) &&
          movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
      </div>
    </div>
  );
}

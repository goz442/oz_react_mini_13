import React, { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import { useOutletContext } from "react-router-dom";

export default function App() {
  const { searchQuery } = useOutletContext();
  const [movies, setMovies] = useState([]);

  const fetchMovies = async (term = "") => {
    try {
      let allMovies = [];
      let page = 1;
      const maxMovies = 20;

      while (allMovies.length < maxMovies) {
        const url = term
          ? `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
              term
            )}&language=ko-KR&page=${page}`
          : `https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=${page}`;

        const response = await fetch(url, {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
          },
        });

        const data = await response.json();
        const filtered = (data.results || []).filter((movie) => {
          if (movie.adult) return false;
          const forbiddenWords = ["엄마", "아빠", "18+", "Adult"];
          return !forbiddenWords.some((word) => movie.title.includes(word));
        });

        allMovies = allMovies.concat(filtered);
        page++;
        if (page > 5) break;
      }

      setMovies(allMovies.slice(0, maxMovies));
    } catch (error) {
      console.error("영화 데이터를 불러오는 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    fetchMovies(searchQuery);
  }, [searchQuery]);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-white">상영중 영화</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

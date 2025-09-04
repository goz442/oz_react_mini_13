import React, { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import movieListData from "../data/movieListData.json";

export default function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // movieListData.results 배열을 상태에 넣기
    setMovies(movieListData.results || []);
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

import React from "react";
import { Link } from "react-router-dom";

const baseUrl = "https://image.tmdb.org/t/p/w500";

export default function MovieCard({ movie }) {
  return (
    <Link
      to={`/details/${movie.id}`}
      state={{ movie }} // 검색 데이터 전달
    >
      <div className="relative overflow-hidden rounded-lg shadow-lg group cursor-pointer">
        <img
          className="w-full h-72 object-cover transition-transform duration-300 group-hover:scale-110"
          src={`${baseUrl}${movie.poster_path}`}
          alt={movie.title}
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
          <h2 className="text-white font-bold text-lg">{movie.title}</h2>
          <p className="text-yellow-400 mt-1">⭐ {movie.vote_average}</p>
        </div>
      </div>
    </Link>
  );
}

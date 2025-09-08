import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function NavBar({ onSearch, onReset }) {
  const [term, setTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(term);
  };

  return (
    <nav className="bg-gray-900 p-4 text-white flex flex-col sm:flex-row items-center justify-between">
      <Link
        to="/"
        className="text-xl font-bold mb-2 sm:mb-0"
        onClick={onReset}
      >
        OP 무비
      </Link>

      <form onSubmit={handleSubmit} className="flex w-full sm:w-auto">
        <input
          type="text"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="영화 검색..."
          className="p-2 rounded text-black w-full sm:w-64"
        />
        <button
          type="submit"
          className="ml-2 px-4 py-2 bg-yellow-500 text-black rounded"
        >
          검색
        </button>
      </form>
    </nav>
  );
}

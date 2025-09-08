import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NavBar({ onSearch, onReset }) {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleKeyPress = (e) => {
    if (e.key === "Enter") onSearch(input);
  };

  const handleClick = () => onSearch(input);

  const handleLogoClick = () => {
    setInput("");
    onReset();        // 검색 초기화
    navigate("/");    // ✅ 홈("/")으로 이동
  };

  return (
    <nav className="bg-gray-900 p-4 flex items-center justify-between">
      <div
        className="text-xl font-bold cursor-pointer"
        onClick={handleLogoClick}
      >
        OP 무비
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="영화 검색..."
          className="rounded px-2 py-1 text-black"
        />
        <button
          onClick={handleClick}
          className="bg-yellow-500 px-3 py-1 rounded font-bold"
        >
          검색
        </button>
      </div>
    </nav>
  );
}

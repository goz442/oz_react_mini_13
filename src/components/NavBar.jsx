import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useSupabaseAuth } from "../supabase";
import { UserContext } from "../context/UserContext";

export default function NavBar({ onSearch, onReset }) {
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const { user: supabaseUser, logout } = useSupabaseAuth();
  const { user, setUser } = useContext(UserContext);

  const handleLogoClick = () => {
    setInput("");
    onReset();
    navigate("/");
  };

  const handleLogout = async () => {
    await logout();
    setUser(null);
    navigate("/");
  };

  const handleSearch = () => {
    onSearch(input);
    navigate("/");
  };

  return (
    <nav className="bg-gray-900 p-4 flex items-center justify-between">
      <div className="text-xl font-bold cursor-pointer" onClick={handleLogoClick}>
        OP 무비
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onSearch(input);
            }
          }}
          placeholder="영화 검색..."
          className="rounded px-2 py-1 text-black"
        />

        <button onClick={() => onSearch(input)} className="bg-yellow-500 px-3 py-1 rounded font-bold">
          검색
        </button>

        {user ? (
          <>
            <img
              src={user.profileImageUrl || "default-avatar.png"}
              alt="프로필"
              className="w-8 h-8 rounded-full ml-2"
            />
            <span className="text-white ml-1">{user.userName}</span>
            <button onClick={handleLogout} className="ml-2 px-3 py-1 bg-red-500 rounded text-white">
              로그아웃
            </button>
          </>
        ) : (
          <>
            <button onClick={() => navigate("/login")} className="ml-2 px-3 py-1 bg-green-500 rounded text-white">
              로그인
            </button>
            <button onClick={() => navigate("/signup")} className="ml-2 px-3 py-1 bg-blue-500 rounded text-white">
              회원가입
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

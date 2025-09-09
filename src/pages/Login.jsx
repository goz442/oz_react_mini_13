import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSupabaseAuth } from "../supabase";
import { UserContext } from "../context/UserContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useSupabaseAuth();
  const { setUser } = useContext(UserContext);

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const { user: loggedInUser } = await login({ email: form.email, password: form.password });
      setUser(loggedInUser); // Context와 LocalStorage 업데이트
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="w-full max-w-md p-6 bg-gray-800 rounded-lg shadow-lg">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 text-gray-400 hover:text-white"
        >
          &larr; 뒤로
        </button>
        <h1 className="text-3xl font-bold mb-6 text-white text-center">로그인</h1>

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            name="email"
            placeholder="이메일"
            value={form.email}
            onChange={handleChange}
            required
            className="px-3 py-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <input
            type="password"
            name="password"
            placeholder="비밀번호"
            value={form.password}
            onChange={handleChange}
            required
            className="px-3 py-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <button
            type="submit"
            className="w-full bg-green-500 text-gray-900 font-bold py-2 rounded hover:bg-green-600 transition-colors"
          >
            로그인
          </button>
        </form>

        <p className="mt-4 text-center text-gray-300">
          계정이 없나요?{" "}
          <Link to="/signup" className="text-yellow-400 font-bold hover:underline">
            회원가입
          </Link>
        </p>
      </div>
    </div>
  );
}

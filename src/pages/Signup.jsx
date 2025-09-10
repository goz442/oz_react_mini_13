import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSupabaseAuth } from "../supabase";

export default function Signup() {
  const navigate = useNavigate();
  const { signUp } = useSupabaseAuth();

  const [form, setForm] = useState({
    userName: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.passwordConfirm) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      await signUp({
        email: form.email,
        password: form.password,
        userName: form.userName,
      });
      navigate("/"); // 회원가입 후 홈 이동
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="w-full max-w-md p-6 bg-gray-800 rounded-lg shadow-lg">
        {/* 뒤로가기 버튼 */}
        <button onClick={() => navigate(-1)} className="mb-4 text-gray-400 hover:text-white">
          &larr; 뒤로
        </button>

        <h1 className="text-3xl font-bold mb-6 text-white text-center">회원가입</h1>

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="userName"
            placeholder="이름"
            value={form.userName}
            onChange={handleChange}
            required
            className="px-3 py-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
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
          <input
            type="password"
            name="passwordConfirm"
            placeholder="비밀번호 확인"
            value={form.passwordConfirm}
            onChange={handleChange}
            required
            className="px-3 py-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-gray-900 font-bold py-2 rounded hover:bg-blue-600 transition-colors"
          >
            회원가입
          </button>
        </form>

        <p className="mt-4 text-center text-gray-300">
          이미 계정이 있나요?{" "}
          <Link to="/login" className="text-yellow-400 font-bold hover:underline">
            로그인
          </Link>
        </p>
      </div>
    </div>
  );
}

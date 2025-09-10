import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

export default function Layout() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (term) => setSearchQuery(term);
  const handleReset = () => setSearchQuery("");

  return (
    <div className="min-h-screen bg-gray-800 text-white">
      <NavBar onSearch={handleSearch} onReset={handleReset} />
      <Outlet context={{ searchQuery }} />
    </div>
  );
}

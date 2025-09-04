import React from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav className="bg-gray-900 p-4 text-white">
      <Link to="/" className="text-xl font-bold">
        OP 무비
      </Link>
    </nav>
  );
}

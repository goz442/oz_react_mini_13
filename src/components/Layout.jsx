import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

export default function Layout() {
  return (
    <>
      <NavBar />
      <div className="bg-gray-800 min-h-screen">
        <Outlet />
      </div>
    </>
  );
}

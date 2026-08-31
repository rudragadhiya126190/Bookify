import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { AuthModal } from "./AuthModal";

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <nav className="flex items-center justify-between bg-white px-8 py-4 border-b">
        <span className="text-xl font-bold text-indigo-600">📚 Bookify</span>
        <div>
          {user ? (
            <div className="flex items-center space-x-4">
              <span className="text-sm">Hello, <b>{user.name}</b></span>
              <button onClick={logout} className="border px-4 py-1.5 text-sm rounded hover:bg-gray-50">Log Out</button>
            </div>
          ) : (
            <button onClick={() => setIsModalOpen(true)} className="bg-indigo-600 text-white px-4 py-2 rounded text-sm">
              Sign In / Register
            </button>
          )}
        </div>
      </nav>
      <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};
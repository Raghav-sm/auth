"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function ProfilePage({ params }:any) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logged out successfully");
      router.push("/login");
    } catch (error: any) {
      console.error("Logout failed:", error);
      toast.error("Failed to logout");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl shadow-xl text-center">
        <h1 className="text-3xl font-bold text-white mb-4">Profile</h1>
        <hr className="border-white/20 mb-6" />
        <p className="text-gray-300 text-lg mb-6">
          This profile belongs to{" "}
          <span className="text-white font-semibold">{params.id}</span>
        </p>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-xl transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

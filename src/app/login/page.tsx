"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    setButtonDisabled(!(user.email && user.password));
  }, [user]);

  const loginHandler = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);

      if (response.data.success) {
        toast.success(response.data.message || "Login successful");
        router.push(`/profile/${response.data.user.username}`);

      } else {
        toast.error(response.data.message || "Login failed");
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl shadow-xl">
        <h1 className="text-3xl font-bold text-white text-center mb-6">
          Login
        </h1>

        <div className="space-y-5">
          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="bg-gray-800 text-white border border-gray-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="text-sm text-gray-300 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="bg-gray-800 text-white border border-gray-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </div>

          <button
            onClick={loginHandler}
            disabled={buttonDisabled || loading}
            className="w-full py-2 px-4 bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-md transition duration-300 disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="text-sm text-center text-gray-400 mt-4">
            Don't have an account?{" "}
            <Link href="/Signup" className="text-violet-400 hover:underline">
              Signup
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

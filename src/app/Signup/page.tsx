"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";


export default function Signup() {
  const router = useRouter();
  const [loading,setLoading] = useState(false);
  const [user, setUser] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      toast.success(response.data.message || "Signup successful");
      router.push("/login");
    } catch (error: any) {
      console.error("Signup Error:", error);
      const message =
        error?.response?.data?.message ||
        "Something went wrong. Please try again.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    const allFieldsFilled = user.email && user.username && user.password;
    setButtonDisabled(!allFieldsFilled);
  }, [user]);


  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl shadow-xl">
        <h1 className="text-3xl font-bold text-white text-center mb-6">
          Sign Up
        </h1>

        <div className="space-y-5">
          <div className="flex flex-col">
            <label htmlFor="username" className="text-sm text-gray-300 mb-1">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="bg-gray-800 text-white border border-gray-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
            />
          </div>

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
            onClick={onSignup}
            disabled={buttonDisabled || loading}
            className={`w-full py-2 px-4 font-semibold rounded-md transition duration-300 ${
              buttonDisabled || loading
                ? "bg-gray-600 cursor-not-allowed text-white/60"
                : "bg-violet-600 hover:bg-violet-700 text-white"
            }`}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>

          <p className="text-sm text-center text-gray-400 mt-4">
            Already have an account?{" "}
            <Link href="/login" className="text-violet-400 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

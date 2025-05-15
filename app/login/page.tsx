"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "sameer" && password === "sameer@123") {
      localStorage.setItem("loggedIn", "true");
      router.push("/");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-lg shadow-2xl w-full max-w-lg"
      >
        <div className="flex justify-center mb-8">
          <img src="/image.png" alt="Logo" className="h-20" />
        </div>
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
          Hotel Booking Login
        </h2>
        {error && (
          <p className="mb-6 text-red-600 font-medium text-center">{error}</p>
        )}
        <label className="block mb-4">
          <span className="block text-sm font-medium text-gray-700">Username</span>
          <input
            type="text"
            className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoComplete="username"
          />
        </label>

        <label className="block mb-6">
          <span className="block text-sm font-medium text-gray-700">Password</span>
          <input
            type="password"
            className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
        </label>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 rounded-md font-semibold hover:bg-indigo-700 transition duration-300"
        >
          Login
        </button>
      </form>
    </div>
  );
}
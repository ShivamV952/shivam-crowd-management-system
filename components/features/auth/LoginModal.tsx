"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function LoginModal() {
  const [showPassword, setShowPassword] = useState(false);
  const [loginId, setLoginId] = useState("Parking_solutions");
  const [password, setPassword] = useState("password");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically validate credentials with your backend
    // For now, we'll just redirect to dashboard
    router.push("/dashboard");
  };

  return (
    <form onSubmit={handleLogin}>
      <div className="w-90 rounded-xl bg-white overflow-hidden">
        {/* Header */}
        <div className="bg-linear-to-r from-teal-900 to-teal-700 px-6 py-5 flex items-center justify-center">
          <Image
            src="/kloudspot-logo.png"
            alt="Kloudspot Logo"
            width={140}
            height={32}
            priority
          />
        </div>

        {/* Body */}
        <div className="px-6 py-6 space-y-5">
          {/* Login ID */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Log In <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={loginId}
              onChange={(e) => setLoginId(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-md border border-gray-300 px-4 py-3 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          {/* Login Button */}
          <button 
            type="submit"
            className="w-full rounded-lg bg-teal-600 py-3 text-white font-medium text-lg hover:bg-teal-700 transition"
          >
            Login
          </button>
        </div>
      </div>
    </form>
  );
}


"use client";

import axios, { AxiosError } from "axios";

import Image from "next/image";
import { LoginRequest } from "@/types/contracts";
import { login } from "@/services/api/auth.service";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginModal() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const credentials: LoginRequest = {
        email,
        password,
      };

      const response = await login(credentials);

      // Store token in localStorage (you may want to use a more secure storage method)
      if (response.token) {
        localStorage.setItem("authToken", response.token);
      }

      // Redirect to dashboard on success
      router.push("/dashboard");
    } catch (err) {
      // Handle axios errors
      if (axios.isAxiosError(err)) {
        const axiosError = err as AxiosError<{ message?: string }>;
        const errorMessage =
          axiosError.response?.data?.message ||
          axiosError.message ||
          "Login failed. Please try again.";
        setError(errorMessage);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
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
          {/* Error Message */}
          {error && (
            <div className="rounded-md bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-800">
              {error}
            </div>
          )}

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Enter your email"
              required
              disabled={isLoading}
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
                placeholder="Enter your password"
                required
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                <Image
                  src="/eye.png"
                  alt={showPassword ? "Hide password" : "Show password"}
                  width={20}
                  height={20}
                  className={showPassword ? "opacity-50" : "opacity-100"}
                />
              </button>
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg bg-teal-600 py-3 text-white font-medium text-lg hover:bg-teal-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </div>
      </div>
    </form>
  );
}
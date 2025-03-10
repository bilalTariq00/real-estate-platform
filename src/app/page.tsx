"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Loader from "@/components/Loader"; // ✅ Ensure this component exists

export default function HomePage() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/map"); // ✅ Redirect signed-in users to /map
    }
  }, [status, router]);

  if (status === "loading") {
    return <Loader />; // ✅ Show loader while checking authentication
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center bg-gradient-to-r from-purple-300 to-purple-800">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-purple-100">
        Welcome to Real Estate Platform
      </h1>
      <p className="text-base sm:text-lg md:text-xl text-white max-w-md">
        Sign in to explore available properties and find your dream home.
      </p>
    </div>
  );
}

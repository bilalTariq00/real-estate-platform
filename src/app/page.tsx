"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
  const { status } = useSession();
  const router = useRouter();

  // Redirect logged-in users to "/map"
  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/map");
    }
  }, [status, router]);

  if (status === "loading") return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-300 to-purple-800 text-white">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Sign In to Access the Map</h1>
        <p className="text-lg">You need to sign in to browse real estate listings.</p>
      </div>
    </div>
  );
}

"use client"; // ✅ Ensure this page only runs in the browser

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import dynamic from "next/dynamic";
import Loader from "@/components/Loader"; // ✅ Ensure this is a simple client component

// ✅ Dynamically import `MapComponent` to prevent SSR issues
const MapComponent = dynamic(() => import("@/components/Map"), { 
  ssr: false, 
  loading: () => <Loader /> // ✅ Show Loader while loading Map
});

export default function MapPage() {
  const { status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/"); // 🚀 Redirect if not logged in
    } else if (status === "authenticated") {
      setLoading(false); // ✅ Ensure only authenticated users see the map
    }
  }, [status, router]);

  if (status === "loading" || loading) {
    return <Loader />; // ✅ Show Loader while checking authentication
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-300 to-purple-800">
      <h1 className="text-3xl font-bold mb-4 text-purple-100">Real Estate Map</h1>
      <p className="text-lg text-white">Explore available properties on the map.</p>
      <div className="w-full h-[500px] mt-6">
        <Suspense fallback={<Loader />}>
          <MapComponent />
        </Suspense>
      </div>
    </div>
  );
}

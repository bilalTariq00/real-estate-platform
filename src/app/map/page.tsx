"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import MapComponent from "@/components/Map";
import Loader from "@/components/Loader"; // Ensure you have a Loader component

export default function MapPage() {
  const {  status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/"); // Redirect if not logged in
    } else if (status === "authenticated") {
      setLoading(false); // Show content only when authenticated
    }
  }, [status, router]);

  if (status === "loading" || loading) {
    return <Loader />; // Show loader while checking authentication
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-300 to-purple-800">
      <h1 className="text-3xl font-bold mb-4 text-purple-100">Real Estate Map</h1>
      <p className="text-lg text-white">Explore available properties on the map.</p>
      <div className="w-full h-[500px] mt-6">
        <MapComponent />
      </div>
    </div>
  );
}

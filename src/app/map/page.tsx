"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import dynamic from "next/dynamic";
import Loader from "@/components/Loader";

const MapComponent = dynamic(() => import("@/components/Map"), { ssr: false });

export default function MapPage() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/"); 
    }
  }, [status, router]);

  if (status === "loading") {
    return <Loader />; 
  }

  if (status === "unauthenticated") {
    return null; 
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

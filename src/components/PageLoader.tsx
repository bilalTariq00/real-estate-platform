"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";

const Loader = dynamic(() => import("@/components/Loader"), { ssr: false });

export default function PageLoader({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1000); // Simulate loading delay
    return () => clearTimeout(timer);
  }, [pathname]);

  return <>{loading ? <Loader /> : children}</>;
}

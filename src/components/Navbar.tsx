"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";

export default function Navbar() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  // ✅ Show toast when user lands on specific pages
  useEffect(() => {
    if (pathname === "/map" && session) {
      toast.success("Signed in successfully!"); // 🎉 When reaching /map, show sign-in toast
    } else if (pathname === "/" && !session) {
      toast.success("Signed out successfully!"); // ✅ When reaching /, show sign-out toast
    }
  }, [pathname, session]); // ✅ Depend on `pathname` and `session` state

  const handleSignIn = async () => {
    setLoading(true);
    try {
      await signIn("google");
      router.push("/map"); // ✅ Redirect user to /map after sign-in
    } catch {
      toast.error("Sign in failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    setLoading(true);
    try {
      await signOut();
      router.replace("/"); // ✅ Redirect user to / after sign-out
    } catch {
      toast.error("Sign out failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex justify-between items-center px-6 py-4 bg-gradient-to-r from-[#A36DBF] to-[#44257A] text-white shadow-lg"
    >
      {/* Logo */}
      <h1 className="text-xl md:text-2xl font-bold tracking-wide">
        Real Estate Platform
      </h1>

      {/* Authentication Buttons */}
      <div>
        {status === "loading" ? (
          <span className="text-gray-300 text-sm md:text-base">Loading...</span>
        ) : session ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSignOut}
            className="bg-[#723B80] hover:bg-[#44257A] px-4 py-2 rounded-md transition text-sm md:text-base flex items-center justify-center gap-2"
          >
            {loading ? (
              <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span>
            ) : (
              "Sign Out"
            )}
          </motion.button>
        ) : (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSignIn}
            className="bg-[#723B80] hover:bg-[#44257A] px-4 py-2 rounded-md transition text-sm md:text-base flex items-center justify-center gap-2"
            disabled={loading}
          >
            {loading ? (
              <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span>
            ) : (
              "Sign In with Google"
            )}
          </motion.button>
        )}
      </div>
    </motion.nav>
  );
}

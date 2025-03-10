"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { Session } from "next-auth"; // ✅ Import the Session type
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";

export default function Navbar() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [prevSession, setPrevSession] = useState<Session | null>(null); // ✅ Properly typed session tracking

  // ✅ Show toast AFTER authentication state updates
  useEffect(() => {
    if (prevSession === undefined) return; // Skip first render

    if (!prevSession && session) {
      toast.success("Signed in successfully!"); // 🎉 Trigger when user logs in
    } else if (prevSession && !session) {
      toast.success("Signed out successfully!"); // ✅ Show toast when user logs out
    }
    
    setPrevSession(session); // ✅ Update previous session state
  }, [session]); // ✅ Depend on `session` to track changes

  const handleSignIn = async () => {
    setLoading(true);
    try {
      await signIn("google");
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
      router.replace("/"); // ✅ Redirect to home AFTER sign-out
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

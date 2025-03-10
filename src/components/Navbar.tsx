"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function Navbar() {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
  setLoading(true);
  try {
    await signIn("google");
    toast.success("Signed in successfully!");
  } catch (error) {
    console.error("Sign-in error:", error); // ✅ Log the error
    toast.error("Sign in failed. Try again.");
  } finally {
    setLoading(false);
  }
};

const handleSignOut = async () => {
  setLoading(true);
  try {
    await signOut();
    toast.success("Signed out successfully.");
  } catch (error) {
    console.error("Sign-out error:", error); // ✅ Log the error
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
      <Link href="/" className="text-2xl font-bold tracking-wide">
        Real Estate Platform
      </Link>

      {/* Authentication Buttons */}
      <div>
        {status === "loading" ? (
          <span className="text-gray-300">Loading...</span>
        ) : session ? (
          <div className="flex items-center gap-4">
            <span className="text-lg font-medium">{session.user?.name}</span>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSignOut}
              className="bg-[#723B80] hover:bg-[#44257A] px-5 py-2 rounded-md transition flex items-center justify-center gap-2"
            >
              {loading ? (
                <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span>
              ) : (
                "Sign Out"
              )}
            </motion.button>
          </div>
        ) : (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSignIn}
            className="bg-[#723B80] hover:bg-[#44257A] px-5 py-2 rounded-md transition flex items-center justify-center gap-2"
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

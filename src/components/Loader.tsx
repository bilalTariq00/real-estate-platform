"use client";
import dynamic from "next/dynamic";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

import { motion } from "framer-motion";
import handTapping from '../../public/handTapping.json'

export default function Loader() {
  if (typeof window === "undefined") return null; // ✅ Prevent SSR issues
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <motion.div
        transition={{
          duration: 0.6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="flex flex-col items-center"
      >
        <Lottie animationData={handTapping} loop={true} style={{ width: 200 }} />
      </motion.div>
    </div>
  );
}

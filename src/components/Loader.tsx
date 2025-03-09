"use client";

import { motion } from "framer-motion";
import Lottie from "lottie-react";
import handTapping from '../../public/handTapping.json'

export default function Loader() {
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
        {/* Replace with your own finger image or SVG */}
        <Lottie animationData={handTapping} loop={true} style={{ width: 200 }} />
      </motion.div>
    </div>
  );
}

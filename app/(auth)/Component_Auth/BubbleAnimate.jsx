"use client";
import React from "react";
import { motion } from "framer-motion";

export default function BubbleAnimate() {
  return (
    <>
      <motion.div
        initial={{ y: "-100%", rotate: 0 }}
        animate={{ y: "100vh", rotate: 360 }}
        transition={{
          duration: 15,
          stiffness: 100,
          ease: "easeInOut",
          repeat: Infinity,
        }}
        exit={{ scale: 0, rotate: 0 }}
        className=" absolute left-11 w-[134px] h-[134px] opacity-30 bg-sky-400 rounded-[20px]"
      ></motion.div>
      <motion.div
        initial={{ y: -150, rotate: 0 }}
        animate={{ y: "100vh", rotate: 360 }}
        transition={{
          duration: 16,
          stiffness: 100,
          delay: 5,
          ease: "easeInOut",
          repeat: Infinity,
        }}
        exit={{ scale: 0, rotate: 0 }}
        className=" absolute left-8 w-[104px] h-[104px] opacity-30 bg-sky-400 rounded-[20px]"
      ></motion.div>
      <motion.div
        initial={{ y: -150, rotate: 0 }}
        animate={{ y: "100vh", rotate: 360 }}
        transition={{
          duration: 17,
          stiffness: 100,
          delay: 3,
          ease: "easeInOut",
          repeat: Infinity,
        }}
        exit={{ scale: 0, rotate: 0 }}
        className=" absolute right-11 w-[134px] h-[134px] opacity-30 bg-sky-400 rounded-[20px]"
      ></motion.div>
      <motion.div
        initial={{ y: -150, rotate: 0 }}
        animate={{ y: "100vh", rotate: 360 }}
        transition={{
          duration: 18,
          stiffness: 100,
          delay: 4,
          ease: "easeInOut",
          repeat: Infinity,
        }}
        exit={{ scale: 0, rotate: 0 }}
        className=" absolute left-2/4 w-[134px] h-[134px] opacity-30 bg-sky-400 rounded-[20px]"
      ></motion.div>
      <motion.div
        initial={{ y: -150, rotate: 0 }}
        animate={{ y: "100vh", rotate: 360 }}
        transition={{
          duration: 19,
          stiffness: 100,
          delay: 2,
          ease: "easeInOut",
          repeat: Infinity,
        }}
        exit={{ scale: 0, rotate: 0 }}
        className=" absolute right-1/4 w-[80px] h-[80px]  opacity-30 bg-sky-400 rounded-full"
      ></motion.div>
      <motion.div
        initial={{ y: -150, rotate: 0 }}
        animate={{ y: "100vh", rotate: 360 }}
        transition={{
          duration: 17,
          stiffness: 100,
          delay: 3,
          ease: "easeInOut",
          repeat: Infinity,
        }}
        exit={{ scale: 0, rotate: 0 }}
        className=" absolute left-1/4 w-[80px] h-[80px]  opacity-30 bg-sky-400 rounded-full"
      ></motion.div>
    </>
  );
}

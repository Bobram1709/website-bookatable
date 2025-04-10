"use client";
// import Image from "next/image";
// import coffeeShop from "/public/home/coffeeshop.png";
import HeroSearchBar from "../HeroSearchBar/HeroSearchBar";
import { motion } from "framer-motion";
import "./Hero.css";
// import Tilt from "react-parallax-tilt";

// motion variants
const pathVariants = {
  initial: {
    pathLength: 0,
    opacity: 0,
  },
  animate: {
    pathLength: 1,
    opacity: 1,
    transition: {
      delay: 0.5,
      duration: 1.7,
      ease: "easeInOut",
    },
  },
};

const leftDivVariants = {
  initial: {
    opacity: 0,
    y: -20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeInOut",
      when: "beforeChildren",
      staggerChildren: 0.3,
    },
  },
};

export default function Hero() {
  return (
    <section className="relative flex h-[70vh] items-center justify-center lg:h-[90vh]">
      {/* ----------------- Hero section bg video ------------------ */}
      <video
        autoPlay
        loop
        muted={true}
        className="absolute inset-0 -z-10 h-full w-[100%] object-fill"
      >
        <source src="/videos/Top Banner Video Optimized.mp4" />
      </video>

      {/* Bg Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, ease: "easeInOut" }}
        className="hero-bg-overlay"
      ></motion.div>

      {/* ----------------- Hero section content --------------------- */}
      <div className="flex flex-col gap-x-16 pt-20 lg:container sm:px-10 lg:flex-row lg:px-0 lg:pt-0">
        {/* left */}
        <motion.div
          className="space-y-8 px-8 lg:w-[55%] xl:w-[50%]"
          variants={leftDivVariants}
          initial="initial"
          animate="animate"
        >
          <motion.h1
            variants={leftDivVariants}
            className="text-3xl font-bold leading-[35px] text-primary-white md:text-4xl md:leading-[45px] xl:text-5xl xl:leading-[58px]"
          >
            Create unforgettable memories with personalized{" "}
            <span className="text-primary-secondary-3">booking!</span>
          </motion.h1>
          <motion.p
            variants={leftDivVariants}
            className="font-kumbh-sans text-xl font-light text-primary-white-light md:text-2xl lg:text-2xl"
          >
            Choose your perfect table location or view.
          </motion.p>

          {/* -------------- Search Bar -------------- */}
          <motion.div variants={leftDivVariants}>
            <HeroSearchBar />
          </motion.div>
        </motion.div>

        {/* right */}
        {/* <motion.div
          className="hidden lg:block lg:w-[45%] xl:w-[50%]"
          initial={{ x: "12vw", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 1.7, ease: "easeInOut" }}
        >
          <Tilt tiltReverse={true}>
            <Image
              src={coffeeShop}
              alt="coffee shop"
              className="mx-auto w-[95%] opacity-85"
            />
          </Tilt>
        </motion.div> */}
      </div>
    </section>
  );
}

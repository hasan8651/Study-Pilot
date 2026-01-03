import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  FaReact,
  FaApple,
  FaAndroid,
  FaFigma,
  FaMicrosoft,
  FaHtml5,
  FaPython,
} from "react-icons/fa";
import { SiTailwindcss } from "react-icons/si";
import { Link } from "react-router";

const slides = [
  {
    title: "Responsive Basics",
    desc: "Learn the viewport meta tag, fluid media, and mobile-first layout patterns.",
  },
  {
    title: "Performance Essentials",
    desc: "Optimize images, preconnect fonts, and keep the DOM lean.",
  },
  {
    title: "Utility-First Speed",
    desc: "Compose UIs quickly using utilities without leaving your markup.",
  },
  {
    title: "Modern JS",
    desc: "ES modules, async/await, destructuring, and spread syntax.",
  },
  {
    title: "Data & APIs",
    desc: "Work with arrays/objects, promises, and fetch or axios.",
  },
  {
    title: "Routing & Data",
    desc: "Navigate with React Router and handle API data cleanly.",
  },
  {
    title: "Storage & Hosting",
    desc: "Upload files and deploy globally on CDN-backed hosting.",
  },
  {
    title: "APIs with Express",
    desc: "Build RESTful endpoints and compose middleware cleanly.",
  },
];

const floatVariants = {
  float: {
    y: [0, -15, 0],
    rotate: [0, 5, -5, 0],
    scale: [1, 1.05, 0.95, 1],
    transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
  },
};

const slideVariants = {
  enter: (direction) => ({ x: direction > 0 ? 40 : -40, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction) => ({ x: direction < 0 ? 40 : -40, opacity: 0 }),
};

const descVariants = {
  initial: { y: 12, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: -8, opacity: 0 },
};

export default function Slider() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();

  const next = () => {
    setDirection(1);
    setIndex((i) => (i + 1) % slides.length);
  };

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, 4500);
    return () => clearInterval(id);
  }, [paused, index]);

  return (
    <div className="relative flex flex-col items-center justify-center py-24 overflow-hidden">
      <motion.div
        className="absolute text-sky-500 text-7xl top-12 left-12"
        variants={floatVariants}
        animate="float"
      >
        <FaReact />
      </motion.div>
      <motion.div
        className="absolute text-5xl top-20 right-20"
        variants={floatVariants}
        animate="float"
        transition={{ delay: 0.3 }}
      >
        <FaApple />
      </motion.div>
      <motion.div
        className="absolute text-green-500 text-5xl bottom-16 right-24"
        variants={floatVariants}
        animate="float"
        transition={{ delay: 0.6 }}
      >
        <FaAndroid />
      </motion.div>
      <motion.div
        className="absolute text-blue-600 text-5xl bottom-24 left-24"
        variants={floatVariants}
        animate="float"
        transition={{ delay: 0.9 }}
      >
        <SiTailwindcss />
      </motion.div>
      <motion.div
        className="absolute text-pink-500 text-4xl top-24 left-1/2 transform -translate-x-1/2"
        variants={floatVariants}
        animate="float"
        transition={{ delay: 1.2 }}
      >
        <FaFigma />
      </motion.div>
      <motion.div
        className="absolute text-orange-600 text-5xl top-10 right-1/3"
        variants={floatVariants}
        animate="float"
        transition={{ delay: 1.5 }}
      >
        <FaHtml5 />
      </motion.div>
      <motion.div
        className="absolute text-yellow-500 text-5xl bottom-10 left-1/3"
        variants={floatVariants}
        animate="float"
        transition={{ delay: 1.8 }}
      >
        <FaPython />
      </motion.div>
      <motion.div
        className="absolute text-blue-500 text-4xl top-1/3 right-1/4"
        variants={floatVariants}
        animate="float"
        transition={{ delay: 2.1 }}
      >
        <FaMicrosoft />
      </motion.div>

      <div
        className="text-center px-6 max-w-2xl z-10"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={index}
            custom={direction}
            variants={slideVariants}
            initial={reduce ? { opacity: 0 } : "enter"}
            animate="center"
            exit={reduce ? { opacity: 0 } : "exit"}
            transition={{ duration: reduce ? 0.25 : 0.55, ease: "easeOut" }}
          >
            <h2 className="heading-hero mb-4">
              {slides[index].title}
            </h2>
            <motion.p
              variants={descVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.45, delay: 0.1 }}
              className="text-base-content/70 text-lg"
            >
              {slides[index].desc}
            </motion.p>
          </motion.div>
        </AnimatePresence>

        <motion.div
          className="mt-8 flex justify-center"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
        >
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
            <Link to="/courses" className="btn btn-gradient btn-wide">
              Explore More
            </Link>
          </motion.div>
        </motion.div>

        <div className="mt-6 flex items-center justify-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2.5 w-2.5 rounded-full transition-all ${
                i === index
                  ? "bg-primary w-6"
                  : "bg-base-content/20 hover:bg-base-content/40"
              }`}
              onClick={() => {
                setDirection(i > index ? 1 : -1);
                setIndex(i);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

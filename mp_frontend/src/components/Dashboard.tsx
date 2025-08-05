import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mic,
  PlayCircle,
  HelpCircle,
  BookOpen,
  Info,
  XCircle,
  Sun,
  Moon,
} from "lucide-react";
import { Card, CardContent } from "../components/ui/card";

export default function Dashboard() {
  const [isDark, setIsDark] = useState(() =>
    localStorage.getItem("theme") === "dark"
  );

  // Handle toggle & persist
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  const features = [
    { icon: <PlayCircle className="w-6 h-6" />, label: "Start Test", link: "/start-test" },
    { icon: <Mic className="w-6 h-6" />, label: "Practice", link: "/practice-test" },
    { icon: <BookOpen className="w-6 h-6" />, label: "Tips", link: "/tips" },
    { icon: <HelpCircle className="w-6 h-6" />, label: "Help", link: "/helppage" },
    { icon: <Info className="w-6 h-6" />, label: "About", link: "/aboutpage" },
    { icon: <XCircle className="w-6 h-6" />, label: "Exit", link: "/" },
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-zinc-900 text-zinc-100' : 'bg-gradient-to-br from-sky-100 via-white to-rose-100 text-zinc-800'}`}>
      
      {/* Toggle button */}
      <div className="flex justify-end p-4">
        <motion.button
          onClick={toggleTheme}
          className="flex items-center gap-2 px-4 py-2 rounded-full shadow-md bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-600"
          whileTap={{ rotate: 90, scale: 0.9 }}
          whileHover={{ scale: 1.05 }}
        >
          <AnimatePresence mode="wait">
            {isDark ? (
              <motion.span
                key="moon"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.3 }}
              >
                <Moon className="w-5 h-5 text-yellow-400" />
              </motion.span>
            ) : (
              <motion.span
                key="sun"
                initial={{ opacity: 0, rotate: 90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: -90 }}
                transition={{ duration: 0.3 }}
              >
                <Sun className="w-5 h-5 text-orange-500" />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Header */}
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl font-bold text-center mb-8"
      >
        Nepali Stutter Detection And Therapy System
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl text-purple-500 font-bold text-center mb-8"
      >
        Dashboard
      </motion.p>

      {/* Feature Cards */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-5xl mx-auto px-4"
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.1
            }
          },
        }}
      >
        {features.map((item, i) => {
          const content = (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 }
              }}
            >
              <Card className="rounded-2xl bg-white dark:bg-zinc-800 shadow-xl hover:shadow-2xl transition duration-300">
                <CardContent className="p-6 flex flex-col items-center justify-center gap-4">
                  <div className="text-fuchsia-600 dark:text-sky-400">{item.icon}</div>
                  <p className="text-xl font-semibold">{item.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          );

          return item.link ? (
            <Link key={i} to={item.link}>
              {content}
            </Link>
          ) : (
            content
          );
        })}
      </motion.div>

      {/* Footer */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-10 text-center text-sm text-zinc-500 dark:text-zinc-400"
      >
        Empowering fluent communication in Nepali — real-time feedback and adaptive testing built-in.
      </motion.p>
    </div>
  );
}

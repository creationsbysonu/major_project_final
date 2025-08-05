// src/pages/TipsPage.tsx

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Sun, Moon } from "lucide-react";
import { Link } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

export default function TipsPage() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <div className="min-h-screen bg-background text-foreground px-4 py-8 md:px-20 transition-colors duration-500">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <Link to="/" className="inline-flex items-center space-x-2">
          <Button variant="ghost" className="bg-gray-300 hover:bg-gray-400 transition text-black">
            <ArrowLeft className="mr-2" />
            <span>Back to Home</span>
          </Button>
        </Link>
        <Link to="/dashboard" className="inline-flex items-center space-x-2">
          <Button variant="ghost" className="bg-gray-300 hover:bg-gray-400 transition text-black">
            <ArrowLeft className="mr-2" />
            <span>Dashboard</span>
          </Button>
        </Link>

        <Button
          variant="outline"
          className="w-12 h-12 rounded-full bg-muted flex items-center justify-center shadow"
          onClick={() => setIsDark(!isDark)}
        >
          <AnimatePresence mode="wait" initial={false}>
            {isDark ? (
              <motion.span
                key="sun"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <Sun className="text-yellow-500" />
              </motion.span>
            ) : (
              <motion.span
                key="moon"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <Moon className="text-purple-600" />
              </motion.span>
            )}
          </AnimatePresence>
        </Button>
      </div>

      {/* Page Header */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold mb-6 text-center"
      >
        🌟 Tips to Improve Fluency
      </motion.h1>

      {/* Tips Cards */}
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        <Card className="bg-muted">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-2">🗣️ Read Aloud Daily</h2>
            <p>
              Practice reading Nepali paragraphs daily. It helps you get used to speech rhythm and builds muscle memory.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-muted">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-2">🧘‍♂️ Stay Relaxed</h2>
            <p>
              Anxiety can trigger stuttering. Breathe deeply and stay calm during speaking. Relaxation helps fluency.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-muted">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-2">⏱️ Speak Slowly</h2>
            <p>
              Don’t rush. Use pauses. Speaking slowly gives your brain and muscles more time to coordinate clearly.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-muted">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-2">🎧 Listen & Imitate</h2>
            <p>
              Listen to fluent Nepali speakers and try imitating their pace and tone. It strengthens auditory feedback.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-muted">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-2">📈 Track Your Progress</h2>
            <p>
              Use the system regularly and monitor the fluency percentage. Consistency leads to improvement.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-muted">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-2">🤝 Practice with Friends</h2>
            <p>
              Talk to supportive friends or family. Real conversations reduce fear and improve real-world speaking.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Closing Note */}
      <div className="text-center mt-16">
        <p className="mb-2">✨ Every voice matters. Take one step at a time.</p>
        <Button asChild>
          <Link to="/start-test">Try a Test Now</Link>
        </Button>
      </div>
    </div>
  );
}

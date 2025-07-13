import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Moon, Sun } from "lucide-react";
import { Link } from "react-router-dom";

export default function HelpPage() {
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
      {/* Header with Back and Theme Toggle */}
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
        Help & Support
      </motion.h1>

      {/* Intro Section */}
      <motion.div
        className="mb-10 text-lg leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <p className="mb-4">
          Need help using the Nepali Stutter Detection System? This page provides step-by-step guidance, FAQs, and
          contact details to support your experience.
        </p>
      </motion.div>

      {/* Help Cards */}
      <div className="grid md:grid-cols-2 gap-6 mb-10">
        <Card className="bg-muted h-auto">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-2">🔊 How to Start a Test?</h2>
            <p>
              Go to <strong>Start Test</strong>, allow microphone access, and begin reading the displayed paragraph aloud. Your
              speech will be analyzed in real time.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-muted h-auto">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-2">🎯 Understanding the Result</h2>
            <p>
              The screen color changes: <span className="text-green-600 font-medium">green</span> for fluent,
              <span className="text-red-600 font-medium"> red</span> for stutter. At the end, a fluency percentage and a
              difficulty recommendation are shown.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-muted h-auto">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-2">📷 Why Do I See Graph Placeholders?</h2>
            <p>
              The About page displays training visualizations (like accuracy/loss graphs, spectrograms). Replace the
              placeholder cards with your actual images for better insights.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-muted h-auto">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-2">⚠️ Microphone Not Working?</h2>
            <p>
              Make sure your browser allows mic access. Refresh the page and allow microphone when prompted. Also ensure
              no other app is blocking your mic.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Contact Section */}
      <div className="text-center mt-16">
        <p className="mb-2">❓ Still stuck? We'd love to help you out.</p>
        <Button asChild>
          <a href="mailto:your@email.com">Contact Support</a>
        </Button>
      </div>
    </div>
  );
}

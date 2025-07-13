import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Moon, Sun } from "lucide-react";
import { Link } from "react-router-dom";

export default function AboutPage() {
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
        <Link to="/dashboard">
          <Button variant="ghost" className="bg-gray-300 hover:bg-gray-400 transition text-black">
            <ArrowLeft className="mr-2" />
            <span>Dashboard</span>
          </Button>
        </Link>

        {/* Day/Night Toggle Button */}
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

      {/* Rest of your content (unchanged) */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold mb-6 text-center"
      >
        About Nepali Stutter Detection System
      </motion.h1>

      <motion.div
        className="mb-10 text-lg leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <p className="mb-4">
          This project aims to provide a <strong>real-time stutter detection system</strong> for Nepali language
          speakers. Trained on over <strong>4,000+ Nepali speech samples</strong> (equally balanced between fluent and
          stuttered speech), our <strong>CNN model</strong> analyzes 1.5-second audio chunks and predicts fluency in real-time
          using <strong>Mel Spectrograms</strong>.
        </p>
        <p>
          The model delivers top-tier performance, as seen in our accuracy and loss charts, and is highly generalizable
          across different speakers, accents, and environments.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6 mb-10">
        <Card className="h-64 bg-muted flex items-center justify-center">
          <CardContent className="text-center">Upload: Accuracy vs Epoch Graph</CardContent>
        </Card>
        <Card className="h-64 bg-muted flex items-center justify-center">
          <CardContent className="text-center">Upload: Loss vs Epoch Graph</CardContent>
        </Card>
        <Card className="h-64 bg-muted flex items-center justify-center">
          <CardContent className="text-center">Upload: Mel Spectrogram Sample</CardContent>
        </Card>
        <Card className="h-64 bg-muted flex items-center justify-center">
          <CardContent className="text-center">Upload: Dataset Split Chart</CardContent>
        </Card>
      </div>

      <motion.div
        className="mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-2xl font-semibold mb-4">Why This Project Matters</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Helps speech therapists monitor stuttering trends in Nepali speakers</li>
          <li>Useful for schools and educators during speech assessments</li>
          <li>Can be used by individuals for self-improvement and awareness</li>
          <li>Open-source model, ready to be integrated into apps and learning tools</li>
        </ul>
      </motion.div>

      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Technology Stack</h2>
        <ul className="list-disc list-inside space-y-2">
          <li><strong>Frontend:</strong> React.js, Tailwind CSS, Framer Motion, Shadcn UI</li>
          <li><strong>Backend:</strong> FastAPI for real-time prediction</li>
          <li><strong>ML:</strong> TensorFlow/Keras CNN trained on Mel spectrograms</li>
          <li><strong>Audio:</strong> Librosa, MediaRecorder, Web Audio API</li>
        </ul>
      </div>

      <div className="text-center mt-20">
        <p className="mb-2">💬 Want to contribute, collaborate, or give feedback?</p>
        <Button asChild>
          <a href="mailto:your@email.com">Contact Us</a>
        </Button>
      </div>
    </div>
  );
}

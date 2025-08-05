import { motion } from 'framer-motion';
import { Bot, MessageSquare, Sparkles } from 'lucide-react';

export default function ChatbotSection() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="mt-32 px-4 max-w-7xl mx-auto text-center py-20 rounded-3xl bg-gradient-to-r from-black to-blue-300 text-white shadow-2xl"
    >
      <Bot className="w-12 h-12 mx-auto mb-4 text-yellow-300" />x
      <h2 className="text-3xl md:text-4xl font-bold mb-4">Chat with Our Smart AI Assistant</h2>
      <p className="max-w-3xl mx-auto mb-8 text-lg">
        Get instant help finding products, personalized suggestions, or answers to any shopping questions. Our AI chatbot understands images, text, and your style — making your shopping smooth and fun!
      </p>
      <motion.a
        href="#chatbot"
        whileHover={{ scale: 1.05 }}
        className="inline-flex items-center gap-2 px-8 py-4 bg-white text-indigo-600 font-bold rounded-full shadow-lg hover:bg-gray-100 transition"
      >
        <MessageSquare className="w-5 h-5" />
        Start Chatting
      </motion.a>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
        <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl shadow hover:shadow-lg transition">
          <Sparkles className="w-6 h-6 text-yellow-300 mb-2" />
          <h3 className="text-xl font-semibold mb-2">Visual Shopping Help</h3>
          <p>Upload a product photo, and our AI can help you find similar items instantly.</p>
        </div>
        <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl shadow hover:shadow-lg transition">
          <Sparkles className="w-6 h-6 text-yellow-300 mb-2" />
          <h3 className="text-xl font-semibold mb-2">Instant Product Q&A</h3>
          <p>Ask about sizing, reviews, or material — get quick, accurate answers anytime.</p>
        </div>
        <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl shadow hover:shadow-lg transition">
          <Sparkles className="w-6 h-6 text-yellow-300 mb-2" />
          <h3 className="text-xl font-semibold mb-2">Personalized Style Advice</h3>
          <p>Our AI learns your preferences to suggest products that match your unique taste.</p>
        </div>
      </div>
    </motion.section>
  );
}

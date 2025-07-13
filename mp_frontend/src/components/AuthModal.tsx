import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock, Unlock } from 'lucide-react';

type AuthModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-4xl mx-4 overflow-hidden"
          >
            <div className="flex flex-col md:flex-row">
              {/* Left Side */}
              <div className="w-full md:w-1/2 p-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                    {isLogin ? 'Login to e-pasal' : 'Create Account'}
                  </h2>
                  <button onClick={onClose} className="text-gray-500 hover:text-primary">
                    <X size={24} />
                  </button>
                </div>

                <form className="space-y-4">
                  {!isLogin && (
                    <div>
                      <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                      <input type="text" className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary" />
                    </div>
                  )}

                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                    <input type="email" className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary" />
                  </div>

                  <div className="relative">
                    <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      className="w-full px-4 py-2 pr-10 rounded-lg bg-gray-100 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <motion.button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      whileTap={{ scale: 1.2, rotate: 180 }}
                      className="absolute top-9 right-3 text-gray-600 dark:text-gray-300 hover:text-primary transition"
                    >
                      {showPassword ? <Unlock size={20} /> : <Lock size={20} />}
                    </motion.button>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition"
                  >
                    {isLogin ? 'Login' : 'Sign Up'}
                  </button>
                </form>

                <div className="mt-4 text-sm text-center text-gray-600 dark:text-gray-400">
                  {isLogin ? (
                    <p>
                      Don't have an account?{' '}
                      <button
                        onClick={() => setIsLogin(false)}
                        className="text-primary font-medium hover:underline"
                      >
                        Sign up
                      </button>
                    </p>
                  ) : (
                    <p>
                      Already have an account?{' '}
                      <button
                        onClick={() => setIsLogin(true)}
                        className="text-primary font-medium hover:underline"
                      >
                        Login
                      </button>
                    </p>
                  )}
                </div>
              </div>

              {/* Right Side */}
              <div className="hidden md:flex w-full md:w-1/2 bg-gradient-to-br from-blue-500 to-orange-500 items-center justify-center p-8">
                <img
                  src="/ecommerce_logo.png"
                  alt="e-pasal logo"
                  className="max-w-xs w-full drop-shadow-xl rounded-xl"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Store, Menu, X, ShoppingCart, Sun, Moon, Camera, Search, Play, Pause, User
} from 'lucide-react';
import AuthModal from './AuthModal';
import CartModal from './CartModal';
import FeedbackModal from './FeedBackModal';
import { authAPI } from '@/api/services';
import { Link } from 'react-router-dom';
import { useCart } from '@/lib/CartContext';

const categories = ['Electronics', 'Fashion', 'Books', 'Home_Decor', 'Gadgets'];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains('dark'));
  const [isPlaying, setIsPlaying] = useState(false);
  const [searchMode, setSearchMode] = useState('text');
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [user, setUser] = useState<{ username: string } | null>(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { items } = useCart();

  useEffect(() => {
    const token = localStorage.getItem('access');
    if (token) {
      authAPI.getProfile()
        .then(res => setUser(res.data))
        .catch(() => setUser(null));
    } else {
      setUser(null);
    }
  }, [isAuthOpen]);

  const handleLogout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    setUser(null);
    window.location.reload();
  };

  const toggleTheme = () => {
    document.documentElement.classList.toggle('dark');
    const newTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    localStorage.theme = newTheme;
    setIsDark(newTheme === 'dark');
  };

  const togglePlay = () => setIsPlaying(!isPlaying);

  return (
    <>
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="sticky top-0 z-50 bg-white/30 dark:bg-black/30 backdrop-blur-lg shadow-md transition"
      >
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
          <a href="/" className="flex items-center gap-2 text-3xl font-bold tracking-tight text-black dark:text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
            <Store size={32} />e-pasal
          </a>

          <div className="flex items-center relative w-full max-w-lg">
            <input
              type={searchMode === 'text' ? 'text' : 'file'}
              accept={searchMode === 'image' ? 'image/*' : undefined}
              placeholder={searchMode === 'text' ? 'Search products...' : ''}
              className="w-full py-2 px-4 rounded-full bg-gray-100 dark:bg-accent focus:outline-none focus:ring-2 focus:ring-primary transition"
            />
            <div className="absolute right-2 flex items-center gap-2">
              <motion.button
                onClick={() => setSearchMode('text')}
                whileHover={{ scale: 1.05 }}
                className={`px-3 py-1 rounded-full text-sm transition ${searchMode === 'text' ? 'bg-gray-900 text-white shadow' : 'bg-gray-200 dark:bg-black text-gray-600 dark:text-white'}`}
              >
                Text
              </motion.button>
              <motion.button
                onClick={() => setSearchMode('image')}
                whileHover={{ scale: 1.05 }}
                className={`px-3 py-1 rounded-full text-sm flex items-center transition ${searchMode === 'image' ? 'bg-gray-900 text-white shadow' : 'bg-gray-200 dark:bg-black text-gray-600 dark:text-gray-300'}`}
              >
                <Camera size={16} className="mr-1" />
                Img
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                className="p-2 bg-primary text-white rounded-full shadow hover:bg-primary/90 transition"
              >
                <Search size={18} />
              </motion.button>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            <div
              className="relative"
              onMouseEnter={() => setIsCategoriesOpen(true)}
              onMouseLeave={() => setIsCategoriesOpen(false)}
            >
              <motion.button whileHover={{ scale: 1.05, y: -2 }} className="hover:text-primary transition">
                Categories
              </motion.button>
              <AnimatePresence>
                {isCategoriesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute flex flex-col mt-2 bg-white dark:bg-gray-900 shadow-xl rounded-xl p-2 min-w-[150px] z-50"
                  >
                    {categories.map((cat) => (
                      <motion.a
                        whileHover={{ scale: 1.05, x: 5 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                        key={cat}
                        href={`/category/${cat.toLowerCase()}`}
                        className="px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                      >
                        {cat}
                      </motion.a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
                onClick={() => setIsFeedbackOpen(true)}
                className="text-sm font-medium hover:underline text-gray-700 dark:text-gray-300"
              >
                Feedback
            </button>

            <motion.button
              onClick={() => setIsCartOpen(true)}
              whileHover={{ scale: 1.05, y: -2 }}
              className="relative hover:text-primary transition cursor-pointer"
            >
              <ShoppingCart size={20} />
              <span className="absolute -top-2 -right-2 text-[10px] bg-red-500 text-white rounded-full px-1.5">
                {items.length || 0}
              </span>
            </motion.button>

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowProfileMenu(v => !v)}
                  className="flex items-center gap-2 px-3 py-1 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-primary/20 dark:hover:bg-primary/30 transition"
                >
                  <span className="font-semibold text-gray-700 dark:text-gray-200">{user.username}</span>
                </button>
                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 bg-white dark:bg-gray-900 shadow-lg rounded-lg py-2 z-50 min-w-[120px]">
                    <Link to="/profile" className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800">Profile</Link>
                    <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 text-red-500" onClick={handleLogout}>Logout</button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-primary/20 dark:hover:bg-primary/30 transition flex items-center"
              >
                <User className="text-gray-700 dark:text-gray-300" size={20} />
              </Link>
            )}

            <motion.button onClick={togglePlay} whileTap={{ scale: 1.2, rotate: 180 }} className="p-4 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-primary/20 dark:hover:bg-primary/30 transition-all">
              <AnimatePresence initial={false} mode="wait">
                {isPlaying ? (
                  <motion.span key="pause" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}>
                    <Pause className="text-red-500" size={22} />
                  </motion.span>
                ) : (
                  <motion.span key="play" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}>
                    <Play className="text-green-500" size={22} />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            <motion.button onClick={toggleTheme} whileTap={{ scale: 1.2, rotate: 180 }} className="p-4 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-primary/20 dark:hover:bg-primary/30 transition">
              <AnimatePresence initial={false} mode="wait">
                {isDark ? (
                  <motion.span key="moon" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}>
                    <Moon className="text-blue-400" size={22} />
                  </motion.span>
                ) : (
                  <motion.span key="sun" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}>
                    <Sun className="text-yellow-500" size={22} />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>

          {/* Hamburger */}
          <div className="md:hidden ml-auto">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-800">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="md:hidden px-4 pb-5 pt-2 bg-white dark:bg-black space-y-3"
            >
              {categories.map((cat) => (
                <a key={cat} href={`/category/${cat.toLowerCase()}`} className="block text-gray-800 dark:text-gray-200 hover:text-primary transition">{cat}</a>
              ))}
              <a href="/feedback" className="block text-gray-800 dark:text-gray-200 hover:text-primary transition">Feedback</a>
              <div className="flex items-center gap-4 pt-3">
                <motion.button onClick={togglePlay} whileTap={{ scale: 1.2 }} className="p-4 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-primary/20 dark:hover:bg-primary/30 transition">
                  {isPlaying ? <Pause className="text-red-500" size={22} /> : <Play className="text-green-500" size={22} />}
                </motion.button>
                <motion.button onClick={toggleTheme} whileTap={{ scale: 1.2 }} className="p-4 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-primary/20 dark:hover:bg-primary/30 transition">
                  {isDark ? <Moon className="text-blue-400" size={22} /> : <Sun className="text-yellow-500" size={22} />}
                </motion.button>
                {user ? (
                  <div className="relative">
                    <button
                      onClick={() => setShowProfileMenu(v => !v)}
                      className="flex items-center gap-2 px-3 py-1 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-primary/20 dark:hover:bg-primary/30 transition"
                    >
                      <span className="font-semibold text-gray-700 dark:text-gray-200">{user.username}</span>
                    </button>
                    {showProfileMenu && (
                      <div className="absolute right-0 mt-2 bg-white dark:bg-gray-900 shadow-lg rounded-lg py-2 z-50 min-w-[120px]">
                        <Link to="/profile" className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800">Profile</Link>
                        <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 text-red-500" onClick={handleLogout}>Logout</button>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to="/login"
                    className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-primary/20 dark:hover:bg-primary/30 transition flex items-center"
                  >
                    <User className="text-gray-700 dark:text-gray-300" size={20} />
                  </Link>
                )}
                <button onClick={() => setIsCartOpen(true)} className="relative text-gray-800 dark:text-gray-100">
                  <ShoppingCart size={22} />
                  <span className="absolute -top-2 -right-2 text-[10px] bg-red-500 text-white rounded-full px-1.5">
                    {items.length || 0}
                  </span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <FeedbackModal isOpen={isFeedbackOpen} onClose={() => setIsFeedbackOpen(false)} />
    </>
  );
}
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { motion } from 'framer-motion';
import { Tag, Layers, Barcode, Sparkles, ChevronRight, ShoppingCart, Star, Zap } from 'lucide-react';

export default function SearchResults() {
  const location = useLocation();
  const results = location.state?.results || [];
  
  // Sort products by similarity in descending order
  const sortedResults = [...results].sort((a, b) => {
    const similarityA = typeof a.similarity === 'number' ? a.similarity : 0;
    const similarityB = typeof b.similarity === 'number' ? b.similarity : 0;
    return similarityB - similarityA;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f9fa] to-[#e9ecef] dark:bg-gradient-to-br dark:from-[#0a0a0a] dark:to-[#1e1e1e] transition-colors duration-500">
      <Navbar />

      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative max-w-7xl mx-auto py-16 px-4 sm:px-6"
      >
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
          <div className="absolute top-20 left-20 w-64 h-64 bg-purple-100 rounded-full filter blur-[100px] opacity-40 dark:bg-purple-900 dark:opacity-10"></div>
          <div className="absolute bottom-20 right-20 w-64 h-64 bg-blue-100 rounded-full filter blur-[100px] opacity-40 dark:bg-blue-900 dark:opacity-10"></div>
        </div>

        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center text-4xl md:text-6xl font-bold mb-12 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 dark:from-purple-400 dark:via-pink-500 dark:to-red-500"
        >
          Curated Collection
        </motion.h1>

        {sortedResults.length === 0 ? (
          <motion.div 
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <p className="text-xl mb-6 text-gray-600 dark:text-gray-400">No matching products found.</p>
            <button className="px-8 py-3 rounded-full text-white font-medium hover:shadow-lg transition-all hover:scale-105 bg-gradient-to-r from-purple-500 to-pink-500 hover:shadow-purple-400/30 dark:from-purple-600 dark:to-pink-600 dark:hover:shadow-purple-500/30">
              Explore More
            </button>
          </motion.div>
        ) : (
          <div className="relative">
            {/* Window frame container */}
            <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden p-1 transition-all duration-500 border border-gray-200/70 dark:bg-gray-900/50 dark:border-gray-800/50">
              {/* Grid background pattern */}
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48cGF0aCBkPSJNMTAgMHYyME0wIDEwaDIwIiBzdHJva2U9IiNlZWVlZWUiIHN0cm9rZS13aWR0aD0iMC41Ii8+PC9zdmc+')] opacity-20 dark:bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48cGF0aCBkPSJNMTAgMHYyME0wIDEwaDIwIiBzdHJva2U9IiMzMzMiIHN0cm9rZS13aWR0aD0iMC41Ii8+PC9zdmc+')] dark:opacity-10" />
              
              {/* Main content area with proper spacing */}
              <div className="relative min-h-[60vh] p-8">
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.15
                      }
                    }
                  }}
                >
                  {sortedResults.map((product, idx) => {
                    const similarityPercentage = typeof product.similarity === 'number' 
                      ? (product.similarity * 100).toFixed(2) 
                      : 'N/A';
                    
                    return (
                      <motion.div
                        key={product.id || idx}
                        variants={{
                          hidden: { opacity: 0, y: 50 },
                          visible: { 
                            opacity: 1, 
                            y: 0,
                            transition: { type: "spring", stiffness: 100 }
                          }
                        }}
                        whileHover={{
                          y: -10,
                          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04) dark:shadow-purple-500/20"
                        }}
                        className={`relative group ${idx % 2 === 0 ? 'lg:mt-0' : 'lg:mt-12'}`} // Zig-zag with margin instead of transform
                      >
                        {/* Product card */}
                        <div className={`h-full rounded-2xl overflow-hidden transition-all duration-300 group-hover:border-pink-500/30 ${getRandomGradient()} border border-gray-200/70 dark:border-gray-800/50`}>
                          <div className="relative h-60 overflow-hidden">
                            <img
                              src={product.image || product.image_path || '/placeholder.png'}
                              alt={product.name}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-white/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 dark:from-black/70">
                              <div className="flex items-center gap-3 w-full">
                                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-full text-sm font-medium hover:scale-105 transition-all transform translate-y-2 group-hover:translate-y-0 bg-pink-500 hover:bg-pink-600 text-white dark:bg-pink-600 dark:hover:bg-pink-700">
                                  <ShoppingCart size={16} />
                                  Add to Cart
                                </button>
                                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-full text-sm font-medium hover:scale-105 transition-all transform translate-y-2 group-hover:translate-y-0 bg-pink-500 hover:bg-pink-600 text-white dark:bg-pink-600 dark:hover:bg-pink-700">
                                  <Zap size={16} />
                                  Buy Now
                                </button>
                              </div>
                            </div>
                            {similarityPercentage !== 'N/A' && (
                              <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-white/90 text-amber-600 dark:bg-black/70 dark:text-amber-300">
                                <Star size={12} fill="currentColor" />
                                {similarityPercentage}% Match
                              </div>
                            )}
                          </div>

                          <div className="p-5">
                            <div className="flex justify-between items-start mb-2">
                              <h2 className="text-lg font-bold truncate text-gray-900 dark:text-violet-600">
                                {product.name}
                              </h2>
                              <span className="px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap bg-gradient-to-r from-purple-500/80 to-pink-500/80 text-white dark:from-purple-600/80 dark:to-pink-600/80">
                                Rs. {Number(product.price).toFixed(2)}
                              </span>
                            </div>

                            <p className="text-sm mb-4 line-clamp-2 text-gray-600 dark:text-gray-400">
                              {product.description || 'No description available.'}
                            </p>

                            <div className="grid grid-cols-2 gap-2 text-xs">
                              <div className="flex items-center gap-1 text-cyan-600 dark:text-cyan-400">
                                <Tag size={12} />
                                <span>Stock: {product.stock ?? 'N/A'}</span>
                              </div>
                              <div className="flex items-center gap-1 text-amber-600 dark:text-amber-400">
                                <Barcode size={12} />
                                <span>{product.sku}</span>
                              </div>
                              <div className="flex items-center gap-1 text-purple-600 dark:text-purple-400">
                                <Layers size={12} />
                                <span>{product.category_name || 'N/A'}</span>
                              </div>
                              <div className="flex items-center gap-1 text-pink-600 dark:text-pink-400">
                                <Sparkles size={12} />
                                <span>Match: {similarityPercentage}%</span>
                              </div>
                            </div>

                            <button className="mt-4 w-full flex items-center justify-center gap-2 py-2 text-xs font-medium rounded-lg transition-all border border-gray-300 hover:border-pink-500 group-hover:bg-gray-100 text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white dark:bg-gray-800/50 dark:border-gray-700 dark:hover:bg-gray-800">
                              Quick View <ChevronRight size={14} className="transition-transform group-hover:translate-x-1" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </div>
            </div>
          </div>
        )}
      </motion.section>

      <Footer />
    </div>
  );
}

// Combined gradient helper function
function getRandomGradient() {
  const lightGradients = [
    'bg-gradient-to-br from-gray-50 to-gray-100',
    'bg-gradient-to-br from-blue-50 to-blue-100',
    'bg-gradient-to-br from-purple-50 to-purple-100',
    'bg-gradient-to-br from-pink-50 to-pink-100',
    'bg-gradient-to-br from-amber-50 to-amber-100'
  ];
  
  const darkGradients = [
    'bg-gradient-to-br from-gray-900/80 to-gray-800/80',
    'bg-gradient-to-br from-gray-900/80 to-blue-900/80',
    'bg-gradient-to-br from-gray-900/80 to-purple-900/80',
    'bg-gradient-to-br from-gray-900/80 to-pink-900/80',
    'bg-gradient-to-br from-gray-900/80 to-amber-900/80'
  ];
  
  return `${lightGradients[Math.floor(Math.random() * lightGradients.length)]} dark:${darkGradients[Math.floor(Math.random() * darkGradients.length)]}`;
}
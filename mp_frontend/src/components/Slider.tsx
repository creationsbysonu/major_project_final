import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const highlightProducts = [
  {
    type: 'image',
    name: 'Ultra HD Smart TV',
    image: '/images/products/tv.jpg',
    price: '$799',
    tagline: 'Immersive viewing like never before'
  },
  {
    type: 'image',
    name: 'Wireless Earbuds Pro',
    image: '/images/products/earbuds.jpg',
    price: '$129',
    tagline: 'Freedom in every beat'
  },
  {
    type: 'video',
    name: 'Gaming Laptop Demo',
    image: '/videos/laptop-demo.mp4',
    price: '$1199',
    tagline: 'Power meets performance'
  },
  {
    type: 'image',
    name: 'Gaming Laptop Demo',
    image: '/videos/laptop-demo.mp4',
    price: '$1199',
  },
  {
    type: 'image',
    name: 'Gaming Laptop Demo',
    image: '/videos/laptop-demo.mp4',
    price: '$1199',
  }

];

export default function Slider() {
  const [current, setCurrent] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const sliderRef = useRef(null);

  useEffect(() => {
    if (!autoPlay) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % highlightProducts.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [autoPlay]);

  const prevSlide = () => setCurrent((prev) => (prev - 1 + highlightProducts.length) % highlightProducts.length);
  const nextSlide = () => setCurrent((prev) => (prev + 1) % highlightProducts.length);

  const startX = useRef(null);
  const handleTouchStart = (e:any) => (startX.current = e.touches[0].clientX);
  const handleTouchEnd = (e:any) => {
    if (startX.current === null) return;
    const endX = e.changedTouches[0].clientX;
    const deltaX = endX - startX.current;
    if (deltaX > 50) prevSlide();
    if (deltaX < -50) nextSlide();
    startX.current = null;
  };

  return (
    <div
      ref={sliderRef}
      className="relative w-screen h-80 overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="absolute top-1/2 left-4 z-10 -translate-y-1/2">
        <button onClick={prevSlide} className="p-2 rounded-full bg-white/80 dark:bg-gray-800 hover:bg-primary text-black dark:text-white">
          <ChevronLeft />
        </button>
      </div>
      <div className="absolute top-1/2 right-4 z-10 -translate-y-1/2">
        <button onClick={nextSlide} className="p-2 rounded-full bg-white/80 dark:bg-gray-800 hover:bg-primary text-black dark:text-white">
          <ChevronRight />
        </button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="w-full h-full bg-gradient-to-r from-black to-accent flex items-center justify-center"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center px-6 md:px-20 w-full h-full max-w-screen-xl">
            {highlightProducts[current].type === 'image' ? (
              <img
                src={highlightProducts[current].image}
                alt={highlightProducts[current].name}
                className="rounded-2xl shadow-xl w-full max-h-[70vh] object-cover mx-auto"
              />
            ) : (
              <video
                src={highlightProducts[current].image}
                className="rounded-2xl shadow-xl w-full max-h-[70vh] object-cover mx-auto"
                autoPlay
                muted
                loop
              />
            )}
            <div className="text-white text-center md:text-left px-4 md:px-0">
              <h3 className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight">
                {highlightProducts[current].name}
              </h3>
              <p className="text-lg md:text-xl mb-6 italic">
                {highlightProducts[current].tagline}
              </p>
              <span className="inline-block bg-white text-primary dark:text-black font-bold px-6 py-3 rounded-full shadow text-lg">
                {highlightProducts[current].price}
              </span>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Pagination Dots */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
        {highlightProducts.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === current ? 'bg-white shadow-lg scale-125' : 'bg-white/50'
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
}

import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { motion } from 'framer-motion';
import { Sparkles, Percent, Cpu } from 'lucide-react';

const electronicsSubcategories = [
  { name: 'Laptops', image: '/images/subcategories/laptop.jpg' },
  { name: 'Cameras', image: '/images/subcategories/camera.jpg' },
  { name: 'Wearables', image: '/images/subcategories/wearable.jpg' },
  { name: 'Smart Home', image: '/images/subcategories/smarthome.jpg' },
  { name: 'Gaming', image: '/images/subcategories/gaming.jpg' },
];

const electronicsProducts = [
  { name: 'Wireless Earbuds', image: '/images/products/earbuds.jpg', price: '$129' },
  { name: '4K Action Camera', image: '/images/products/action-camera.jpg', price: '$299' },
  { name: 'Gaming Mouse', image: '/images/products/gaming-mouse.jpg', price: '$79' },
  { name: 'Portable SSD', image: '/images/products/portable-ssd.jpg', price: '$199' },
];

const electronicsDeals = [
  { name: 'Gaming Headset', image: '/images/products/headset.jpg', oldPrice: '$149', newPrice: '$89', discount: '40%' },
  { name: 'Smart Home Hub', image: '/images/products/home-hub.jpg', oldPrice: '$99', newPrice: '$59', discount: '41%' },
  { name: 'Mechanical Keyboard', image: '/images/products/keyboard.jpg', oldPrice: '$129', newPrice: '$79', discount: '38%' },
  { name: 'USB-C Hub', image: '/images/products/usb-hub.jpg', oldPrice: '$49', newPrice: '$29', discount: '41%' },
];

export default function ElectronicsContent() {
  return (
    <>
    <Navbar/>
    <div className="pt-20">
      {/* Hero with Electronics Subcategories */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative bg-gradient-to-r from-gray-900 via-black to-gray-800 text-white py-24 px-4 rounded-3xl shadow-2xl mx-4 md:mx-20 overflow-hidden"
      >
        <h1 className="text-3xl md:text-5xl font-extrabold mb-8 text-center">
          Explore Electronics Categories
        </h1>
        <div className="flex gap-6 overflow-x-auto scrollbar-hide py-4 px-2 md:px-8">
          {electronicsSubcategories.map((sub) => (
            <motion.a
              key={sub.name}
              href={`/category/electronics/${sub.name.toLowerCase()}`}
              whileHover={{ scale: 1.1 }}
              className="relative min-w-[200px] h-48 rounded-2xl overflow-hidden shadow-lg cursor-pointer group flex-shrink-0"
            >
              <img
                src={sub.image}
                alt={sub.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/50 backdrop-blur-sm group-hover:bg-black/60 transition" />
              <h3 className="absolute bottom-4 left-4 text-lg font-semibold text-white z-10 drop-shadow-md">
                {sub.name}
              </h3>
            </motion.a>
          ))}
        </div>
      </motion.section>

      {/* Featured Electronics */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mt-24 px-4 max-w-7xl mx-auto"
      >
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Featured Electronics</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {electronicsProducts.map((prod) => (
            <motion.a
              key={prod.name}
              href={`/product/${prod.name.toLowerCase().replace(/ /g, '-')}`}
              whileHover={{ scale: 1.05 }}
              className="bg-gray-50 dark:bg-gray-900 rounded-3xl shadow-xl hover:shadow-2xl transition overflow-hidden"
            >
              <img
                src={prod.image}
                alt={prod.name}
                className="w-full h-52 object-cover"
              />
              <div className="p-5">
                <h4 className="font-bold text-gray-800 dark:text-gray-200 text-lg">{prod.name}</h4>
                <p className="text-primary font-bold text-base mt-1">{prod.price}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </motion.section>

      {/* Electronics Deals */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mt-24 px-4 max-w-7xl mx-auto"
      >
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">Exclusive Electronics Deals</h2>
          <motion.a
            href="#deals"
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-2 text-primary hover:underline"
          >
            <Percent className="w-4 h-4" />
            View All
          </motion.a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {electronicsDeals.map((item) => (
            <motion.a
              key={item.name}
              href={`/product/${item.name.toLowerCase().replace(/ /g, '-')}`}
              whileHover={{ scale: 1.05 }}
              className="relative bg-gray-50 dark:bg-gray-900 rounded-3xl shadow-xl hover:shadow-2xl transition overflow-hidden"
            >
              <img src={item.image} alt={item.name} className="w-full h-52 object-cover" />
              <div className="p-5">
                <h4 className="font-bold text-gray-800 dark:text-gray-200 text-lg">{item.name}</h4>
                <div className="flex items-center gap-3 text-sm mt-1">
                  <span className="line-through text-gray-500">{item.oldPrice}</span>
                  <span className="text-primary font-bold">{item.newPrice}</span>
                </div>
              </div>
              <span className="absolute top-3 right-3 bg-accent text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                {item.discount} OFF
              </span>
            </motion.a>
          ))}
        </div>
      </motion.section>

      {/* AI Suggestions */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mt-28 px-4 max-w-5xl mx-auto text-center"
      >
        <Sparkles className="mx-auto w-10 h-10 text-primary mb-5" />
        <h2 className="text-2xl md:text-3xl font-bold mb-5">AI-Powered Recommendations</h2>
        <p className="max-w-2xl mx-auto mb-10 text-gray-600 dark:text-gray-300">
          Our AI suggests electronics based on your preferences. Experience a curated shopping journey designed just for you.
        </p>
        <motion.a
          href="#personalized"
          whileHover={{ scale: 1.05 }}
          className="inline-flex items-center gap-2 px-7 py-4 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-full shadow hover:opacity-90 transition"
        >
          <Cpu className="w-5 h-5" />
          Discover Now
        </motion.a>
      </motion.section>
    </div>
    <Footer/>
    </>
  );
}

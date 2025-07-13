import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2 } from 'lucide-react';

type CartItem = {
  name: string;
  price: number;
  quantity: number;
  image: string;
};

type CartModalProps = {
  isOpen: boolean;
  onClose: () => void;
  cartItems?: CartItem[];
};

export default function CartModal({ isOpen, onClose, cartItems = [] }: CartModalProps) {
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm flex justify-end"
        >
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="w-full max-w-md h-full bg-white dark:bg-gray-900 shadow-xl p-6 overflow-y-auto relative"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold dark:text-white">Your Cart</h2>
              <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                <X size={22} />
              </button>
            </div>

            {cartItems.length === 0 ? (
              <p className="text-gray-600 dark:text-gray-300">Your cart is empty.</p>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item, index) => (
                  <div key={index} className="flex gap-4 items-center border-b pb-4">
                    <img src={item.image} alt={item.name} className="w-16 h-16 rounded object-cover" />
                    <div className="flex-1">
                      <h3 className="text-lg font-medium dark:text-white">{item.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Qty: {item.quantity}</p>
                      <p className="text-primary font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                    <button className="p-2 hover:text-red-500 transition">
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}

                <div className="border-t pt-4 flex justify-between items-center">
                  <span className="text-lg font-semibold dark:text-white">Total:</span>
                  <span className="text-xl font-bold text-primary">${total.toFixed(2)}</span>
                </div>

                <button className="w-full mt-4 bg-primary text-white py-3 rounded-xl font-semibold hover:bg-primary/90 transition shadow">
                  Checkout
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
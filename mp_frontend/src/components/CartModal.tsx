import { useCart } from '@/lib/CartContext';

interface CartItem {
  id: number;
  product: number;
  product_name: string;
  product_price: number;
  quantity: number;
  product_image?: string;
}

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartModal = ({ isOpen, onClose }: CartModalProps) => {
  const { items, total, updateCartItem, removeCartItem, clearCart } = useCart();
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8 w-full max-w-lg relative">
        <button className="absolute top-3 right-3 text-2xl font-bold text-gray-400 hover:text-red-500" onClick={onClose}>&times;</button>
        <h2 className="text-3xl font-bold mb-6 text-center">Your Cart</h2>
        {items.length === 0 ? (
          <div className="text-center text-gray-500">Your cart is empty.</div>
        ) : (
          <div className="space-y-4 mb-6 max-h-80 overflow-y-auto pr-2">
            {items.map(item => (
              <div key={item.id} className="flex items-center gap-4 bg-gray-50 dark:bg-gray-800 rounded-lg p-3 shadow-sm">
                {item.product_image && (
                  <img src={item.product_image} alt={item.product_name} className="w-16 h-16 object-cover rounded" />
                )}
                <div className="flex-1">
                  <div className="font-semibold text-gray-800 dark:text-gray-100">{item.product_name}</div>
                  <div className="text-primary font-bold">₹{item.product_price}</div>
                </div>
                <input
                  type="number"
                  min={1}
                  value={item.quantity}
                  onChange={e => updateCartItem(item.id, Number(e.target.value))}
                  className="w-14 px-2 py-1 border rounded text-center"
                />
                <button className="text-red-500 hover:underline ml-2" onClick={() => removeCartItem(item.id)}>Remove</button>
              </div>
            ))}
          </div>
        )}
        <div className="font-bold text-xl mb-4 text-right">Total: ₹{total}</div>
        <div className="flex justify-between">
          <button className="bg-red-500 text-white px-5 py-2 rounded hover:bg-red-600" onClick={clearCart}>Clear Cart</button>
          <button className="bg-primary text-white px-5 py-2 rounded hover:bg-primary/80" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default CartModal;
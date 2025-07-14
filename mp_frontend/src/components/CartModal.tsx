import { useEffect, useState } from 'react';
import { cartAPI } from '@/api/services';

interface CartItem {
  id: number;
  product: number;
  product_name: string;
  product_price: number;
  quantity: number;
}

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartModal = ({ isOpen, onClose }: CartModalProps) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);

  const fetchCart = async () => {
    setLoading(true);
    const res = await cartAPI.get();
    setItems(res.data.items || []);
    setLoading(false);
  };

  useEffect(() => {
    if (isOpen) fetchCart();
  }, [isOpen]);

  useEffect(() => {
    setTotal(items.reduce((sum, item) => sum + Number(item.product_price) * item.quantity, 0));
  }, [items]);

  const handleUpdate = async (itemId: number, quantity: number) => {
    await cartAPI.update(itemId, quantity);
    fetchCart();
  };

  const handleRemove = async (itemId: number) => {
    await cartAPI.remove(itemId);
    fetchCart();
  };

  const handleClear = async () => {
    await cartAPI.clear();
    fetchCart();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 w-full max-w-md relative">
        <button className="absolute top-2 right-2 text-xl" onClick={onClose}>&times;</button>
        <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
        {loading ? <div>Loading...</div> : (
          <>
            {items.length === 0 ? <div>Your cart is empty.</div> : (
              <ul className="mb-4">
                {items.map(item => (
                  <li key={item.id} className="flex items-center justify-between mb-2">
                    <span>{item.product_name} (₹{item.product_price})</span>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min={1}
                        value={item.quantity}
                        onChange={e => handleUpdate(item.id, Number(e.target.value))}
                        className="w-12 px-1 border rounded"
                      />
                      <button className="text-red-500" onClick={() => handleRemove(item.id)}>Remove</button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
            <div className="font-bold mb-2">Total: ₹{total}</div>
            <button className="bg-red-500 text-white px-4 py-2 rounded mr-2" onClick={handleClear}>Clear Cart</button>
            <button className="bg-primary text-white px-4 py-2 rounded" onClick={onClose}>Close</button>
          </>
        )}
      </div>
    </div>
  );
};

export default CartModal;
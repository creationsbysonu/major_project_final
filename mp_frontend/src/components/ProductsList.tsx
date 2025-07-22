import { useEffect, useState } from 'react';
import { productsAPI, cartAPI } from '@/api/services';
import { useCart } from '@/lib/CartContext';

interface Product {
  id: number;
  name: string;
  price: number;
  image?: string;
}

interface ProductsListProps {
  categoryId?: number;
}

const ProductsList = ({ categoryId }: ProductsListProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    if (categoryId) {
      productsAPI.getByCategory(categoryId).then(res => setProducts(res.data));
    } else {
      productsAPI.getAll().then(res => setProducts(res.data));
    }
  }, [categoryId]);

  const handleAddToCart = async (productId: number) => {
    try {
      await addToCart(productId, 1);
      setSuccessMsg('Added to cart!');
      setTimeout(() => setSuccessMsg(null), 1500);
    } catch {
      setSuccessMsg('Failed to add to cart');
      setTimeout(() => setSuccessMsg(null), 1500);
    }
  };

  return (
    <div className="my-6">
      <h2 className="text-2xl font-bold mb-4">Products</h2>
      {successMsg && <div className="mb-2 text-green-600">{successMsg}</div>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((prod) => (
          <div
            key={prod.id}
            className="bg-white dark:bg-gray-900 rounded-lg shadow hover:shadow-lg p-4 flex flex-col items-center transition hover:-translate-y-1 hover:bg-primary/10"
          >
            {prod.image && (
              <img src={prod.image} alt={prod.name} className="w-36 h-36 object-cover rounded mb-2" />
            )}
            <span className="font-semibold text-center text-gray-800 dark:text-gray-100 mb-1">{prod.name}</span>
            <span className="text-primary font-bold">₹{prod.price}</span>
            <button
              className="mt-2 px-3 py-1 bg-primary text-white rounded hover:bg-primary/80"
              onClick={() => handleAddToCart(prod.id)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsList; 
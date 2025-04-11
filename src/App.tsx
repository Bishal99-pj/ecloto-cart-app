import { useState, useEffect } from 'react'
import { CartItem, Product } from './types';
import ProductList from './components/ProductList';
import ShoppingCart from './components/ShoppingCart';
import ProgressBar from './components/ProgressBar';

// DATA
const PRODUCTS: Product[] = [
  { id: 1, name: "Laptop", price: 500 },
  { id: 2, name: "Smartphone", price: 300 },
  { id: 3, name: "Headphones", price: 100 },
  { id: 4, name: "Smartwatch", price: 150 },
];

const FREE_GIFT: Product = { id: 99, name: "Wireless Mouse", price: 0 };
const THRESHOLD = 1000;

function App() {
  // STATES
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showGiftMessage, setShowGiftMessage] = useState(false);
  const subTotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const progressForFreeGift = Math.min((subTotal / THRESHOLD) * 100, 100);

  // METHODS
  function addToCart(productId: Product["id"]) {
    const productAddedToCart = PRODUCTS.find(p => p.id === productId);
    if (!productAddedToCart) return;

    setCartItems((prevItems) => {
      const existingItem = prevItems.find(cartItem => cartItem.product.id === productId);

      if (existingItem) {
        return prevItems.map(item => item.product.id === productId ? { product: item.product, quantity: item.quantity + 1 } : item);
      }
      return [...prevItems, { product: productAddedToCart, quantity: 1 }];
    })
  }

  function updateItemQuantity(productId: Product["id"], change: number) {
    setCartItems((prevItems) => prevItems.map(item => {
      if (item.product.id === productId) {
        // Update quantity of existing item
        const newQuantity = Math.max(0, item.quantity + change);
        return { ...item, quantity: newQuantity }
      }
      return item
      // Make sure if quantity goes below zero the item is removed from the cart
    }).filter(item => item.quantity > 0)
    )
  }

  function removeItemFromCart(productId: Product["id"]) {
    setCartItems(prevItems => prevItems.filter(item => item.product.id !== productId));
  }

  useEffect(() => {
    function Abc(){
      const subTotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    return subTotal
    }
    const subTotal=Abc()
    const cartHasFreeGift = cartItems.some(item => item.product.id === FREE_GIFT.id);

    // Eligible: add free gift in cart (if not present already), show the congrats message,  
    if (subTotal >= THRESHOLD && !cartHasFreeGift) {
      setCartItems(prevItems => [...prevItems, { product: { ...FREE_GIFT }, quantity: 1 }])
      setShowGiftMessage(true);
      setTimeout(() => {
        setShowGiftMessage(false);
      }, 2000);
    }
    // NonEligible: Remove the free gift if cart total drops below threshold
    else if (subTotal < THRESHOLD && cartHasFreeGift) {
      setCartItems(prevItems => prevItems.filter(item => item.product.id !== FREE_GIFT.id))
    }
  }, [cartItems]);

  return (
    <main className='max-w-2xl mx-auto px-4 py-10'>
      <h1 className='text-4xl font-bold mb-8 text-center'>Shopping Cart App</h1>

      <div className="mb-6">
        <h2 className='text-2xl font-semibold mb-4'>Products</h2>
        <ProductList products={PRODUCTS} addToCart={addToCart} />
      </div>

      <div>
        <div className='flex justify-between items-center my-4'>
          <h2 className='text-2xl font-semibold'>Your Cart</h2>
          <div className="text-xl font-bold">Subtotal: ${subTotal.toFixed(2)}</div>
        </div>
        <ProgressBar progress={progressForFreeGift} subTotal={subTotal} threshold={THRESHOLD} />

        {showGiftMessage && (<p className='bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4'>Congratulations! A free gift has been added to your cart</p>)}

        <ShoppingCart items={cartItems} updateQuantity={updateItemQuantity} removeFromCart={removeItemFromCart} freeGiftProductId={FREE_GIFT.id} />

      </div>
    </main>
  )
}

export default App

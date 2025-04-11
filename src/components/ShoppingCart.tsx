/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef } from 'react';
import { CartItem, Product } from '../types'

type ShoppingCartProps = {
    items: CartItem[],
    updateQuantity: (productId: Product["id"], change: number) => any,
    removeFromCart: (productId: Product["id"]) => any,
    freeGiftProductId: number
}

const ShoppingCart = (props: ShoppingCartProps) => {
    const { items, updateQuantity, removeFromCart, freeGiftProductId } = props;

    const itemRefs = useRef<Map<number, HTMLDivElement>>(new Map());

    function handleRemoveFromCart(productIdToBeRemoved: Product["id"]) {
        const cardElRemoved = itemRefs.current.get(productIdToBeRemoved);
        if (!cardElRemoved) {
            removeFromCart(productIdToBeRemoved);
            return;
        }
        const removalAnimation = cardElRemoved.animate([
            {
                opacity: 1, transform: "scale(1)"
            },
            {
                opacity: 0, transform: "scale(0.95)"
            },
        ], {
            duration: 300,
            easing: "ease-out",
            fill: "forwards"
        })
        // Remove the cart item with fading out animation
        removalAnimation.onfinish = () => removeFromCart(productIdToBeRemoved);
    }

    if (!items.length) return <div className="text-center text-gray-700 border py-4 border-gray-300 rounded-md">Your Cart Is Empty!</div>
    return (
        <div className='space-y-4'>
            {items.map((item) => (
                <div key={item.product.id} className='flex items-center justify-between bg-white/70 rounded-md p-4 shadow'
                    ref={(el) => {
                        if (!el) return;
                        el.animate([
                            {
                                opacity: 0, transform: "scale(0.95)"
                            },
                            {
                                opacity: 1, transform: "scale(1)"
                            }
                        ], {
                            duration: 300,
                            easing: "ease-out",
                            fill: "forwards"
                        })
                        // For all animating cards
                        itemRefs.current.set(item.product.id, el);
                    }}
                >
                    <div className="flex flex-col space-y-2">
                        <div className="ml-4">
                            <h3 className='font-semibold'>{item.product.name}</h3>
                            {item.product.id === freeGiftProductId && <span className='text-green-600 text-sm'>(Free Gift)</span>}
                            {item.product.id !== freeGiftProductId && <p className='font-medium'>${item.product.price.toFixed(2)}</p>}
                        </div>
                    </div>

                    {/* Quantity Selector */}
                    {item.product.id !== freeGiftProductId &&
                        <div className='flex items-center space-x-3 text-center border p-2 rounded-md border-gray-200 w-fit'>
                            <button onClick={() => updateQuantity(item.product.id, -1)} className='text-2xl cursor-pointer leading-0'>-</button>
                            <span className='text-sm'>{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.product.id, 1)} className='text-2xl cursor-pointer leading-0'>+</button>
                        </div>}

                    {/* Remove Icon */}
                    {item.product.id !== freeGiftProductId &&
                        <button onClick={() => handleRemoveFromCart(item.product.id)} className='cursor-pointer'>🗑️</button>
                    }
                </div>
            ))}
        </div>
    )
}

export default ShoppingCart
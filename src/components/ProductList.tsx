/* eslint-disable @typescript-eslint/no-explicit-any */
import { Product } from '../types'

type ProductListProps = {
    products: Product[],
    addToCart: (id: Product["id"]) => any
}

const ProductList = (props: ProductListProps) => {
    const { products, addToCart } = props
    return (
        <div className='grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8'>
            {products.map((item) => (
                <div key={item.id} className='border bg-sky-100 border-gray-300 shadow rounded-md p-4 flex flex-col space-y-3'>
                    <h3 className='text-lg font-medium'>{item.name}</h3>
                    <p className='font-medium'>${item.price}</p>
                    <button className='add_to_cart_cta' onClick={() => addToCart(item.id)}>Add To Cart</button>
                </div>
            ))}
        </div>
    )
}

export default ProductList
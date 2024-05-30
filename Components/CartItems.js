import React, { useEffect, useState } from 'react'
import styles from '@/styles/CartItems.module.css'
import { useAtom } from 'jotai'
import { productsAtom } from '@/store'
import { cartAtom } from '@/store'
import Image from 'next/image'
import { removeFromCart, addToCart, getTotalCostAndItems} from '@/cartlogic'
import { useRouter } from 'next/router'

export default function CartItems() {
    const [allProducts, setAllProducts] = useAtom(productsAtom);
    const [totalCost, setTotalCost] = useState(0);
    const [cart,setCart] = useAtom(cartAtom)
    const router = useRouter()

    useEffect(() => {
        if (allProducts && allProducts.length > 0) {
            setTotalCost(getTotalCostAndItems(cart, allProducts)[0]);
        }
    }, [cart, allProducts]); 

    function checkOut(){
        router.push('/comingsoon')
    }

  return (
    <div className={styles.cartitems}>
        <div className={styles.cartitems_format_main}>
            <p>Products</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
        </div>
        <hr />
        {allProducts.map((e)=>{

            if(cart[e.id]>0)
            {
                return <div key={e.id} >
                <div className={`${styles.cartitems_format} ${styles.cartitems_format_main}`}>
                    <Image src={e.image} alt='' width={50} height={50} className={styles.carticon_product_icon} />
                    <p>{e.name}</p>
                    <p>${e.new_price}</p>
                    <button className={styles.cartitems_quantity}>{cart[e.id]}</button>
                    <p>${e.new_price*cart[e.id]}</p>
                    <div className={styles.cartitems_remove_icon}  style={{display:'flex', flexDirection:'column'}}>
                        <button onClick={()=>{addToCart(e.id, setCart)}} >+</button>
                        <button onClick={()=>{removeFromCart(e.id, setCart)}}>-</button>
                    </div>    
                </div>
                <hr />
            </div>
            }
            return null;
        })}
        <div className={styles.cartitems_down}>
            <div className={styles.cartitems_total}>
                <h1>Cart Totals</h1>
                <div>
                    <div className={styles.cartitems_total_item}>
                        <p>Subtotal</p>
                        <p>${totalCost}</p>
                    </div>
                    <hr />
                    <div className={styles.cartitems_total_item}>
                        <p>Shipping Fee</p>
                        <p>Free</p>
                    </div>
                    <hr />
                    <div className={styles.cartitems_total_item}>
                        <h3>Total</h3>
                        <h3>${totalCost}</h3>
                    </div>
                </div>
                <button onClick={checkOut}>PROCEED TO CHECKOUT</button>
            </div>
            <div className={styles.cartitems_promocode}>
                    <p>If you have a promo code, Enter it here</p>
                    <div className={styles.cartitems_promobox}>
                        <input type='text' placeholder='promo code' />
                        <button>Submit</button>
                    </div>
            </div>
        </div>
    </div>
  )
}

import React from 'react'
import {productsAtom} from '@/store'
import { useAtom } from 'jotai'
import { useRouter } from 'next/router';
import styles from '@/styles/product.module.css'
import Image from 'next/image';
import star_icon from '@/public/star_icon.png';
import star_dull_icon from '@/public/star_dull_icon.png';
import { DescriptionBox } from '@/Components/DescriptionBox';
import { addToCart } from '@/cartlogic';
import { cartAtom } from '@/store';

function Product() {
  const [allProduct] = useAtom(productsAtom);
  const [cart, setCart] = useAtom(cartAtom)
  const router = useRouter();
  const id = parseInt(router.query.id);

  const product = allProduct.find((product)=>(product.id  === id));

  if(!product){
    return "Item is not in the inventory.";
  }

  return (
    <>
    <div className={styles.productdisplay}>
      <div className={styles.productdisplay_left}>
        <div className={styles.productdisplay_img}>
          <Image className={styles.productdisplay_main_img}  width={200} height={200} src={product.image}/>
        </div>
      </div>
      <div className={styles.productdisplay_right}>
        <h1>{product.name}</h1>
        <div className={styles.productdisplay_right_star}>
          {/* <Image src={star_icon} width={20} height={20} alt='' />
          <Image src={star_icon} width={20} height={20} alt='' />
          <Image src={star_icon} width={20} height={20} alt='' />
          <Image src={star_icon} width={20} height={20}  alt='' />
          <Image src={star_dull_icon} width={20} height={20} alt='' /> */}
        </div>
        <div className={styles.productdisplay_right_prices}>
          <p>Selling at:</p><div className={styles.productdisplay_right_price_new}>${product.new_price}</div>
          <p style={{fontWeight:'400'}}>Actual Price: </p><div className={styles.productdisplay_right_price_old}>${product.old_price}</div>
        </div>
        <div className={styles.productdisplay_right_description}>
        {product.description}
        </div>
        {/* <div className={styles.productdisplay_right_size}>
          <h1>Seelct Size</h1>
          <div className={styles.productdisplay_right_sizes}>
            <div>S</div>
            <div>M</div>
            <div>L</div>
            <div>XL</div>
            <div>XXL</div>
          </div>
        </div> */}
        <button onClick={()=>addToCart(product.id, setCart)}>ADD TO CART</button>
        <p className={styles.productdisplay_right_category}><span>Category:</span> {product.category}</p>
        {/* <p className={styles.productdisplay_right_category}><span>Tags:</span> Modern, Latest</p> */}
      </div>
    </div>
    <DescriptionBox product={product}/>
    </>
  )
}

export default Product
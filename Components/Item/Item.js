import React from 'react'
import styles from '@/styles/Item.module.css'
import Image from 'next/image';
import Link from 'next/link';
import { addToCart } from '@/cartlogic';
import { useAtom } from 'jotai';
import { cartAtom } from '@/store';

function Item(props) {
  const [cart, setCart] = useAtom(cartAtom)

  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <Link href={'/products/' + props.item.id}>
          <div className={styles.item_main}>
            <Image src={props.item.image} width={200} height={250} alt="" />
            <div className={styles.item_text}>
              <p>{props.item.name}</p>
              <div className={styles.item_prices}>
                <div className={styles.item_price_new}>
                  ${props.item.new_price}
                </div>
                <div className={styles.item_price_old}>
                  ${props.item.old_price}
                </div>
              </div>
            </div>
          </div>

        </Link>
      </div>
      <button  onClick={() => addToCart(props.item.id, setCart)}>Add to Cart</button>
    </div>

  )
}

export default Item
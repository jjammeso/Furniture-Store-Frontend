import React from 'react'
import styles from '@/styles/Offers.module.css'
import exclusive_image from '@/public/products/pexels-monoar-rahman-22660-115747.png'
import Image from 'next/image'

export const Offers = () => {
  return (
    <div className={styles.offers}>
        <div className={styles.offers_left}>
            <h1>Exclusive</h1>
            <h1>Offers For You</h1>
            <button>Check Now</button>
        </div>
        <div className={styles.offers_right}>
            <Image src={exclusive_image} width={600} alt='' />
        </div>

    </div>
  )
}

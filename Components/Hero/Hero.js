import React from 'react'
import styles from '@/styles/Hero.module.css'
import Image from 'next/image'
import picture_4 from '@/public/products/pexels-marianne-67058-238377.jpg'
import picture_2 from '@/public/products/pexels-itsterrymag-2988860.jpg'
import picture_1 from '@/public/products/pexels-marina-podrez-3269296-11673566.jpg'
import picture_3 from '@/public/products/pexels-tdcat-59321.jpg'
import picture_5 from '@/public/products/pexels-jonathanborba-5570224.jpg'

function Hero() {
    return (
        <div className={styles.hero}>
            <div className={styles.hero_text}>
                <h2>Welcome to ComfyHome – Where Comfort Meets Style</h2>
                <p>Discover a world where each piece of furniture adds warmth and style to your home.
                </p>
            </div>

            <div className={styles.hero_container}>
                <div className={styles.hero_left}>
                    <div className={styles.hero_first}>
                        <Image style={{ objectFit: 'cover', width: '100%', height: '40%' }} src={picture_1} />
                        <Image style={{ objectFit: 'cover', width: '100%', height: '60%' }} src={picture_2} />
                    </div>
                    <div className={styles.hero_second}>
                        <Image style={{ objectFit: 'cover', width: '100%', height: '60%' }} src={picture_3} />
                        <Image style={{ objectFit: 'cover', width: '100%', height: '40%' }} src={picture_4} />
                    </div>
                </div>
                <div className={styles.hero_right}>
                    <Image style={{ objectFit: 'cover', width: '100%', height: '100%' }} src={picture_5} />
                </div>

            </div>
        </div>
    )
}

export default Hero
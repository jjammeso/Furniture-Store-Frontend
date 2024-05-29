import React from 'react'
import styles from '@/styles/DescriptionBox.module.css'

export const DescriptionBox = ({product}) => {
  return (
    <div className={styles.descriptionbox}>
        <div className={styles.descriptionbox_navigator}>
            <div className={styles.descriptionbox_nav_box}>Description</div>
            <div className={`${styles.descriptionbox_nav_box} ${styles.fade}`}>
                Reviews (122)
            </div>
            
        </div>
        <div className={styles.descriptionbox_description}>
                <p>
                {product.description}
                </p>

            </div>
    </div>
  )
}

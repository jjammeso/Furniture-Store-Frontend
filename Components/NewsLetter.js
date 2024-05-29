import React from 'react'
import styles from '@/styles/NewsLetter.module.css'

export const NewsLetter = () => {
  return (
    <div className={styles.container}>
      <div className={styles.newsletter}>
        <h1>Get Exclusive Offers on Your Email</h1>
        <p>Subscribe to our newsletter and stay updated</p>
        <div style={{display:'flex', flexWrap:'wrap', width:'60%', alignItems:'center', justifyContent:'center'}}>
          <input type='email' placeholder='Your Email id' />
          <button>Subscribe</button>
        </div>
      </div>
    </div>

  )
}

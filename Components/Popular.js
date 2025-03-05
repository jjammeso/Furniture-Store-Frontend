import React from 'react'
import styles from '@/styles/Popular.module.css'
import { productsAtom } from '@/store'
import { useAtom } from 'jotai'
import Slider from './Slider'

function Popular() {
  const [product, setProduct] = useAtom(productsAtom)

  return (
    <div className={styles.popular}>
              <hr/>
        <h1>Trending Now</h1>
        <Slider product={product}/>
    </div>
  )
}

export default Popular
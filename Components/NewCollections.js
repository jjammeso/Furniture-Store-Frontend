import React, { useEffect, useState } from 'react'
import Item from './Item/Item'
import styles from '@/styles/NewCollections.module.css'

export const NewCollections = () => {
  const [new_collections, setNewCollection] = useState([]);

  useEffect(() => {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/newcollection`).
      then(res=>res.json())
      .then(data=>{
        setNewCollection(data.slice(0,8))})
  }, [])

  return (
    <div className={styles.new_collections}>
            <hr />

      <h1>NEW COLLECTIONS</h1>
      <div className={styles.collections}>
        {new_collections.map((item, i) => (
        <Item key={i} item={item} />
        ))}
      </div>

    </div>
  )
}

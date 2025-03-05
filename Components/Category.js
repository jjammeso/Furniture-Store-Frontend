import React, { useEffect, useRef, useState } from 'react'
import styles from '@/styles/category.module.css'
import Item from './Item/Item'
import homeOfficeBanner from '@/public/products/pexels-pixabay-259962.png'
import bedroomBanner from '@/public/products/OriginsBedroomCLP_RichTextBanner_1900x.png'
import KitchenBanner from '@/public/products/diybanner-2000x664.webp'
import livingRoomBanner from '@/public/products/pexels-pixabay-271816.jpg'
import bathroomBanner from '@/public/products/furniture_banner2000x650_2.jpg'
import Image from 'next/image'

export default function Category({ menu='Amazing' }) {
  const category = menu;
  const [sortBy, setSortBy] = useState(null);
  const [count, setCount] = useState(0);
  const [sortedProduct, setSortedProduct] = useState([]);


  // function incrementCount(){
  //   count.current += 1;
  // }

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}product/products`).then(res => res.json())
      .then(data => setSortedProduct(data)).catch(err => console.log(err))
    }, [])
    console.log(category);

  useEffect(() => {
    let product = [...sortedProduct];

    if (sortBy == 'name') {
      product.sort((a, b) => (
        a.name.toLowerCase().localeCompare(b.name.toLowerCase())
      ))
      setSortedProduct(product);
    } else if (sortBy == 'price') {
      product.sort((a, b) => a.new_price - b.new_price)
      setSortedProduct(product)
    } else {
      setSortedProduct(product);
    }
  }, [sortBy])

  const updateItemCount = (products) => {
    if (category === 'Amazing') {
      setCount(products.length);
    } else {
      setCount(products.filter(item => item.category === category).length);
    }
  };

  return (
    <div className={styles.shop_category}>
      <div className={styles.shopcategory_banner}>
        <h2 className={styles.category_title}>{category} Furniture</h2>
        {category == 'Home Office' && <Image src={homeOfficeBanner} alt='' />}
        {category == 'Bedroom' && <Image  src={bedroomBanner} alt='' />}
        {category == 'Kitchen' && <Image src={KitchenBanner} alt='' />}
        {category == 'Bathroom' && <Image src={bathroomBanner} alt='' />}
        {category == 'Living Room' && <Image  src={livingRoomBanner} alt='' />}

      </div>
      <div className={styles.shop_category_indexSort}>
        <p>
          <span>Showing {count} items</span>
        </p>
        <div>
          <select onChange={(e) => setSortBy(e.target.value)} className={styles.shopcategory_sort} >
            <option value='' disabled selected>Sort by</option>
            <option value='name'>name</option>
            <option value='price'>price</option>
          </select>
        </div>
      </div>
      <div className={styles.shopcategory_products}>
        {sortedProduct
          .filter(item => category === 'Amazing' || item.category === category)
          .map((item, i) => <Item key={i} item={item} />)}
      </div>
      <br/>
      {/* <div className={styles.shopcategory_loadmore}>
        Explore more
      </div> */}
    </div>
  )
}


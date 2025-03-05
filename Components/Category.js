import React, { useEffect, useState } from 'react'
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
  const [sortedProduct, setSortedProduct] = useState([]);

  

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
          <span>Showing 1-12 </span> out of 36 products
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
        {category=='Amazing' && sortedProduct.map((item, i)=>{
          return <Item key={i} item={item} />
        })}
        {category != 'Amazing' && sortedProduct.map((item, i) => {
          if (item.category === category) {
            return <Item key={i} item={item} />
          } else {
            return null;
          }
        })}
      </div>
      <div className={styles.shopcategory_loadmore}>
        Explore more
      </div>
    </div>
  )
}


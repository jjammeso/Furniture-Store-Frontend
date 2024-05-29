import React from 'react'
import { useRouter } from 'next/router'
import Category from '@/Components/Category';


function Products() {
  const router = useRouter();
  const category = router.query.category;

  return (
    <Category menu={category} />
  )
}

export default Products
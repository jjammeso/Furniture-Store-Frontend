import React, { useEffect, useState } from 'react'
import styles from '@/styles/Navbar.module.css'
import Image from 'next/image'
import cart_icon from '../public/icons8-cart-50.png'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { getTotalCostAndItems } from '@/cartlogic'
import { cartAtom } from '@/store'
import { productsAtom } from '@/store'
import { useAtom } from 'jotai'
import { isLoggedInAtom } from '@/store'
import { getToken } from '@/lib/token'
import { getDefaultCart } from '@/cartlogic'
// import search_icon from '@/public/Assets/icons8-search.svg'

function Navbar() {
    const router = useRouter()
    const url = new URL('http://example.com' + router.asPath)
    const [category, setCategory] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useAtom(isLoggedInAtom);
    const [cartItems, setCartItems] = useState(0);
    const [allProducts, setAllProducts] = useAtom(productsAtom);
    const [cart, setCart] = useAtom(cartAtom)
    let token = getToken()

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}product/products`).then(res => res.json())
            .then(data => setAllProducts(data)).catch(err => console.log(err))
        const menu = (url.searchParams.get('category'));
        setCategory(menu)
        if (token) {
            setIsLoggedIn(true);
            getDefaultCart().then(data => setCart(data)).catch(err => console.log(err))
            console.log('shakalaka boom boom')
        }
    }, [])

    useEffect(() => {
        if (allProducts.length > 0) {
            let noOfItems = getTotalCostAndItems(cart, allProducts);
            setCartItems(noOfItems[1]);
            console.log('this is executed')
        }
    }, [cart])

    const logout = () => {
        try {
            localStorage.removeItem('auth-token');
            setIsLoggedIn(false)
            setCartItems(0);
            setCart({})
            router.push('/')
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className={styles.navbar}>
            <div className={styles.nav_logo}>
                <p>COMFY<span>HOME</span></p>
                <ul className={styles.nav_menu}>
                    <Link href='/' style={{ textDecoration: 'none' }}>
                        <li onClick={() => { setCategory('') }}>Shop{category === '' ? <hr /> : ""}</li>
                    </Link>
                    <Link href='/products?category=Home Office' style={{ textDecoration: 'none' }}>
                        <li onClick={() => { setCategory('Home Office') }}>Home Office {category === 'Home Office' ? <hr /> : ""}</li>
                    </Link>
                    <Link href='/products?category=Bedroom' style={{ textDecoration: 'none' }}>
                        <li onClick={() => { setCategory('Bedroom') }}>Bedroom {category === 'Bedroom' ? <hr /> : ""}</li>
                    </Link>
                    <Link href='/products?category=Kitchen' style={{ textDecoration: 'none' }}>
                        <li onClick={() => { setCategory('Kitchen') }}>Kitchen {category === 'Kitchen' ? <hr /> : ""}</li>
                    </Link>
                    <Link href='/products?category=Bathroom' style={{ textDecoration: 'none' }}>
                        <li onClick={() => { setCategory('Bathroom') }}>Bathroom {category === 'Bathroom' ? <hr /> : ""}</li>
                    </Link>
                    <Link href='/products?category=Living Room' style={{ textDecoration: 'none' }}>
                        <li onClick={() => { setCategory('Living Room') }}>Living Room {category === 'Living Room' ? <hr /> : ""}</li>
                    </Link>
                </ul>


                <div className={styles.nav_login_cart}>
                    {isLoggedIn ? <button onClick={logout}>Logout</button> :
                        <Link href='/login' style={{ textDecoration: 'none' }}>
                            <button onClick={() => { setCategory('none') }}>Login</button>
                        </Link>
                    }


                    <Link href='/cart'>
                        <Image src={cart_icon} alt='' />
                    </Link>
                    <div className={styles.nav_cart_count}>{cartItems}</div>
                </div>
            </div>
            {/* <div className={styles.search}>
                <input className={styles.searchbar} type='text' placeholder='search' />
                <button>
                    <Image src={search_icon}
                        style={{ objectFit: 'contain', width: '100%', height: '100%' }}
                    /></button>
            </div> */}
        </div>
    )
}

export default Navbar

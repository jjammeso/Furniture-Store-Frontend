
import { getToken } from "./lib/token";

export const getDefaultCart = () => {
    const token = getToken()
    if (token) {
        return fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/cart`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'auth-token': token,
                'Content-Type': 'application/json'
            },
            body: ''
        }).then(res => res.json())
        .catch(err => {
            console.log(err)
        });
    }else{
        return {}
    }
}

export const addToCart = (itemId, setCart) => {
    const token = getToken()
    if (token) {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/addtocart`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'auth-token': token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: itemId })
        }).then(res => res.json()).then(data => {
            getDefaultCart().then(data=>{
                setCart(data)
            }).catch(err=>{
                console.log(err)
            })
        } 
        );
    }
}

export const removeFromCart = (itemId, setCart) => {
    const token = getToken()
    if (token) {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/removefromcart`, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'auth-token': token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: itemId })
        }).then(res => res.json()).then(data => {
            getDefaultCart().then(data=>{
                console.log(data);
                setCart(data)
            }).catch(err=>{
                console.log(err)
            })
        });
    }
}

export const getTotalCostAndItems = (cart, allProducts) => {
    let newTotalCost = 0;
    let numberOfItems = 0;
    for (const item in cart) {
        if (cart[item] > 0) {
            let iteminfo = allProducts.find((product) => product.id === Number(item));
            newTotalCost += cart[item] * iteminfo.new_price;
            numberOfItems += cart[item];
        }
    }
    return [newTotalCost, numberOfItems];
}
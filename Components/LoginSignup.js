import React, { useState } from 'react'
import styles from '@/styles/LoginSignup.module.css'
import { useRouter } from 'next/router';
import { getDefaultCart } from '@/cartlogic';
import { cartAtom } from '@/store';
import { useAtom } from 'jotai';
import { isLoggedInAtom } from '@/store';
import { Margarine } from 'next/font/google';

const LoginSignup = () => {
  const router = useRouter();
  const [cart, setCart] = useAtom(cartAtom)
  const [, setIsLoggedIn] = useAtom(isLoggedInAtom)

  const [state, setState] = useState('Login');
  const [error, setError] = useState(null)
  const [isChecked, setIsChecked] = useState(false)
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    password: '',
  })

  const changeHandler = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  }

  const login = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userDetails),
    }).then(res => res.json()).then(responseData => {
      if (responseData.success === true) {
        localStorage.setItem('auth-token', responseData.token);
        setIsLoggedIn(true);
        getDefaultCart().then(data => setCart(data)).catch(err => console.log(err))
        router.push('/');
      } else {
        setError(responseData)
      }
    }).catch(error => console.log(error));
  }

  const signup = () => {
    if (!isChecked) setError({message:'Please accept the terms'})
    else {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/signup`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userDetails),
      }).then(res => res.json()).then(responseData => {
        if (responseData.success === true) {
          router.push('/');
          localStorage.setItem('auth-token', responseData.token);
          setIsLoggedIn(true);
          setCart(getDefaultCart());
        } else {
          console.log(responseData)
          setError(responseData)
        }
      }).catch(error => console.log(error));
    }
  }

  return (
    <div className={styles.loginsignup} style={{marginBottom:'40px'}}>
      <div className={styles.loginsignup_container}>
        <h1>{state}</h1>
        {error && <p style={{ color: 'red' }}>{error.message + ', Try again'}</p>}
        <div className={styles.loginsignup_fields}>
          {state === 'Sign Up' ? <input type='text' name='name' value={userDetails.name} onChange={changeHandler} placeholder='Your Name' /> : ''}
          <input type='email' name='email' value={userDetails.email} onChange={changeHandler} placeholder='Email Address' />
          <input type='password' name='password' value={userDetails.password} onChange={changeHandler} placeholder='Password' />
        </div>
        <button onClick={state === 'Login' ? login : signup}>Continue</button>
        {state === 'Sign Up' ? <><p className={styles.loginsignup_login}>Already have an account? <span onClick={() => setState('Login')}>Login here</span></p>
          <div className={styles.loginsignup_agree} >
            <input type='checkbox' name='checkbox' onChange={(e) => setIsChecked(e.target.checked)} id='' />
            <p>By continuing, I agree to the terms of use and privacy policy</p>
          </div></>
          : <p className={styles.loginsignup_login}>Create an account? <span onClick={() => setState('Sign Up')}>Click here</span></p>}
      </div>
    </div>
  )
}

export default LoginSignup
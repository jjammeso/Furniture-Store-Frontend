import React, { useEffect, useRef, useState } from 'react'
import Item from './Item/Item'
import next_icon from '../public/icons8-next-50.png'
import prev_icon from '../public/icons8-previous-50.png'
import Image from 'next/image'

export default function Slider({ product }) {
    const elementRef = useRef(null);
    const [showPrev, setShowPrev] = useState(false);
    const [showNext, setShowNext] = useState(true);

    function slideLeft(){
        if(elementRef.current){
            elementRef.current.scrollBy({ left: -400, behavior: 'smooth' });
        }
    }

    function slideRight(){
        if(elementRef.current){
            elementRef.current.scrollBy({ left: 400, behavior: 'smooth' });
        }
    }

    function checkScroll(){
        const elem = elementRef.current
        const showPrevButton = elem.scrollLeft > 0;
        const showNextButton = elem.scrollLeft < elem.scrollWidth - elem.clientWidth;

        setShowNext(showNextButton);
        setShowPrev(showPrevButton)
    }

    useEffect(()=>{
        const elem = elementRef.current;
        elem.addEventListener('scroll', checkScroll);
        checkScroll();
        return ()=>elem.removeEventListener('scroll', checkScroll)
    },[])

    return (
        <div style={{ 
            position:'relative', 
            width:'100%'
            }}>
            {showPrev && 
            <Image onClick={slideLeft} src={prev_icon} 
            style={{
                background:'white', 
                borderRadius:'50%', 
                position:'absolute', 
                zIndex:'3', 
                top:'37%',
                }} />}
            <div ref={elementRef} style={{ 
                display: 'flex', 
                width: '100%', 
                overflowX: 'scroll', 
                paddingBottom:'20px', 
                paddingLeft: '50px', 
                paddingRight:'50px', 
                boxSizing:'border-box'
                }}>
                {product.map((item, i) => (
                    <Item key={i} item={item} />
                ))}
            </div>
            {showNext && <Image onClick={slideRight} src={next_icon} style={{
                background:'white', 
                borderRadius:'50%',
                position:'absolute', 
                bottom:'50%', 
                right:'0', 
                zIndex:'3'
                }} />}
        </div>
    )
}

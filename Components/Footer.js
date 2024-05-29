import React from 'react'
import styles from '@/styles/Footer.module.css'

export default function Footer() {
    return (
        <div className={styles.footer_container}>
            <div className={styles.footer}>
                <div>
                    <h3>About ComfyHome</h3>
                    <ul>
                        <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </li>
                        <li>Terms of Use</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>
                <div>
                    <h3>Departments</h3>
                    <ul>
                        <li>Home Office</li>
                        <li>Bedroom</li>
                        <li>Kitchen</li>
                        <li>Bathroom</li>
                        <li>Living room</li>
                    </ul>
                </div>
                <div>
                    <h3>Help/Support</h3>
                    <ul>
                        <li>Customer Service</li>
                        <li>Lorem ipsum</li>
                        <li>Lorem ipsum</li>
                        <li>Lorem ipsum</li>
                    </ul>
                </div>
            </div>
            <div style={{textAlign:'center', fontSize:'18px', padding: '0.3em', boxSizing:'border-box'}}>
                <p>&copy; 2024 Sonam Jamtsho</p>
            </div>
        </div>
    )
}

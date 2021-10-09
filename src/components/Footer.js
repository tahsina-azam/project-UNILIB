import React from 'react'
import { Button } from 'react-bootstrap'
import './Footer.css'

function Footer() {
    return (
        <div className='footer-container'>
            <section className="footer-subscription">
                <p className="footer-subscription-heading">
                    Join us to get update on the pdfs that are 
                    recently added
                </p>
                <p className="footer-subscription-text">
                    You can unsubscribe at any time.
                </p>
                <div className="input-areas">
                    <form>
                       <input type='email' name='email'
                       placeholder="Your Email"
                       className="footer-input"/> 
                       <Button buttonStyle='btn--outline'>Subscribe</Button>
                    </form>
                </div>
            </section>
        </div>
    )
}

export default Footer

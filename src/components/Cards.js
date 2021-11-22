import React from 'react'
import CardItem from './CardItem'
import './Cards.css';
import img from '../images/img-10.jpg';
import img1 from '../images/img-11.jpg'


function Cards() {
    return (
        <div className="cards">
            <h1>Are you wondering why you should rely on us?</h1>
             <div className="cards__container">
                 <div className="cards__wrapper">
                     <ul className="cards__items">
                        <CardItem 
                        src={img}
                        text="Get and upload all the books, pdfs
                         and notes you need "
                        label="EASE OF ACCESS"
                        path="/services"
                        />
                        <CardItem 
                        src={img1}
                        text="Use it to broaden up the horizon of your knowledge"
                        label="ADD TO YOUR KNOWLEDGE"
                        path="/services"
                        />
                     </ul>
                     
                 </div>
             </div>
            
        </div>
    )
}

export default Cards

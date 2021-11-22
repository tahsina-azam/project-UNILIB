import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css';

const Navbar= props =>{
    const [click, setClick] = useState(false);

    const handleClick = () =>setClick(!click);

    const closeMobileMenu= () =>setClick(false);

    let menu;
    
    if(!props.state){
     menu=(
        <div className="navbar-container">
             <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
        UNILIB <i className='fab fa-typo3'/>
    </Link>
    <div className="menu-icon" onClick={handleClick}>
        <i className={click ? 'fas fa-times':'fas fa-bars'} />
    </div>
    <ul className={click ? 'nav-menu active' :'nav-menu'}>
        <li className='nav-item'>
            <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                Home
            </Link>
        </li>
        <li className='nav-item'>
            <Link to='/services' className='nav-links' onClick={closeMobileMenu}>
                Services
            </Link>
        </li>
        <li className='nav-item'>
            <Link to='/log-in' className='nav-links' onClick={closeMobileMenu}>
               Log In
            </Link>
        </li>
        <li className='nav-item'>
            <Link to='/sign-up' className='nav-links' onClick={closeMobileMenu}>
                Sign Up
            </Link>
        </li>
    </ul>
                 
             </div>
    )
    }
    else{
        menu=(
            <div className="navbar-container">
             <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
        UNILIB <i className='fab fa-typo3'/>
    </Link>
    <div className="menu-icon" onClick={handleClick}>
        <i className={click ? 'fas fa-times':'fas fa-bars'} />
    </div>
    <ul className={click ? 'nav-menu active' :'nav-menu'}>
        <li className='nav-item'>
            <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                Profile
            </Link>
        </li>
        <li className='nav-item'>
            <Link to='/services' className='nav-links' onClick={closeMobileMenu}>
                Library
            </Link>
        </li>
        <li className='nav-item'>
            <Link to='/log-in' className='nav-links' onClick={closeMobileMenu}>
               Forum
            </Link>
        </li>
        <li className='nav-item'>
            <Link to='/sign-up' className='nav-links' onClick={closeMobileMenu}>
               Log out
            </Link>
        </li>
    </ul>
                 
             </div>
        )
    }
    
    return (
        <>
         <nav className="navbar">
             {menu}
         </nav>   
        </>
    )
}

export default Navbar


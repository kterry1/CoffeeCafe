import React, {useContext} from 'react'
import logo from '../images/coffee-beans-logo.png'
import {CoffeeContext} from "../coffeeContext";
import {Link} from 'react-router-dom';
import cart from '../images/shopping-cart-line.svg'
import {AuthContext} from '../Auth';

export default function Nav() {
    const {setCartOpen, setMenuOpen, cartItems} = useContext(CoffeeContext);
    const {currentUser} = useContext(AuthContext);
    return (
        <nav className="navbar">
            <img className="coffee-beans-logo" alt="coffee beans logo" src={logo}/>
            <div className="navbar-list">
                <div onClick={() => setCartOpen(true)} className="navbar-list-items menu-option">
                    Cart
                </div>
                <Link to="/menu" >
                <div onClick={() => setMenuOpen(true)} className="navbar-list-items" >
                    <span>Menu</span>
                </div>
                </Link>
                <Link to="/login">
                <div className="navbar-list-items login-option">
                    <span>{currentUser ? "Home" : "Login/SignUp"}</span>
                </div>
                </Link>
            </div>
            <img onClick={() => setCartOpen(true)} className="cart-icon" alt="coffee beans logo" src={cart}/>
       <div className="item-count" style={{color: "white"}}>{cartItems.length}</div>
        </nav>
    )
}

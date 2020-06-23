import React, {useContext} from 'react'
import {Link} from 'react-router-dom';
import {CoffeeContext} from "../coffeeContext";
import closeMenu from '../images/close-menu-icon.png';
import {AuthContext} from '../Auth';

export default function FlyOutCart() {
	const {cartOpen, setCartOpen, cartItems, setCartItems, setOrderedItems,  setOrderTracking, handleOrderProcess} = useContext(CoffeeContext);
	const {currentUser} = useContext(AuthContext);
	let cartTotal = [];

	function removeItemFromCart(id) {
	 setCartItems(prevItems => prevItems.filter(item => item.image_alt !== id));
	}

	function quantityPrices(id, quantity) {
		let response = cartItems.find(each => each.image_alt === id);
		let itemTotal = response.price * quantity;
		cartTotal.push(itemTotal);
		return itemTotal;		
		
	}

	function cartTotalPrice(){
		let total = cartTotal.reduce((a,b) => a + b, 0)
		return total;
	}

	function displayCartItems() {
		let display = cartItems.reduce((accum, curr) => Object.assign(accum, {[curr.image_alt]: (accum[curr.image_alt]||0)+1}), {})
		let displayArray = Object.entries(display);
	return displayArray.map((each,index) => 
		<React.Fragment key={index}>
	 	<li className="order-list-items" key={index}><span>{`${each[0]}`}</span><span>{`${each[1]}`}</span><span>${quantityPrices(each[0], each[1])}</span><i onClick={() => removeItemFromCart(each[0])} style={{display: "inlineBlock", color: "red", cursor: "pointer"}} className="ri-delete-bin-2-line"></i></li>
		 </React.Fragment>
	)
	}

	const handleSubmit = () => {
		setOrderedItems(cartItems); 
		setCartItems([]);
		handleOrderProcess();
		setCartOpen(false);
		setTimeout(() => {
		setOrderTracking(0);
		setOrderedItems([]);
		}, 15000)
	}

	const disableSubmit = () => {
	 return (cartItems.length > 0) ?
	 <Link to="/"><button onClick={() => handleSubmit()} value="Submit Order" type="submit">Submit Order</button></Link>
	 : <button disabled value="Submit Order" type="submit">Submit Order</button>
	}

    return (
			<div className={`flyoutCart ${cartOpen ? "show" : "hidden"}`}>
			<img alt="close menu" src={closeMenu} onClick={() => setCartOpen(false)} className="close-menu"></img>
					<h2>Your Cart Items</h2>
					<div style={{width: "80%", float: "left", border: "1px solid #38220f", backgroundColor:"#38220f"}}/>
					<div className="order-items">
						<ul className="order-items-titles">
						<li >Items</li><li >Amount</li><li >Price</li>
						</ul>
						{displayCartItems()}	
					</div>
					<div style={{border:"1px solid #38220f", backgroundColor:"#38220f"}}></div>
					<div className="order-total">Total: ${cartTotalPrice()}</div>
					{
					currentUser ? disableSubmit() : <><p>Log in to process your order.</p><Link onClick={() => setCartOpen(false)} className="cart-login-redirect" to="/login">Log in</Link></>
					}
				</div>
    )
}

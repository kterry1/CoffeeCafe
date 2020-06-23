import React, {useState, useContext} from 'react';
import {CoffeeContext} from "../coffeeContext";
export const MenuItem = ({index, item}) => {
    const {setCartItems} = useContext(CoffeeContext);
    const [addItem, setAddItem] = useState(false);
    function addItemsToCart(item) {
        setCartItems(prev => [{"image_alt": item.image_alt, "price": item.price}, ...prev]);
        setAddItem(true);
        setTimeout(() => setAddItem(false), 300)
    }
  return (
    <div>
      <div key={index} className="menu-items">
        <label className="menu-item-label">{item.image_alt}</label>
        <img alt={item.image_alt} src={item.src} className="item-image" />
        <div className="item-description">{item.description}</div>
        <div className="item-price">Price: ${item.price}</div>
        <button
          onClick={() => addItemsToCart(item)}
          className="add-to-cart-btn add-to-cart-btn-adding"
        >
          {addItem ? "Added" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}

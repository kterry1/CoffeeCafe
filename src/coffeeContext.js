import React, {useState} from 'react'
const CoffeeContext = React.createContext();

function CoffeeContextProvider({children}) {
    const [cartOpen, setCartOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [orderedItems, setOrderedItems] = useState([]);
    const [orderTracking, setOrderTracking] = useState(0);
    const [removeOverlay, setRemoveOverlay] = useState(false);

    function handleOrderProcess() {
      let i = 0;
      setTimeout(function run() {
          i++;
          setOrderTracking(prev => prev + 1);
          if(i < 2){setTimeout(run, 5000)};
      }, 5000);
    }
    

    return (
    <CoffeeContext.Provider value={{ cartOpen, setCartOpen, menuOpen, setMenuOpen, cartItems, setCartItems, orderedItems, setOrderedItems, orderTracking, setOrderTracking, handleOrderProcess, removeOverlay, setRemoveOverlay }}>{children}</CoffeeContext.Provider>
    )
}

export {CoffeeContextProvider, CoffeeContext};

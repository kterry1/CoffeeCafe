import React, {useContext} from "react";
import app from ".././FirebaseConfig/base";
import {motion} from 'framer-motion';
import {CoffeeContext} from "../coffeeContext";

const Home = () => {
  const {orderedItems, orderTracking} = useContext(CoffeeContext);
  let displayName = app.auth().currentUser.displayName;
  const signInName = () => {
   return displayName ? displayName : displayName = "Coffee Nerd";
  }
  const displayLabelsClass = () => {
    return displayName.length < 5 ? "labels-short-name" : "labels-long-name";
  }


  return (
    <motion.div
      exit={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="login-page"
    >
      <h1>{`You're all signed in, ${signInName()}!`}</h1>
      <h3>Track your order below.</h3>
      {orderedItems.length > 0 ? (
      
      <div className="breadcrumbs">
        <i className="fa fa-circle start"></i>
        <i className={`fa middle ${orderTracking >= 1 ? "fa-circle" : "fa-circle-o opacity"}`}></i>
        <i className={`fa end ${orderTracking >= 2 ? "fa-circle" : "fa-circle-o opacity"}`}></i>
        <div className={displayLabelsClass()}>
          <p className="crumbs processing">Processing Order</p>
          <p className={`crumbs ${orderTracking < 1 && `opacity`}`}>Brewing</p>
          <p className={`crumbs ready ${orderTracking < 2 && `opacity`}`}>Ready!</p>
        </div>
      </div>
      ): <h4>You have not ordered any items from the menu.</h4>}

      <button className="signout-btn" onClick={() => app.auth().signOut()}>
        Sign out
      </button>
    </motion.div>
  );
};

export default Home;
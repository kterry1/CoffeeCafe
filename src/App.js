import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Nav from './Components/Nav';
import FlyOutCart from './Components/FlyOutCart';
import Menu from './Components/Menu';
import Footer from './Components/Footer';
import Home from './FirebaseComponents/Home';
import Login from './FirebaseComponents/Login';
import Signup from './FirebaseComponents/Signup';
import PrivateRoute from "././FirebaseComponents/PrivateRoute";
import {AnimatePresence} from 'framer-motion';

function App() {
  return (
    <div>
      <Nav/>
      <FlyOutCart/>
      <AnimatePresence>
      <Switch>
      <PrivateRoute exact path="/" component={Home} />
      <Route path="/menu" component={Menu}/>
      <Route path="/login" component={Login}/>
      <Route path="/signup" component={Signup}/>
      </Switch>
      </AnimatePresence>
      <Footer/> 
    </div>
  );
}

export default App;

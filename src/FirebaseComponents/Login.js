import React, {useState, useCallback, useContext} from "react";
import {withRouter, Redirect} from 'react-router';
import {Link} from 'react-router-dom';
import app from "../FirebaseConfig/base.js";
import {AuthContext} from '../Auth.js';
import {CoffeeContext} from '../coffeeContext';
import {motion} from 'framer-motion';
import logo from '../images/coffee-beans-logo.png'

const Login = ({history}) => {
    const [error, setError] = useState("");
    const handleLogin = useCallback(
        async event => {
            event.preventDefault();
            const {email, password} = event.target.elements;
            try {
                await app
                .auth()
                .signInWithEmailAndPassword(email.value, password.value);
                history.push("/");
            }
            catch(error) {
                setError(error.message)
                setTimeout(() => {
                    setError("")
                }, 2000)
            }
        }, [history]
    );

    const {currentUser} = useContext(AuthContext);
    const {removeOverlay, setRemoveOverlay} = useContext(CoffeeContext);

    if(currentUser) {
        return <Redirect to="/" />
    }


    return (
        <>
        <div style={removeOverlay ? {display: "none"} : null} className="overlay">
            <div className="overlay-container">
            <img alt="coffee beans logo" src={logo}/>
              <h1>Coffee Cafe</h1>
              <div className="overlay-underline"></div>
                <h3>It all started with one coffee bean.</h3>
                <p>We now offer homemade breakfast sandwiches, dark rich coffee roasts and much more.</p>
                <p>Click the coffee mug to login and checkout our options.</p>
            </div>
            <Link to='/menu' onClick={() => setRemoveOverlay(true)}  className="enter-mug"><img alt="floating mug" src="https://img.icons8.com/ios-filled/50/000000/coffee.png"/></Link>
        </div>
        <motion.div style={removeOverlay ? null : {display: "none"}}  exit={{opacity: 0}} animate={{ opacity: 1}} initial={{opacity: 0}} className="login-page">
            <h1>Log In</h1>
            <form onSubmit={handleLogin} className="form">
            <h4 style={{display:"inline", color: "red"}}>{error}</h4>
                  <input name="email" type="email" placeholder="Email"/>
                  <input name="password" type="password" placeholder="Password"/>
              <button type="submit">Log in</button>
              <p>Not registered? <Link to="/signup" style={{color: "#38220f", fontWeight: "600"}}>Create an account</Link> </p>
            </form>
        </motion.div>
        </>
    )
}

export default withRouter(Login);

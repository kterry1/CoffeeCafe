import React, {useCallback, useState} from 'react';
import {withRouter} from "react-router";
import {Link} from 'react-router-dom';
import app from '../FirebaseConfig/base';
import {motion} from 'framer-motion';

const SignUp = ({history}) => {
    const [error, setError] = useState("");
    const handleSignUp = useCallback(async event => {
        event.preventDefault();
        const {email, password, displayName } = event.target.elements;
        try {
            await app
            .auth()
            .createUserWithEmailAndPassword(email.value, password.value).then(function(result) {
                return result.user.updateProfile({
                  displayName: displayName.value
                })});
            history.push("/");
        }
        catch(error) {
            setError(error.message);
            setTimeout(() => {
                setError("")
            }, 2000)
        }
    }, [history]);


    return (
        <motion.div exit={{opacity: 0}} animate={{ opacity: 1}} initial={{opacity: 0}} className= "login-page signup-page">
            <h1>Sign Up</h1>
            <form onSubmit={handleSignUp} className="form signup-form">
                  <h4 style={{display: "inline", color: "red"}}>{error}</h4>
                  <input name="displayName" type="displayName" placeholder="Name"/>
                  <input name="email" type="email" placeholder="Email"/>
                  <input name="password" type="password" placeholder="Password"/>
              <button type="submit">Sign up</button>
              <p>Already registered? <Link to="/login" style={{color: "#38220f", fontWeight: "600"}}>Sign In</Link></p>
            </form>
        </motion.div>
    )
}

export default withRouter(SignUp);
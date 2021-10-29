import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button'
import { useHistory, useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import useAuth from '../../../useAuth/useAuth';
import { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";


const Login = () => {
    const {singInWithGoogle} = useAuth()
    const location = useLocation()
    const history = useHistory()
    const historyForm = location.state?.from || '/home'
    const auth = getAuth();
    const [error,setError] = useState('')
    const [email,setemail] = useState('')
    const [password,setPassword] = useState('')

    const handleGoogleLogin = ()=>{
        singInWithGoogle()
        .then(result =>{
            history.push(historyForm)
        })
    }

    const EmailChange= (e)=>{
        setemail(e.target.value)
    }
    const PasswordChange= (e)=>{
        setPassword(e.target.value)
    }

    // form implemantion 
    const handleForm = e =>{
        e.preventDefault() 
        signInWithEmailAndPassword(auth,email,password)
        .then((result)=>{
            const user = result.user
            console.log(user)
            setError('')
        })
        .catch((error)=>{
            setError('This email has not been registered yet. Please register first')
        })
           
        
    }
    
    console.log('come from',location.state?.form)
    return (
        <div>
           <Container>
               <Row>
                   <Col className="col-md-6 mx-auto">
                   <form className="border border-1 m-2 p-5" onSubmit={handleForm}>
                        <div className="mb-3">
                            <label  className="form-label">Email address</label>
                            <input onBlur={EmailChange} type="email" className="form-control" placeholder="Your Email"/>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <input onBlur={PasswordChange} type="password" className="form-control"placeholder="Your Password"/>
                        </div>
                        <button type="submit" className="w-100 btn btn-success">Submit</button>
                    </form>
                    <h6 className="text-center text-warning">{error}</h6>
                   </Col>
               </Row>
             <div className="text-center">
             
            <Button variant="warning" onClick={handleGoogleLogin}><i style={{color:'white',fontSize:'20px'}} className="m-2 fab fa-google"></i><b>singIn with Google</b></Button>
            <h6>If you have no Accound please <Link to="/reg">register</Link></h6>
             </div>
           </Container>
        </div>
    );
};

export default Login;
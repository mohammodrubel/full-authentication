import React from 'react';
import { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button'
import { useHistory, useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import useAuth from '../../../useAuth/useAuth';
import { getAuth, createUserWithEmailAndPassword ,sendEmailVerification,updateProfile} from "firebase/auth";

const Reg = () => {
    const {singInWithGoogle} = useAuth()
    const location = useLocation()
    const history = useHistory()
    const [name,setName] = useState('')
    const [email,setemail] = useState('')
    const [password,setPassword] = useState('')
    const historyForm = location.state?.from || '/home'
    const auth = getAuth();
    const [error,setError] = useState('')

    const handleGoogleLogin = ()=>{
        singInWithGoogle()
        .then(result =>{
            history.push(historyForm)
        })
    }

    // --------------------------------------------------------------
    const EmailChange= (e)=>{
        setemail(e.target.value)
    }
    const PasswordChange= (e)=>{
        setPassword(e.target.value)
    }

    // form implemantion 
    const handleForm = e =>{
        e.preventDefault() 
            if(password.length <6){
                setError('Password Should be at Last 6 Characters')
                return
            }
            if(!/(?=.*[A-Z].*[A-Z])/.test(password)){
                setError('password must be 6 characters and 2 upper case letter')
                return
            }
        createUserWithEmailAndPassword(auth,email,password)
        .then((result)=>{
            const user = result.user
            console.log(user)
            varification()
            updateName()
            setError('')
        })
        .catch(error =>{
            setError(error.message)
        })
    }

    const varification = () =>{
        
        sendEmailVerification(auth.currentUser)
        .then(()=>{

        })
    }

    const updateName = ()=>{
        updateProfile(auth.currentUser,{displayName:name})
        .then((result)=>{

        })
    }

    return (
        <div>

            <Container >
                <Row>
                    <Col className="col-md-6 mx-auto">
                    <form className="border border-1 m-2 p-5" onSubmit={handleForm}>
                    <div className="mb-3">
                            <label  className="form-label">Full Name</label>
                            <input type="text" className="form-control"placeholder="full Name"/>
                        </div>
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
                    <h6>If you already registered! please <Link to="/login">Login </Link></h6>
                    </div>
                    
            </Container>

        </div>
    );
};

export default Reg;
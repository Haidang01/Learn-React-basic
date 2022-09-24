
import { BsEyeSlash } from 'react-icons/bs';
import { FiEye } from 'react-icons/fi';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import img from './img/product-sample-big.png'
import './Signup.scss';
import { Resgister } from '../../services/apiService'
import { toast } from 'react-toastify';
const Signup = (props) => {
    const navigate = useNavigate()
    const [email, setEmail] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };
    const handleShow = () => {
        setShowPassword(!showPassword);
    }
    const handleSignup = async () => {
        if (!userName) {
            toast.error("Invalide username");
        }
        if (!password) {
            toast.error("Invalide password");
        }
        const isValidateEmail = validateEmail(email);
        if (!isValidateEmail) {
            toast.error("Invalide email")
            // toast.success('wwin')
            return
        }

        let data = await Resgister(email, userName, password)
        if (data && data.EC === 0) {
            console.log('success', data);
            navigate('/');
            toast.success(data.EM);
        }
        if (data && data.EC !== 0) {
            toast.error(data.EM);
        }
    }
    console.log('render');
    return (
        <div className="signup-container">
            <div className="signup-left" >
                <h1>
                    Sign up
                    <br />
                    and come on in
                </h1>
                <img src={img} />
                <p>© Typeform</p>
            </div>
            <div className="signup-right">
                <div className="header">
                    <span>Already have an account?</span>
                    <div className='btn-signup'>
                        <button onClick={() => { navigate('/login') }} >Login</button>
                    </div>
                </div>
                <div className="title col-4 mx-auto">
                    <h2>Sign up</h2>
                </div>
                <div className="content-form  col-4 mx-auto">
                    <div className="form-group">
                        <input
                            placeholder='Username...'
                            onChange={(event) => setUserName(event.target.value)}
                            value={userName}
                            type={"text"}
                            className="form-control" />
                    </div>
                    <div className="form-group">
                        <input
                            placeholder='Email...'
                            onChange={(event) => setEmail(event.target.value)}
                            value={email}
                            type={"email"}
                            className="form-control" />
                    </div>
                    <div className="form-group">

                        <input
                            placeholder='Password...'
                            onChange={(event) => setPassword(event.target.value)}
                            value={password}
                            type={showPassword ? "text" : "password"}
                            className="form-control" />
                        {
                            showPassword ?
                                <div className='icon' onClick={() => handleShow()}>
                                    < BsEyeSlash />
                                </div>
                                :
                                <div className='icon' onClick={() => handleShow()}>
                                    < FiEye />
                                </div>

                        }

                    </div>
                    <div>
                        <button
                            onClick={() => handleSignup()}
                            className='btn-submit'>Sign up</button>
                    </div>
                    <div className='text-center' >
                        <span className='back' onClick={() => { navigate('/') }} >&#60; &#60; Go to home Page</span>
                    </div>
                </div>

            </div>
        </div>

    )
}
export default Signup;
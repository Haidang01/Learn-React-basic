import { useState } from 'react';
import './login.scss';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { postLogin } from '../../services/apiService';
import { ImSpinner } from 'react-icons/im';
import { useDispatch } from 'react-redux';
import { doLogin } from '../../redux/action/userAction';
import Language from '../Header/Language';
const Login = (props) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const handleLogin = async () => {
        // validate
        const isValidateEmail = validateEmail(email);
        if (!isValidateEmail) {
            toast.error("Invalide email")
            // toast.success('wwin')
            return
        }
        if (!password) {
            toast.error("Invalide password");
        }
        setIsLoading(true);
        //submit apis
        let data = await postLogin(email, password);
        if (data && data.EC === 0) {
            console.log(data);
            dispatch(doLogin(data))
            toast.success(data.EM);
            setIsLoading(false);
            navigate('/')
        }
        if (data && +data.EC !== 0) {
            toast.error(data.EM);
            setIsLoading(false);

        }

    }
    const handleKeyDown = (event) => {
        // console.log('event key ', event.key, event);
        if (event.key === 'Enter') {
            handleLogin();
        }
    }
    return (
        <div className="login-container">
            <div className="header">
                <span>Don't have an account yet?</span>
                <button onClick={() => { navigate('/signup') }} >Sign up</button>
                <Language />
            </div>
            <div className="title col-4 mx-auto">
                Hoi dan IT
            </div>
            <div className="welcome col-4 mx-auto ">
                Hello, Who's this?
            </div>
            <div className="content-form  col-4 mx-auto">
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
                        placeholder='Password'
                        onChange={(event) => setPassword(event.target.value)}
                        value={password}
                        type={"Password"}
                        className="form-control"
                        onKeyDown={(event) => handleKeyDown(event)}
                    />
                </div>
                <span className='forgot-password'>Forgot password ?</span>
                <div>
                    <button
                        onClick={() => handleLogin()}
                        className='btn-submit'
                        disabled={isLoading}
                    >
                        {isLoading === true && <ImSpinner className="loader-icon" />}
                        <span>Login</span>
                    </button>
                </div>
                <div className='text-center ' >
                    <span className='back' onClick={() => { navigate('/') }} >&#60; &#60; Go to home Page</span>
                </div>
            </div>
        </div>
    )
}
export default Login;
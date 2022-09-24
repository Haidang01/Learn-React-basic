import { useState } from 'react';
import './login.scss';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { postLogin } from '../../services/apiService';
import { FcCdLogo } from 'react-icons/fc';
const Login = (props) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleLogin = async () => {
        // validate
        //submit apis
        let data = await postLogin(email, password);
        if (data && data.EC === 0) {
            toast.success(data.EM);
            navigate('/')
        }
        if (data && +data.EC !== 0) {
            toast.error(data.EM);
        }
        console.log('check res', data);
    }
    return (
        <div className="login-container">
            <div className="header">
                <span>Don't have an account yet?</span>
                <button onClick={() => { navigate('/signup') }} >Sign up</button>
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
                        className="form-control" />
                </div>
                <span className='forgot-password'>Forgot password ?</span>
                <div>
                    <button
                        onClick={() => handleLogin()}
                        className='btn-submit'>Login to HoiDanIt</button>
                </div>
                <div className='text-center ' >
                    <span className='back' onClick={() => { navigate('/') }} >&#60; &#60; Go to home Page</span>
                </div>
            </div>
        </div>
    )
}
export default Login;
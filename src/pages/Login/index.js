import React, { useState } from 'react'
import './styles.css'
import loginImage from '../../assets/login_img.avif'
import api from '../../services/api'
import { useNavigate } from 'react-router-dom'

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    async function login(event) {
        event.preventDefault();

        const data = {
            email,password
        };

        try {
            const response = await api.post('api/account/loginuser',data);
            localStorage.setItem('email', email);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('expiration', response.data.expiration);

            navigate('/students');

        } catch (error) {
            console.log('Fail' + error);
        }
    }

    return (
        <div className='login-container'>
            <section className='form'>
                {/* <img src={loginImage} className="login-img" /> */}
                <form className='form-login' onSubmit={login}>
                    <h1 className='title'>Student Registration</h1>

                    <input placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)} />

                    <input type="password" placeholder='Password'
                        value={password}
                        onChange={e => setPassword(e.target.value)} />

                    <button className='button' type="submit">Login</button>
                </form>
            </section>
        </div>
    )
}

export default Login
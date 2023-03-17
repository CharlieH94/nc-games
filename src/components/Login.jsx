import { useContext, useState } from 'react';
import { UserContext } from '../contexts/User';
import { useNavigate } from "react-router-dom";

const Login = () => {
    const { setUser } = useContext(UserContext)
    const [loggedInUser, setLoggedInUser] = useState('jessjelly');
    const [password, setPassword] = useState('iAmGroot');
    const [isDisabled, setIsDisabled] = useState(true)
    
    const navigate = useNavigate();

    const onChange = (event) => {
        const field = event.target.id;
        if (field === 'username') setLoggedInUser(event.target.value);
        if (field === 'password') setPassword(event.target.value);
        if (!isDisabled) setIsDisabled(true);
    }

    if (isDisabled && loggedInUser === 'jessjelly' && password === 'iAmGroot') {
        setIsDisabled(false);
    }

    const onClick = (event) => {
        event.preventDefault();
        setUser({ username: loggedInUser, password: password, authorised: true })
        navigate('/reviews');
    }

    return (
        <form>
            <h2>Login</h2>
            <label htmlFor='username'>Username</label>
            <input type="text" id='username' value={loggedInUser} onChange={onChange} /> <br/>
            <label htmlFor='password' >Password</label>
            <input id='password' value={password} onChange={onChange} type='password'/>
            <button className='start-btn' disabled={isDisabled} onClick={onClick}>Enter a different realm...</button>
        </form>
    )
};

export default Login;
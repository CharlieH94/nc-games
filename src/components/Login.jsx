import { Link } from "react-router-dom";
import { useContext, useState } from 'react';
import { UserContext } from '../contexts/User';

const Login = () => {
    const { user, setUser } = useContext(UserContext)
    const [loggedInUser, setLoggedInUser] = useState('');
    const [password, setPassword] = useState('');

    const onChange = (event) => {
        const field = event.target.id;
        if (field === 'username') setLoggedInUser(event.target.value);
        if (field === 'password') setPassword(event.target.value);
    }

    if (!user.authorised && loggedInUser === 'jessjelly' && password === 'iAmGroot') {
        setUser({username: loggedInUser, password: password, authorised: true})
    } 

    return (
        <form>
            <h2>Login:</h2>
            <label htmlFor='username'>Username: </label>
            <input type="text" id='username' value={loggedInUser} onChange={onChange} /> <br/>
            <label htmlFor='password' >Password: </label>
            <input type="text" id='password' value={password} onChange={onChange}/>
            <Link to='/Reviews'>
                <button className='start-btn' disabled={!user.authorised}>Enter a different realm...</button>
            </Link>
        </form>
    )
};

export default Login;
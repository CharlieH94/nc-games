import { Link } from "react-router-dom";
import { useContext, useState } from 'react';
import { UserContext } from '../contexts/User';

const Login = () => {
    const { user } = useContext(UserContext)
    const [loggedInUser, setLoggedInUser] = useState('');

    const onChange = (event) => {
        setLoggedInUser(event.target.value);
    }

    // const onSubmit = (event)

    return (
        <form>
            <h2>Login:</h2>
            <label htmlFor='username'>Username: </label>
            <input type="text" id='username' value={loggedInUser} onChange={onChange} /> <br/>
            <label htmlFor='password'>Password: </label>
            <input type="text" id='password' />
            <Link to='/Reviews'>
                <button className='start-btn'>Enter a different realm...</button>
            </Link>
        </form>
    )
};

export default Login;
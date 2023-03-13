import { Link } from "react-router-dom";

const Login = () => {
    return (
        <form>
            <h2>Login:</h2>
            <label htmlFor='username'>Username: </label>
            <input type="text" id='username' /> <br/>
            <label htmlFor='password'>Password: </label>
            <input type="text" id='password' />
            <Link to='/Reviews'>
                <button className='start-btn'>Enter a different realm...</button>
            </Link>
        </form>
    )
};

export default Login;
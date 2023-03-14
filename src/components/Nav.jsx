import { Link } from "react-router-dom";

const Nav = () => {
    return (
        <nav className='selection'>
            <ul>
                <li>to</li>
                <li>populate</li>
                <li>later</li>
                <Link to='/reviews'>
                    <li>Reviews</li>
                </Link>
            </ul>
        </nav> 
    )
};

export default Nav;
import { useState, useEffect } from 'react';
import {getUsers} from '../utils/api'
import { useContext } from 'react';
import { UserContext } from '../contexts/User';

const Header = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const { user, setUser } = useContext(UserContext)

    useEffect(() => {
        getUsers().then(usersArray => {
            const existingUser = usersArray.filter(element => element.username === user.username);
            console.log(existingUser)
            if (!currentUser && existingUser) setCurrentUser(existingUser[0]);
        })
    }, [user, currentUser])

    const onClick = (event) => {
        event.preventDefault();
        setUser({ ...user, authorised: false });
        setCurrentUser(null);
    }

    return (
        <header>
            <h1>ÑC Gämès</h1>
            {user.authorised && currentUser && (
            <div className='user'>
                <p id='login-name'>{user.username}</p>
                    <img src={currentUser.avatar_url} alt={`${currentUser.name}'s avatar`} id='avatar' />
                    <button id='user-btn' onClick={onClick}>Log Out</button>
            </div>)}
        </header>
    )
};

export default Header;
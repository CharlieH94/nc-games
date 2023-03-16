const Header = ({user}) => {
    return (
        <header>
            <h1>ÑC Gämès</h1>
            {user.username && <p id='login-name'><em>Logged in as: </em><strong>{user.username}</strong></p>}
        </header>
    )
};

export default Header;
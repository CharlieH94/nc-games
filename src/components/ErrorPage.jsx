import Nav from "./Nav";

const ErrorPage = ({ error }) => {
    const message = error ? error : 'Page Not Found'
    return (
        <>
            <Nav />
            <h2 id='error-msg'>{message}</h2>
        </>
    );
};

export default ErrorPage;
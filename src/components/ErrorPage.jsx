const ErrorPage = ({ error }) => {
    const message = error ? error : 'Page Not Found'
    return <h2 id='error-msg'>{message}</h2>
};

export default ErrorPage;
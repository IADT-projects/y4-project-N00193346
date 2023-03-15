import LoginForm from "../components/LoginForm";

const Login = (props) => {
  return (
    <>
      {!props.authenticated ? (
        <>
          <LoginForm onAuthenticated={props.onAuthenticated} />
        </>
      ) : (
        <p>You are logged in</p>
      )}
    </>
  );
};

export default Login;

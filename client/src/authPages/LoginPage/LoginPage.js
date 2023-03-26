import React, { useState, useEffect } from "react";
import AuthBox from "../../Components/AuthBox";
import LoginFormInputs from "./LoginFormInputs";
import LoginPageFooter from "./LoginPageFooter";
import LoginPageHeader from "./LoginPageHeader";
import { validateLoginForm } from "../../utils/validators";
import { connect } from "react-redux";
import { getActions } from "../../store/actions/authActions";
import { useNavigate } from "react-router-dom";

const LoginPage = ({ login }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isFormValid, setFormValid] = useState(false);

  useEffect(() => {
    setFormValid(validateLoginForm({ email, password }));
  }, [email, password, setFormValid]);

  const handleLogin = () => {
    const userDetails = { email, password };
    login(userDetails, navigate);
  };

  return (
    <>
      <AuthBox>
        <LoginPageHeader />
        <LoginFormInputs
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
        />
        <LoginPageFooter isFormValid={isFormValid} handleLogin={handleLogin} />
      </AuthBox>
    </>
  );
};

const mapActionsToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  };
};

export default connect(null, mapActionsToProps)(LoginPage);

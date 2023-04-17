import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";

import AuthBox from "../../Components/AuthBox";
import RegisterFormInputs from "./RegisterFormInputs";
import RegisterPageFooter from "./RegisterPageFooter";
import { validateRegisterForm } from "../../utils/validators";
import { connect } from "react-redux";
import { getActions } from "../../store/actions/authActions";
import { useNavigate } from "react-router-dom";

const RegisterPage = ({ register }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [account, setAccount] = useState("");

  const [isFormValid, setFormValid] = useState(false);

  const handleRegister = () => {
    const userDetails = { email, password, username, account };
    register(userDetails, navigate);
  };

  useEffect(() => {
    setFormValid(
      validateRegisterForm({
        email,
        username,
        password,
        account,
      })
    );
  }, [email, password, username, account, setFormValid]);

  return (
    <>
      <AuthBox height={550}>
        <Typography variant="h5" sx={{ color: "white" }}>
          Create an Account
        </Typography>
        <RegisterFormInputs
          email={email}
          setEmail={setEmail}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          account={account}
          setAccount={setAccount}
        />
        <RegisterPageFooter
          handleRegister={handleRegister}
          isFormValid={isFormValid}
        />
      </AuthBox>
    </>
  );
};

const mapActionsToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  };
};

export default connect(null, mapActionsToProps)(RegisterPage);

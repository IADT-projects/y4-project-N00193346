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

  const [isFormValid, setFormValid] = useState(false);

  const handleRegister = () => {
    const userDetails = { email, password, username };
    register(userDetails, navigate);
  };

  useEffect(() => {
    setFormValid(
      validateRegisterForm({
        email,
        username,
        password,
      })
    );
  }, [email, password, username, setFormValid]);

  return (
    <>
      <AuthBox>
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

import React from "react";
import PrimaryButton from "../../Components/PrimaryButton";
import RedirectInfo from "../../Components/RedirectInfo";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "@mui/material";

const getFormNotValidMessage = () => {
  return "Email and Password must contain 6-12 characters";
};

const getFormValidMessage = () => {
  return "Press to log in!";
};

const LoginPageFooter = ({ handleLogin, isFormValid }) => {
  const navigate = useNavigate();

  const handlePushtoRegisterPage = () => {
    navigate("/register");
  };

  return (
    <>
      <Tooltip
        title={!isFormValid ? getFormNotValidMessage() : getFormValidMessage()}
      >
        <div>
          <PrimaryButton
            label="Log In"
            additionalStyles={{ marginTop: "30px" }}
            disabled={!isFormValid}
            onClick={handleLogin}
          />
        </div>
      </Tooltip>
      <RedirectInfo
        text="No Account? "
        redirectText="Register"
        additionalStyles={{ marginTop: "5px" }}
        redirectHandler={handlePushtoRegisterPage}
      />
    </>
  );
};

export default LoginPageFooter;

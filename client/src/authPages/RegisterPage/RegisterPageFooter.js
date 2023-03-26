import React from "react";
import PrimaryButton from "../../Components/PrimaryButton";
import RedirectInfo from "../../Components/RedirectInfo";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "@mui/material";

const getFormNotValidMessage = () => {
  return "All inputs fields required";
};

const getFormValidMessage = () => {
  return "Press to register!";
};

const RegisterPageFooter = ({ handleRegister, isFormValid }) => {
  const navigate = useNavigate();

  const handlePushtoLoginPage = () => {
    navigate("/login");
  };

  return (
    <>
      <Tooltip
        title={!isFormValid ? getFormNotValidMessage() : getFormValidMessage()}
      >
        <div>
          <PrimaryButton
            label="Register"
            additionalStyles={{ marginTop: "30px" }}
            disabled={!isFormValid}
            onClick={handleRegister}
          />
        </div>
      </Tooltip>
      <RedirectInfo
        text="Already have an account? "
        redirectText="Login"
        additionalStyles={{ marginTop: "5px" }}
        redirectHandler={handlePushtoLoginPage}
      />
    </>
  );
};
export default RegisterPageFooter;

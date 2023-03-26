import React from "react";
import FormInputs from "../../Components/FormInputs";

const LoginFormInputs = ({ email, setEmail, password, setPassword }) => {
  return (
    <>
      <FormInputs
        value={email}
        setValue={setEmail}
        label="Email"
        type="text"
        placeholder="Enter Email"
      />
      <FormInputs
        value={password}
        setValue={setPassword}
        label="Password"
        type="password"
        placeholder="Enter Password"
      />
    </>
  );
};

export default LoginFormInputs;

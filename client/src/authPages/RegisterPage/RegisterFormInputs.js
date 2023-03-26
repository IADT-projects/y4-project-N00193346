import React from "react";
import FormInputs from "../../Components/FormInputs";

const RegisterFormInputs = (props) => {
  const { email, setEmail, username, setUsername, password, setPassword } =
    props;
  return (
    <>
      <FormInputs
        value={email}
        setValue={setEmail}
        label="Email Address"
        type="text"
        placeholder="Enter Email Address"
      />
      <FormInputs
        value={username}
        setValue={setUsername}
        label="Username"
        type="text"
        placeholder="Enter Username"
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

export default RegisterFormInputs;

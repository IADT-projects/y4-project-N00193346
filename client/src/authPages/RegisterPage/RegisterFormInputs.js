import React from "react";

import FormInputs from "../../Components/FormInputs";
import DropFormInput from "../../Components/DropFormInput";

const RegisterFormInputs = (props) => {
  const {
    email,
    setEmail,
    username,
    setUsername,
    password,
    setPassword,
    account,
    setAccount,
  } = props;

  const dropdownOptions = [
    { value: "student", label: "Student" },
    { value: "instructor", label: "Instructor" },
  ];

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
      <DropFormInput
        placeholder="Select an Account"
        value={account}
        setValue={setAccount}
        label="Account"
        type="dropdown"
        options={dropdownOptions}
      />
    </>
  );
};

export default RegisterFormInputs;

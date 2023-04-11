import React from "react";
import { Typography } from "@mui/material";

function LoginPageHeader() {
  return (
    <>
      <Typography variant="h5" sx={{ color: "white" }}>
        Intelligent Instruments Interface
      </Typography>
      <Typography sx={{ color: "#b9bbbe" }}>Sign in </Typography>
    </>
  );
}

export default LoginPageHeader;

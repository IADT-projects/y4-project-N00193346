import React from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/system";
import guitarImage from "./../authPages/Images/guitar.jpg";

const BoxContainer = styled("div")({
  width: "100%",
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundImage: `url(${guitarImage})`,
  backgroundSize: "cover",
});
function AuthBox(props) {
  return (
    <>
      <BoxContainer>
        <Box
          sx={{
            width: 700,
            height: 400,
            bgcolor: "rgba(0, 0, 0, 0.5)",
            borderRadius: "5px",
            boxShadow: "0 2px 10px 0 rgb ( 0 0 0 /20%)",
            display: "flex",
            flexDirection: "column",
            padding: "25px",
          }}
        >
          {props.children}
        </Box>
      </BoxContainer>
    </>
  );
}

export default AuthBox;

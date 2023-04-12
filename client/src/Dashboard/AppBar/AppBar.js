import React from "react";
import { styled } from "@mui/system";
import DropdownMenu from "./DropdownMenu";

import ChosenOptionLabel from "./ChosenOptionLabel";

const MainContainer = styled("div")({
  position: "absolute",
  right: "0",
  top: "0",
  height: "5vh",
  borderRadius: "10px",
  background: "rgba(0, 0, 0, 0.8)",
  margin: "10px",
  width: "calc(100% - 360px)",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0 15px",
});

const AppBar = () => {
  return (
    <MainContainer>
      <ChosenOptionLabel />
      <DropdownMenu />
    </MainContainer>
  );
};

export default AppBar;

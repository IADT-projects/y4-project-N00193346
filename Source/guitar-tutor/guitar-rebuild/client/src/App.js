import React from "react";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import styled from "styled-components";

import Videos from "./components/Videos";
import Options from "./components/Options";
import Notifications from "./components/Notifications";

const App = () => {
  return (
    <div>
      <AppBar position="static" color="inherit">
        <Typography variant="h2" align="center">
          Video Chat
        </Typography>
      </AppBar>

      <Videos />
      <Options>
        <Notifications />
      </Options>
    </div>
  );
};

export default App;

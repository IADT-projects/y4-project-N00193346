import React, { useContext, useState } from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import styled from "styled-components";
import { CopyToClipboard } from "react-copy-to-clipboard";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PhoneIcon from "@mui/icons-material/Phone";
import PhoneDisabledIcon from "@mui/icons-material/PhoneDisabled";

import { SocketContext } from "../SocketContext";
import { Typography } from "@mui/material";

const Options = ({ children }) => {
  const { myId, callAccepted, name, setName, callEnd, leaveCall, callUser } =
    useContext(SocketContext);
  const [idToCall, setIdToCall] = useState("");

  return (
    <div>
      <Container>
        <Paper elevation={10}>
          <form noValidate autoComplete="off">
            <Grid container>
              <Grid item md={6}>
                <Typography gutterBottom variant="h6">
                  Account Info
                </Typography>
                <TextField
                  label="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  fullWidth
                />
                <CopyToClipboard text={myId}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    startIcon={<AssignmentIcon fontSize="large" />}
                  >
                    Copy ID
                  </Button>
                </CopyToClipboard>
              </Grid>
              <Grid item md={6}>
                <Typography gutterBottom variant="h6">
                  Make a Call
                </Typography>
                <TextField
                  label="Id to Call"
                  value={idToCall}
                  onChange={(e) => setIdToCall(e.target.value)}
                  fullWidth
                />
                {callAccepted && !callEnd ? (
                  <Button
                    variant="contained"
                    color="secondary"
                    fullWidth
                    onClick={leaveCall}
                    startIcon={<PhoneDisabledIcon fontSize="large" />}
                  >
                    Hang Up
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={() => callUser(idToCall)}
                    startIcon={<PhoneIcon fontSize="large" />}
                  >
                    Call
                  </Button>
                )}
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default Options;

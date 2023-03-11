import React, { useContext } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import styled from "styled-components";

import { SocketContext } from "../SocketContext";

export const VideoContainer = styled.div``;

export const VideoStream = styled.video`
  background-color: black;
  height: 300px;
`;

const Videos = () => {
  const {
    name,
    callAccepted,
    localVideo,
    remoteVideo,
    callEnded,
    stream,
    call,
  } = useContext(SocketContext);
  return (
    <div>
      {stream && (
        <Paper>
          <Grid>
            <Typography variant="h5" gutterBottom>
              {name || "Name"}
            </Typography>
            <VideoStream
              ref={localVideo}
              autoPlay
              playsInline
              className="local"
              muted
            />
          </Grid>
        </Paper>
      )}
      {callAccepted && !callEnded && (
        <Paper>
          <Grid>
            <Typography variant="h5" gutterBottom>
              {call.name || "Name"}
            </Typography>
            <VideoStream
              ref={remoteVideo}
              autoPlay
              playsInline
              className="local"
              muted
            />
          </Grid>
        </Paper>
      )}
    </div>
  );
};

export default Videos;

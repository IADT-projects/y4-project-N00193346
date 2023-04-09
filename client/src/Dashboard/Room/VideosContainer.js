import React from "react";
import { styled } from "@mui/system";
import { connect } from "react-redux";
import Video from "./Video";
import ChordDisplay from "../Chord/ChordDisplay";

const MainContainer = styled("div")({
  position: "relative",
  width: "100%",
  height: "100%",
});

const VideoWrapper = styled("div")({
  position: "absolute",
  top: 0,
  right: 0,
});

const LocalVideoWrapper = styled("div")({
  position: "absolute",
  bottom: 0,
  left: 0,
});

const ChordDisplayWrapper = styled("div")({
  position: "absolute",
  bottom: 0,
  right: 0,
});

const VideosContainer = ({
  localStream,
  remoteStreams,
  screenSharingStream,
}) => {
  return (
    <MainContainer>
      {remoteStreams.map((stream) => (
        <Video stream={stream} key={stream.id} />
      ))}
      {localStream && (
        <LocalVideoWrapper>
          <Video stream={localStream} isLocalStream />
        </LocalVideoWrapper>
      )}
      {screenSharingStream && (
        <VideoWrapper>
          <Video stream={screenSharingStream} isLocalStream />
        </VideoWrapper>
      )}
      <ChordDisplayWrapper>
        <ChordDisplay />
      </ChordDisplayWrapper>
    </MainContainer>
  );
};

const mapStoreStateToProps = ({ room }) => {
  return {
    ...room,
  };
};

export default connect(mapStoreStateToProps)(VideosContainer);

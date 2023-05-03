import React, { useEffect } from "react";
import { styled } from "@mui/system";
import { connect } from "react-redux";
import Video from "./Video";
import ChordDisplay from "../Chord/ChordDisplay";

const MainContainer = styled("div")({
  position: "relative",
  width: "100%",
  height: "100%",
  overflow: "hidden",
});

const VideoWrapper = styled("div")({
  position: "absolute",
  marginLeft: "auto",
  marginRight: "auto",
  left: "30vw",
  top: "10vh",
  right: 0,
});

const LocalVideoWrapper = styled("div")({
  position: "absolute",
  bottom: "5%",
  left: 20,
  zIndex: 1,
});

const ChordDisplayWrapper = styled("div")({
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "flex-end",
  width: "100%",
  height: "100%",
  marginRight: "20px",
  zIndex: 2,
});

const VideosContainer = ({
  localStream,
  remoteStreams,
  screenSharingStream,
  isRoomMinimized,
}) => {
  const countVideoTracks = (stream) => {
    let videoTracksCount = 0;
    if (stream && stream.getVideoTracks) {
      videoTracksCount = stream.getVideoTracks().length;
    }
    return videoTracksCount;
  };

  useEffect(() => {
    remoteStreams.forEach((stream) => {
      const videoTracksCount = countVideoTracks(stream);
      console.log(
        `Remote Stream ID: ${stream.id}, Video Tracks Count: ${videoTracksCount}`
      );
    });
  }, [remoteStreams]);

  return (
    <MainContainer>
      <VideoWrapper>
        {remoteStreams.map((stream) => (
          <Video stream={stream} key={stream.id} />
        ))}
      </VideoWrapper>
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
        <ChordDisplay style={{ zIndex: 2 }} />
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

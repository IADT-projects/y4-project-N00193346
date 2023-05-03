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

const VideoWrapper = styled("div")(({ isRoomMinimized }) => ({
  position: "absolute",

  left: isRoomMinimized ? "0px" : "30vw",
  top: isRoomMinimized ? "0" : "10vh",
  right: isRoomMinimized ? "0px" : "0",
  width: isRoomMinimized ? "200%" : "initial",
  height: isRoomMinimized ? "90%" : "initial",
}));

const LocalVideoWrapper = styled("div")(({ isRoomMinimized }) => ({
  position: "absolute",
  bottom: "5%",
  left: 20,
  zIndex: 1,
  visibility: isRoomMinimized ? "hidden" : "visible",
}));

const ChordDisplayWrapper = styled("div")(({ isRoomMinimized }) => ({
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "flex-end",
  width: "100%",
  height: "100%",
  marginRight: "20px",
  zIndex: 2,
  visibility: isRoomMinimized ? "hidden" : "visible",
}));

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
      <VideoWrapper isRoomMinimized={isRoomMinimized}>
        {remoteStreams.map((stream) => (
          <Video stream={stream} key={stream.id} />
        ))}
      </VideoWrapper>
      {localStream && (
        <LocalVideoWrapper isRoomMinimized={isRoomMinimized}>
          <Video stream={localStream} isLocalStream />
        </LocalVideoWrapper>
      )}
      {screenSharingStream && (
        <VideoWrapper>
          <Video stream={screenSharingStream} isLocalStream />
        </VideoWrapper>
      )}
      <ChordDisplayWrapper isRoomMinimized={isRoomMinimized}>
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

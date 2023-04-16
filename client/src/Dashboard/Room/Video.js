import React, { useEffect, useRef } from "react";
import { styled } from "@mui/system";

const MainContainer = styled("div")({
  // height: "50%",
  // width: "100%",
  // // backgroundColor: "black",
  // // borderRadius: "8px",
});

const VideoEl = styled("video")(({ isLocalStream }) => ({
  width: isLocalStream ? "300px" : "500px",
  height: isLocalStream ? "300px" : "500px",
}));

const Video = ({ stream, isLocalStream }) => {
  const videoRef = useRef();

  useEffect(() => {
    const video = videoRef.current;
    video.srcObject = stream;

    video.onloadedmetadata = () => {
      video.play();
    };
  }, [stream]);

  return (
    <MainContainer>
      <VideoEl
        ref={videoRef}
        autoPlay
        muted={isLocalStream ? true : false}
        isLocalStream={isLocalStream}
      />
    </MainContainer>
  );
};

export default Video;

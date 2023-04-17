import React, { useEffect, useRef } from "react";
import { styled } from "@mui/system";

const MainContainer = styled("div")({
  height: "50%",
  width: "100%",
  // backgroundColor: "black",
  // borderRadius: "8px",
});

const VideoEl = styled("video")(({ isLocalStream }) => ({
  width: isLocalStream ? "300px" : "500px",
  height: isLocalStream ? "300px" : "500px",
}));

const Video = ({ stream, isLocalStream }) => {
  const videoRefs = useRef([]);

  useEffect(() => {
    const videoTracks = stream.getVideoTracks();
    if (videoTracks.length === 2) {
      // If there are 2 video tracks, apply each track to its own videoEl
      videoTracks.forEach((track, index) => {
        const video = videoRefs.current[index];
        video.srcObject = new MediaStream([track]);
        video.onloadedmetadata = () => {
          video.play();
        };
      });
    } else {
      // If there is only 1 video track, apply it to the existing videoEl
      const video = videoRefs.current[0];
      video.srcObject = stream;
      video.onloadedmetadata = () => {
        video.play();
      };
    }
  }, [stream]);

  return (
    <MainContainer>
      {Array.from({ length: 2 }).map((_, index) => (
        <VideoEl
          key={index}
          ref={(ref) => (videoRefs.current[index] = ref)}
          autoPlay
          muted={isLocalStream ? true : false}
          isLocalStream={isLocalStream}
        />
      ))}
    </MainContainer>
  );
};

export default Video;

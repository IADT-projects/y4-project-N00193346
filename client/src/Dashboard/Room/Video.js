import React, { useEffect, useRef } from "react";
import { styled } from "@mui/system";

const MainContainer = styled("div")({
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gridGap: "16px",
});

const VideoEl = styled("video")(({ isLocalStream }) => ({
  width: isLocalStream ? "350px" : "100%",
  height: isLocalStream ? "350px" : "100%",
  objectFit: "contain",
  border: isLocalStream ? "5px solid blue" : "none",

  "@media (max-width: 1000px)": {
    width: isLocalStream ? "10rem" : "30rem",
    height: isLocalStream ? "10rem" : "20rem",
  },
}));

const Video = ({ stream, isLocalStream }) => {
  const videoRefs = useRef([]);

  const videoTracks = stream.getVideoTracks();
  const audioTracks = stream.getAudioTracks();

  useEffect(() => {
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

    // Assign audio tracks to the first video element
    if (audioTracks.length > 0) {
      console.log("Audio Tracks:", audioTracks);
      const video = videoRefs.current[0];
      video.srcObject.addTrack(audioTracks[0]);
    }
  }, [stream]);

  return (
    <MainContainer>
      {Array.from({ length: videoTracks.length }).map((_, index) => (
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

import "./App.css";
import styled from "styled-components";

export const VideoContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2em;
`;

export const VideoStream = styled.video`
  background-color: black;
  width: 100%;
  height: 300px;
`;

function App() {
  let localStream;
  let remoteStream;

  let init = async () => {
    localStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    document.getElementById("user-1").srcObject = localStream;
  };

  init();

  return (
    <>
      <VideoContainer>
        <VideoStream
          class="video-player"
          id="user-1"
          autoPlay
          playsInline
        ></VideoStream>
        <VideoStream
          class="video-player"
          id="user-2"
          autoPlay
          playsInline
        ></VideoStream>
      </VideoContainer>
    </>
  );
}

export default App;

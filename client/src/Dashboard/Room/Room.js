import React, { useState } from "react";
import { styled } from "@mui/system";
import ResizeRoomButton from "./ResizeRoomButton";
import VideosContainer from "./VideosContainer";
import RoomButtons from "./RoomButtons/RoomButtons";

const MainContainer = styled("div")({
  position: "absolute",
  borderRadius: "8px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#202225",
});

const fullScreenRoomStyle = {
  width: "100%",
  height: "80vh",
};

const minimizedRoomStyle = {
  bottom: "20vh",
  right: "0px",
  width: "20%",
  height: "30%",
};

const Room = () => {
  const [isRoomMinimized, setIsRoomMinimized] = useState(false);

  const roomResizeHandler = () => {
    setIsRoomMinimized(!isRoomMinimized);
  };

  return (
    <MainContainer
      style={isRoomMinimized ? minimizedRoomStyle : fullScreenRoomStyle}
    >
      <VideosContainer isRoomMinimized={isRoomMinimized} />
      <RoomButtons />
      <ResizeRoomButton
        isRoomMinimized={isRoomMinimized}
        handleRoomResize={roomResizeHandler}
      />
    </MainContainer>
  );
};

export default Room;

import React from "react";
import { styled } from "@mui/system";
import CameraButton from "./CameraButton";
import MicButton from "./MicButton";
import CloseRoomButton from "./CloseRoomButton";
import ScreenShareButton from "./ScreenShareButton";
import { connect } from "react-redux";
import { getActions } from "../../../store/actions/roomActions";

const MainContainer = styled("div")({
  height: "10%",
  width: "100%",
  backgroundColor: "#1A71FF",
  borderTopLeftRadius: "8px",
  borderTopRightRadius: "8px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const RoomButtons = (props) => {
  const { localStream, isUserJoinedWithOnlyAudio } = props;

  return (
    <MainContainer>
      {!isUserJoinedWithOnlyAudio && <ScreenShareButton {...props} />}

      <MicButton localStream={localStream} style={{ fontSize: "36px" }} />

      {!isUserJoinedWithOnlyAudio && <CameraButton localStream={localStream} />}
      <CloseRoomButton style={{ fontSize: 60 }} />
    </MainContainer>
  );
};

const mapStoreStateToProps = ({ room }) => {
  return {
    ...room,
  };
};

const mapActionsToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  };
};

export default connect(mapStoreStateToProps, mapActionsToProps)(RoomButtons);

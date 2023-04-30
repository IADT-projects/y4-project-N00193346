import React from "react";
import { styled } from "@mui/system";

import CreateRoomButton from "./CreateRoomButton";
import { connect } from "react-redux";
import ActiveRoomButton from "./ActiveRoomButton";
import RoomTitle from "./RoomTitle";

const MainContainer = styled("div")({
  width: "72px",
  height: "97%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  borderRadius: "10px",
  background: "rgba(0, 0, 0, 0.8)",
  margin: "10px",
});

const SideBar = ({ activeRooms, isUserInRoom }) => {
  return (
    <MainContainer>
      <RoomTitle title="Rooms" />
      <CreateRoomButton isUserInRoom={isUserInRoom} />
      {activeRooms.map((room) => (
        <ActiveRoomButton
          roomId={room.roomId}
          creatorUsername={room.creatorUsername}
          amountOfParticipants={room.participants.length}
          key={room.roomId}
          isUserInRoom={isUserInRoom}
        />
      ))}
    </MainContainer>
  );
};

const mapStoreStateToProps = ({ room }) => {
  return {
    ...room,
  };
};

export default connect(mapStoreStateToProps)(SideBar);

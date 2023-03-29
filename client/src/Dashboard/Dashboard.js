import React, { useEffect } from "react";
import { styled } from "@mui/system";
import SideBar from "./SideBar/SideBar";
import FriendsSideBar from "./FriendsSideBar/FriendsSideBar";
import Messenger from "./Messenger/Messenger";
import AppBar from "./AppBar/AppBar";
import { logout } from "../utils/auth";
import { connect } from "react-redux";
import { getActions } from "../store/actions/authActions";
import { connectWithSocketServer } from "../realtimeCommunication/socketConnection";

import Room from "./Room/Room";
import Amp from "./Amp/Amp";
import Chord from "./Chord/Chord";

const Container = styled("div")({
  width: "100%",
  height: "80vh",
  display: "flex",
});

const BottomContainer = styled("div")({
  width: "100%",
  height: "10vh",
  display: "flex",
  justifyContent: "space-between",
});
const Dashboard = ({ setUserDetails, isUserInRoom }) => {
  useEffect(() => {
    const userDetails = localStorage.getItem("user");

    if (!userDetails) {
      logout();
    } else {
      setUserDetails(JSON.parse(userDetails));
      connectWithSocketServer(JSON.parse(userDetails));
    }
  }, []);

  return (
    <>
      <Container>
        <SideBar />
        <FriendsSideBar />
        <Messenger />
        <AppBar />
        {isUserInRoom && <Room />}
      </Container>
      <BottomContainer>
        <Amp />
        <Chord />
      </BottomContainer>
    </>
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

export default connect(mapStoreStateToProps, mapActionsToProps)(Dashboard);

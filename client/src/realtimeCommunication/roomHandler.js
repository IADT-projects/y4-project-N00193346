import store from "../store/store";
import {
  setOpenRoom,
  setRoomDetails,
  setActiveRooms,
  setLocalStream,
  setRemoteStreams,
  setScreenSharingStream,
  setIsUserJoinedOnlyWithAudio,
} from "../store/actions/roomActions";
import * as socketConnection from "./socketConnection";
import * as webRTCHandler from "./webRTCHandler";

export const createNewRoom = () => {
  const successCalbackFunc = () => {
    store.dispatch(setOpenRoom(true, true));

    const audioOnly = store.getState().room.audioOnly;
    store.dispatch(setIsUserJoinedOnlyWithAudio(audioOnly));
    socketConnection.createNewRoom();
  };

  const audioOnly = store.getState().room.audioOnly;
  webRTCHandler.getLocalStreamPreview(audioOnly, successCalbackFunc);
};

export const newRoomCreated = (data) => {
  const { roomDetails } = data;
  store.dispatch(setRoomDetails(roomDetails));
};

export const updateActiveRooms = (data) => {
  const { activeRooms } = data;
  //Get friends of user
  const friends = store.getState().friends.friends;
  const rooms = [];

  //Get User Id
  const userId = store.getState().auth.userDetails?._id;

  //Go through all rooms
  activeRooms.forEach((room) => {
    //Check if user created the room
    const isRoomCreatedByMe = room.roomCreator.userId === userId;

    if (isRoomCreatedByMe) {
      //Show Room named as "Me" if user created
      rooms.push({ ...room, creatorUsername: "Me" });
    } else {
      //Show Room with friend name if friend created
      friends.forEach((f) => {
        if (f.id === room.roomCreator.userId) {
          rooms.push({ ...room, creatorUsername: f.username });
        }
      });
    }
  });

  store.dispatch(setActiveRooms(rooms));
};

export const joinRoom = (roomId) => {
  const successCalbackFunc = () => {
    store.dispatch(setRoomDetails({ roomId }));
    store.dispatch(setOpenRoom(false, true));
    const audioOnly = store.getState().room.audioOnly;
    store.dispatch(setIsUserJoinedOnlyWithAudio(audioOnly));
    socketConnection.joinRoom({ roomId });
  };

  const audioOnly = store.getState().room.audioOnly;
  webRTCHandler.getLocalStreamPreview(audioOnly, successCalbackFunc);
};

export const leaveRoom = () => {
  //Get room Id from redux
  const roomId = store.getState().room.roomDetails.roomId;

  //Check if user has a local stream
  const localStream = store.getState().room.localStream;
  if (localStream) {
    //Stop all tracks
    localStream.getTracks().forEach((track) => track.stop());
    //Set to null
    store.dispatch(setLocalStream(null));
  }

  //Check if user sharing screen
  const screenSharingStream = store.getState().room.screenSharingStream;
  if (screenSharingStream) {
    //Stop all tracks
    screenSharingStream.getTracks().forEach((track) => track.stop());
    store.dispatch(setScreenSharingStream(null));
  }

  // Set remote streams to empty array
  store.dispatch(setRemoteStreams([]));
  // Close peer connections
  webRTCHandler.closeAllConnections();

  //Leave room
  socketConnection.leaveRoom({ roomId });
  //Set room details to null
  store.dispatch(setRoomDetails(null));
  //Remove user from room
  store.dispatch(setOpenRoom(false, false));
};

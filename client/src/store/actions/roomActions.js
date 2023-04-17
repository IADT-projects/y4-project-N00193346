export const roomActions = {
  OPEN_ROOM: "ROOM.OPEN_ROOM",
  SET_ROOM_DETAILS: "ROOM.SET_ROOM_DETAILS",
  SET_ACTIVE_ROOMS: "ROOM.SET_ACTIVE_ROOMS",
  SET_LOCAL_STREAM: "ROOM.SET_LOCAL_STREAM",

  SET_GUITAR_AUDIO: "ROOM.SET_GUITAR_AUDIO",
  SET_REMOTE_STREAMS: "ROOM.SET_REMOTE_STREAMS",
  SET_AUDIO_ONLY: "ROOM.SET_AUDIO_ONLY",
  SET_SCREEN_SHARE_STREAM: "ROOM.SET_SCREEN_SHARE_STREAM",
  SET_IS_USER_JOINED_WITH_ONLY_AUDIO: "ROOM.SET_IS_USER_JOINED_WITH_ONLY_AUDIO",
  UPDATE_SOURCE: "ROOM.UPDATE_SOURCE",
  SET_GUITAR_STREAM: "ROOM.SET_GUITAR_STREAM",
  SET_GUITAR_CHORD: "ROOM.SET_GUITAR_CHORD",
  SET_NUM_CAMERAS: "ROOM.SET_NUM_CAMERAS",
};

export const setOpenRoom = (
  isUserRoomCreator = false,
  isUserInRoom = false
) => {
  return {
    type: roomActions.OPEN_ROOM,
    isUserRoomCreator,
    isUserInRoom,
  };
};

export const getActions = (dispatch) => {
  return {
    setAudioOnly: (audioOnly) => dispatch(setAudioOnly(audioOnly)),
    setScreenSharingStream: (stream) => {
      dispatch(setScreenSharingStream(stream));
    },
  };
};

export const setRoomDetails = (roomDetails) => {
  return {
    type: roomActions.SET_ROOM_DETAILS,
    roomDetails,
  };
};

export const setActiveRooms = (activeRooms) => {
  return {
    type: roomActions.SET_ACTIVE_ROOMS,
    activeRooms,
  };
};

export const setLocalStream = (localStream) => {
  return {
    type: roomActions.SET_LOCAL_STREAM,
    localStream,
  };
};

export const setNumCameras = (numCameras) => {
  console.log("Setting num cameras" + numCameras);
  return {
    type: roomActions.SET_NUM_CAMERAS,
    numCameras,
  };
};

export const setGuitarStream = (guitarStream) => {
  return {
    type: roomActions.SET_GUITAR_STREAM,
    guitarStream,
  };
};

export const setGuitarChord = (guitarChord) => {
  return {
    type: roomActions.SET_GUITAR_CHORD,
    guitarChord,
  };
};

export const setAudioOnly = (audioOnly) => {
  return {
    type: roomActions.SET_AUDIO_ONLY,
    audioOnly,
  };
};

export const setRemoteStreams = (remoteStreams) => {
  return {
    type: roomActions.SET_REMOTE_STREAMS,
    remoteStreams,
  };
};

export const setScreenSharingStream = (stream) => {
  return {
    type: roomActions.SET_SCREEN_SHARE_STREAM,
    isScreenSharingActive: stream ? true : false,
    screenSharingStream: stream || null,
  };
};

export const setIsUserJoinedOnlyWithAudio = (onlyWithAudio) => {
  return {
    type: roomActions.SET_IS_USER_JOINED_WITH_ONLY_AUDIO,
    isUserJoinedWithOnlyAudio: onlyWithAudio,
  };
};

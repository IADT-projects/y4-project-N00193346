import { roomActions } from "../actions/roomActions";

const initState = {
  isUserInRoom: false,
  isUserRoomCreator: false,
  roomDetails: null,
  activeRooms: [],
  localStream: null,
  numCameras: 1,
  remoteStreams: [],
  audioOnly: false,
  screenSharingStream: null,
  isScreenSharingActive: false,
  isUserJoinedWithOnlyAudio: false,
  //Guitar params
  guitarContext: new AudioContext(),
  source: null,
  guitarStream: null,
  guitarChord: null,
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case roomActions.OPEN_ROOM:
      return {
        ...state,
        isUserInRoom: action.isUserInRoom,
        isUserRoomCreator: action.isUserRoomCreator,
      };
    case roomActions.SET_ROOM_DETAILS:
      return {
        ...state,
        roomDetails: action.roomDetails,
      };
    case roomActions.SET_ACTIVE_ROOMS:
      return {
        ...state,
        activeRooms: action.activeRooms,
      };
    case roomActions.SET_LOCAL_STREAM:
      return {
        ...state,
        localStream: action.localStream,
      };

    case roomActions.SET_NUM_CAMERAS:
      console.log("Setting number of cameras to " + action.numCameras);
      return {
        ...state,
        numCameras: action.numCameras,
      };
    case roomActions.SET_GUITAR_STREAM:
      // console.log("Updating Guitar Audio in store... " + action.guitarStream);
      return {
        ...state,
        guitarStream: action.guitarStream,
      };
    case roomActions.SET_GUITAR_CHORD:
      // console.log("Updating Guitar Chord in store... " + action.guitarChord);
      return {
        ...state,
        guitarChord: action.guitarChord,
      };
    case roomActions.UPDATE_SOURCE:
      // console.log("Updating source in store...");
      return {
        ...state,
        source: action.source,
      };

    case roomActions.SET_AUDIO_ONLY:
      return {
        ...state,
        audioOnly: action.audioOnly,
      };
    case roomActions.SET_REMOTE_STREAMS:
      return {
        ...state,
        remoteStreams: action.remoteStreams,
      };
    case roomActions.SET_SCREEN_SHARE_STREAM:
      return {
        ...state,
        screenSharingStream: action.screenSharingStream,
        isScreenSharingActive: action.isScreenSharingActive,
      };
    case roomActions.SET_IS_USER_JOINED_WITH_ONLY_AUDIO:
      return {
        ...state,
        isUserJoinedWithOnlyAudio: action.isUserJoinedWithOnlyAudio,
      };
    default:
      return state;
  }
};

export default reducer;

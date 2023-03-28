import { roomActions } from "../actions/roomActions";

const initState = {
  isUserInRoom: false,
  isUserRoomCreator: false,
  roomDetails: null,
  activeRooms: [],
  localStream: null,
  remoteStreams: [],
  audioOnly: false,
  screenSharingStream: null,
  isScreenSharingActive: false,
  isUserJoinedWithOnlyAudio: false,
  //Guitar params
  guitarContext: new AudioContext(),
  source: null,
  gainNode: null,
  bassEQ: null,
  midEQ: null,
  trebleEQ: null,
  volume: 0.5,
  bass: 0,
  mid: 0,
  treble: 0,
  guitarAudio: null,
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
    case roomActions.SET_GUITAR_AUDIO:
      console.log("Updating Source in store... " + action.source);
      return {
        ...state,
        guitarContext: action.guitarContext,
        source: action.source,
        gainNode: action.gainNode,
        bassEQ: action.bassEQ,
        midEQ: action.midEQ,
        trebleEQ: action.trebleEQ,
        volume: action.volume,
        bass: action.bass,
        mid: action.mid,
        treble: action.treble,
      };
    case roomActions.UPDATE_SOURCE:
      // console.log("Updating source in store...");
      return {
        ...state,
        source: action.source,
      };
    case roomActions.SET_MEDIA_STREAM:
      console.log("Updating mediaStream in store... " + action.mediaStream);
      return {
        ...state,
        mediaStream: action.mediaStream,
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

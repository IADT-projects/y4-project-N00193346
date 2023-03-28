import store from "../store/store";
import { setLocalStream, setRemoteStreams } from "../store/actions/roomActions";
import Peer from "simple-peer";
import * as socketConnection from "./socketConnection";

const getConfiguration = () => {
  const turnIceServers = null;

  if (turnIceServers) {
    // TODO use TURN server credentials
  } else {
    console.warn("Using only STUN server");
    return {
      iceServers: [
        {
          urls: "stun:stun.l.google.com:19302",
        },
      ],
    };
  }
};

const onlyAudioConstraints = {
  audio: true,
  video: false,
};

const defaultConstraints = {
  video: true,
  audio: true,
};

const guitarConstraints = {
  audio: {
    echoCancellation: false,
    autoGainControl: false,
    noiseSuppression: false,
    latency: 0,
  },
};

export const getLocalStreamPreview = (onlyAudio = false, callbackFunc) => {
  const constraints = onlyAudio ? onlyAudioConstraints : defaultConstraints;
  const guitar = store.getState().room.mediaStream;

  console.log("Guitar is: " + guitar);
  // const guitarStream =
  //   guitar.createMediaStreamDestination(guitarConstraints).stream;

  // console.log("Guitar Stream" + guitarStream);

  navigator.mediaDevices
    .getUserMedia(constraints)
    .then((stream) => {
      // stream.addTrack(guitarStream.getAudioTracks()[0]);
      store.dispatch(setLocalStream(stream));
      callbackFunc();
    })
    .catch((err) => {
      console.log(err);
      console.log("Cannot get an access to local stream");
    });
};

let peers = {};

// Create a new PeerConnection object
export const prepareNewPeerConnection = (connUserSocketId, isInitiator) => {
  // Get the local stream and guitar context from the Redux store
  const localStream = store.getState().room.localStream;
  const guitar = store.getState().room.guitarContext;

  // Create a new MediaStreamDestination from the guitar context and get its stream
  const guitarStream =
    guitar.createMediaStreamDestination(guitarConstraints).stream;

  // Log whether the current user is the initiator of the connection or not
  // if (isInitiator) {
  //   console.log("preparing new peer connection as initiator");
  // } else {
  //   console.log("preparing new peer connection as not initiator");
  // }

  // Create a new MediaStream object containing both the local stream and the guitar stream
  const combinedStream = new MediaStream([...localStream.getTracks()]);
  combinedStream.addTrack(guitarStream.getAudioTracks()[0]);

  console.log("combinedStream: ", combinedStream);
  console.log(
    "Combined Stream audio tracks:",
    combinedStream.getAudioTracks().length
  );

  // Create a new Peer object and add it to the peers object using the socket ID as the key
  peers[connUserSocketId] = new Peer({
    initiator: isInitiator,
    config: getConfiguration(),
    stream: combinedStream,
  });

  // When the Peer object emits a 'signal' event, send the signal data to the server
  peers[connUserSocketId].on("signal", (data) => {
    const signalData = {
      signal: data,
      connUserSocketId: connUserSocketId,
    };
    socketConnection.signalPeerData(signalData);
  });

  // When the Peer object emits a 'stream' event, add the new remote stream to the Redux store
  peers[connUserSocketId].on("stream", (remoteStream) => {
    console.log("remote stream came from other user");
    console.log("direct connection has been established");
    remoteStream.connUserSocketId = connUserSocketId;
    addNewRemoteStream(remoteStream);
  });
};

// Handle signaling data received from the server
export const handleSignalingData = (data) => {
  const { connUserSocketId, signal } = data;

  // If a Peer object exists for the specified socket ID, pass the signaling data to it
  if (peers[connUserSocketId]) {
    peers[connUserSocketId].signal(signal);
  }
};

// Add a new remote stream to the Redux store
const addNewRemoteStream = (remoteStream) => {
  const remoteStreams = store.getState().room.remoteStreams;
  const newRemoteStreams = [...remoteStreams, remoteStream];

  // Dispatch an action to update the remote streams in the Redux store
  store.dispatch(setRemoteStreams(newRemoteStreams));
};

// Close all PeerConnections and remove them from the peers object
export const closeAllConnections = () => {
  Object.entries(peers).forEach((mappedObject) => {
    const connUserSocketId = mappedObject[0];
    if (peers[connUserSocketId]) {
      peers[connUserSocketId].destroy();
      delete peers[connUserSocketId];
    }
  });
};

export const handleParticipantLeftRoom = (data) => {
  const { connUserSocketId } = data;

  if (peers[connUserSocketId]) {
    peers[connUserSocketId].destroy();
    delete peers[connUserSocketId];
  }

  const remoteStreams = store.getState().room.remoteStreams;

  const newRemoteStreams = remoteStreams.filter(
    (remoteStream) => remoteStream.connUserSocketId !== connUserSocketId
  );

  store.dispatch(setRemoteStreams(newRemoteStreams));
};

export const switchOutgoingTracks = (stream) => {
  for (let socket_id in peers) {
    for (let index in peers[socket_id].streams[0].getTracks()) {
      for (let index2 in stream.getTracks()) {
        if (
          peers[socket_id].streams[0].getTracks()[index].kind ===
          stream.getTracks()[index2].kind
        ) {
          peers[socket_id].replaceTrack(
            peers[socket_id].streams[0].getTracks()[index],
            stream.getTracks()[index2],
            peers[socket_id].streams[0]
          );
          break;
        }
      }
    }
  }
};

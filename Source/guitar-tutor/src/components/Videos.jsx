import styled from "styled-components";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/firestore";

import { useRef, useState } from "react";
import { ReactComponent as HangupIcon } from "./icons/hangup.svg";
import { ReactComponent as MoreIcon } from "./icons/more-vertical.svg";
import { ReactComponent as CopyIcon } from "./icons/copy.svg";

export const VideoContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2em;
`;

export const VideoStream = styled.video`
  background-color: black;

  height: 300px;
`;

function Videos({ mode, callId, setPage }) {
  const firestore = firebase.firestore();
  const servers = {
    iceServers: [
      {
        urls: [
          "stun:stun1.l.google.com:19302",
          "stun:stun2.l.google.com:19302",
        ],
      },
    ],
    iceCandidatePoolSize: 10,
  };
  const pc = new RTCPeerConnection(servers);

  // Webcam status
  const [webcamActive, setWebcamActive] = useState(false);
  //Current room ID
  const [roomId, setRoomId] = useState(callId);

  //Local Video
  const localRef = useRef();
  //Remote video
  const remoteRef = useRef();

  const setupSources = async () => {
    const audioDevices = await navigator.mediaDevices.enumerateDevices();
    const audioConstraints = {
      audio: {
        deviceId: audioDevices.filter(
          (device) => device.kind === "audioinput"
        )[0].deviceId,
      },
    };
    const localStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      ...audioConstraints,
    });
    const remoteStream = new MediaStream();

    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const localAudioSource1 = audioCtx.createMediaStreamSource(localStream);
    const localAudioSource2 = audioCtx.createMediaStreamSource(localStream);
    const merger = audioCtx.createChannelMerger(2);

    localAudioSource1.connect(merger);
    localAudioSource2.connect(merger, 0, 1);

    const mixedStream = merger.context.createMediaStreamDestination();
    merger.connect(mixedStream);

    const mixedTrack = mixedStream.stream.getAudioTracks()[0];
    pc.addTrack(mixedTrack, localStream);

    // Listen to the onTrack event on the peer connection, add tracks to the remote stream
    pc.ontrack = (event) => {
      event.streams[0].getTracks().forEach((track) => {
        remoteStream.addTrack(track);
      });
    };

    // Set the streams as source for local and remote refs
    localRef.current.srcObject = localStream;
    remoteRef.current.srcObject = remoteStream;

    setWebcamActive(true);

    // To create a Call (Offer Signaling)
    if (mode === "create") {
      //Creating a new document in Firestore calls collection to store information about the calls
      const callDoc = firestore.collection("calls").doc();
      //References for answer and offer ICE canidates
      const offerCandidates = callDoc.collection("offerCandidates");
      const answerCandidates = callDoc.collection("answerCandidates");

      //Set the room ID as the Id property of the call document
      setRoomId(callDoc.id);

      //When ICE canidate is generated add them
      pc.onicecandidate = (event) => {
        event.candidate && offerCandidates.add(event.candidate.toJSON());
      };

      //Await the create Offer method
      const offerDescription = await pc.createOffer();
      //Set as local description of peer connection
      await pc.setLocalDescription(offerDescription);

      //Create offer to be saved to firestore
      const offer = {
        sdp: offerDescription.sdp,
        type: offerDescription.type,
      };

      await callDoc.set({ offer });

      //Listen to changes to document to get answer SDP
      callDoc.onSnapshot((snapshot) => {
        const data = snapshot.data();
        if (!pc.currentRemoteDescription && data?.answer) {
          const answerDescription = new RTCSessionDescription(data.answer);
          //Set the data to the remote description
          pc.setRemoteDescription(answerDescription);
        }
      });

      //Listen for ICE canidates when answerCanidates changes
      answerCandidates.onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            const candidate = new RTCIceCandidate(change.doc.data());
            //Add the canidates to the peer connection
            pc.addIceCandidate(candidate);
          }
        });
      });
      //Answering the call
    } else if (mode === "join") {
      //Create reference using the call ID
      const callDoc = firestore.collection("calls").doc(callId);
      //ICE Canidates
      const answerCandidates = callDoc.collection("answerCandidates");
      const offerCandidates = callDoc.collection("offerCandidates");

      //Listen for the ICE canidates
      pc.onicecandidate = (event) => {
        event.candidate && answerCandidates.add(event.candidate.toJSON());
      };

      const callData = (await callDoc.get()).data();

      //Read offer description from document
      const offerDescription = callData.offer;
      //Set as the remote description
      await pc.setRemoteDescription(
        new RTCSessionDescription(offerDescription)
      );

      //Create local description
      const answerDescription = await pc.createAnswer();
      await pc.setLocalDescription(answerDescription);

      const answer = {
        type: answerDescription.type,
        sdp: answerDescription.sdp,
      };

      //Wrote the answer description to the database
      await callDoc.update({ answer });

      //Listen to changes to offer candidates collection
      offerCandidates.onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            //Add data to peer connection
            let data = change.doc.data();
            pc.addIceCandidate(new RTCIceCandidate(data));
          }
        });
      });
    }

    //Call hang up function when peer connection disconnects
    pc.onconnectionstatechange = (event) => {
      if (pc.connectionState === "disconnected") {
        hangUp();
      }
    };
  };

  //Hang up Function
  const hangUp = async () => {
    //Close the peer connection
    pc.close();

    //Delete subcollections
    if (roomId) {
      let roomRef = firestore.collection("calls").doc(roomId);
      await roomRef
        .collection("answerCandidates")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            doc.ref.delete();
          });
        });
      await roomRef
        .collection("offerCandidates")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            doc.ref.delete();
          });
        });

      //Delete document
      await roomRef.delete();
    }

    //Refresh page
    window.location.reload();
  };

  return (
    //Render Video
    <div className="videos">
      <VideoStream
        ref={localRef}
        autoPlay
        playsInline
        className="local"
        muted
      />
      <VideoStream ref={remoteRef} autoPlay playsInline className="remote" />

      <div className="buttonsContainer">
        <button
          onClick={hangUp}
          disabled={!webcamActive}
          className="hangup button"
        >
          <HangupIcon />
        </button>
        <div tabIndex={0} role="button" className="more button">
          <MoreIcon />
          <div className="popover">
            <button
              onClick={() => {
                navigator.clipboard.writeText(roomId);
              }}
            >
              <CopyIcon /> Copy joining code
            </button>
          </div>
        </div>
      </div>

      {!webcamActive && (
        <div className="modalContainer">
          <div className="modal">
            <h3>Turn on your camera and microphone and start the call</h3>
            <div className="container">
              <button onClick={() => setPage("home")} className="secondary">
                Cancel
              </button>
              <button onClick={setupSources}>Start</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Videos;

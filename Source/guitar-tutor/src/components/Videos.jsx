import styled from "styled-components";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/firestore";

import { useRef, useState, useEffect } from "react";
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

let guitarStream;

function startGuitarStream() {
  navigator.mediaDevices
    .getUserMedia({
      audio: {
        echoCancellation: false,
        autoGainControl: false,
        noiseSuppression: false,
        latency: 0,
      },
    })
    .then((stream) => {
      guitarStream = stream;
      // Use the guitarStream here
    })
    .catch((error) => {
      console.log("Error accessing microphone:", error);
    });
}

// Call startGuitarStream() when you want to start the guitar stream
startGuitarStream();

function Videos({ mode, callId, setPage }) {
  // const [volume, setVolume] = useState(1);

  // const context = new AudioContext();
  // const gainNode = new GainNode(context, { gain: volume });

  // useEffect(() => {
  //   gainNode.connect(context.destination);
  //   gainNode.addEventListener("gainchange", handleGainChange);
  //   return () => {
  //     gainNode.removeEventListener("gainchange", handleGainChange);
  //     gainNode.disconnect();
  //   };
  // }, [gainNode]);
  // const handleGainChange = () => {
  //   console.log("Gain changed: ", gainNode.gain.value);
  // };

  // // Getting the guitar input
  // const setupGuitar = () => {
  //   return navigator.mediaDevices.getUserMedia({
  //     audio: {
  //       echoCancellation: false,
  //       autoGainControl: false,
  //       noiseSuppression: false,
  //       latency: 0,
  //     },
  //   });
  // };

  // const setupContext = async () => {
  //   const guitar = await setupGuitar();
  //   if (context.state === "suspended") {
  //     await context.resume();
  //   }
  //   const source = context.createMediaStreamSource(guitar);
  //   source.connect(gainNode);
  // };

  // setupContext();

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

  //Function to set up video stream
  const setupSources = async () => {
    //Get user's camera and microphone
    const localStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });

    var ctx = new AudioContext();
    var source = ctx.createMediaStreamSource(guitarStream);
    var gainNode = ctx.createGain();
    gainNode.gain.value = 0.5;
    source.connect(gainNode);
    source.connect(ctx.destination);

    // create a new MediaStream object
    const newStream = new MediaStream();

    // add the guitarStream to the new MediaStream object
    guitarStream.getAudioTracks().forEach((track) => {
      newStream.addTrack(track);
    });

    // create a new audio track using the new MediaStream object
    const audioTrack = newStream.getTracks()[0];
    const audioSender = pc.addTrack(audioTrack, newStream);

    // set the audio track's sender to "inactive" so that it can't be heard by the recipient
    if (audioSender && audioSender.sender) {
      audioSender.sender.replaceTrack(null);
    } else {
      console.log("audioSender or audioSender.sender is undefined");
    }

    const remoteStream = new MediaStream();

    //Add the local tracks to the WebRTC peer connection
    localStream.getTracks().forEach((track) => {
      pc.addTrack(track, localStream);
    });

    //Listen to the onTrack event on the peer connection, add tracks to the remote stream
    pc.ontrack = (event) => {
      event.streams[0].getTracks().forEach((track) => {
        remoteStream.addTrack(track);
      });
    };

    //Set the streams as source for local and remote refs
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

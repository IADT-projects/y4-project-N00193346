import styled from "styled-components";
import RangeInput from "./RangeInput/RangeInput";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import store from "../../store/store";
import { setMediaStream } from "../../store/actions/roomActions";
import { setGuitarAudio, updateSource } from "../../store/actions/roomActions";

export const Container = styled.div`
  margin-top: 10px;
  display: grid;
  grid-template-columns: auto min-content;
  justify-content: center;
  justify-items: end;
  align-items: center;
  gap: 5px 10px;
  background-color: grey;
`;

function Amp(props) {
  const {
    guitarContext,
    source,

    bassEQ,
    midEQ,
    trebleEQ,
    volume,
    bass,
    mid,
    treble,
  } = props;
  const [mediaStream, setMediaStream] = useState(null);
  const [onButton, setOn] = useState(0);
  // const [volume, setVolume] = useState(0.5);
  // const [bass, setBass] = useState(0);
  // const [mid, setMid] = useState(0);
  // const [treble, setTreble] = useState(0);

  const gainNode = new GainNode(guitarContext, { gain: volume });
  // bassEQ = new BiquadFilterNode(guitarContext, {
  //   type: "lowshelf",
  //   frequency: 500,
  //   gain: bass,
  // });
  // midEQ = new BiquadFilterNode(guitarContext, {
  //   type: "peaking",
  //   Q: Math.SQRT1_2,
  //   frequency: 1500,
  //   gain: mid,
  // });
  // trebleEQ = new BiquadFilterNode(guitarContext, {
  //   type: "highshelf",
  //   frequency: 3000,
  //   gain: treble,
  // });

  useEffect(() => {
    gainNode.connect(guitarContext.destination);
    gainNode.addEventListener("gainchange", handleGainChange);
    return () => {
      gainNode.removeEventListener("gainchange", handleGainChange);
      gainNode.disconnect();
    };
  }, [gainNode]);

  // useEffect(() => {
  //   bassEQ.connect(guitarContext.destination);
  //   bassEQ.addEventListener("basschange", handleBassChange);
  //   return () => {
  //     bassEQ.removeEventListener("bassChange", handleBassChange);
  //     bassEQ.disconnect();
  //   };
  // }, [bassEQ]);

  // useEffect(() => {
  //   midEQ.connect(guitarContext.destination);
  //   midEQ.addEventListener("midchange", handleMidChange);
  //   return () => {
  //     midEQ.removeEventListener("midChange", handleMidChange);
  //     midEQ.disconnect();
  //   };
  // }, [midEQ]);

  const handleGainChange = () => {
    console.log("Gain changed: ", gainNode.gain.value);
  };

  // const handleBassChange = () => {
  //   console.log("Bass changed: ", bassEQ.gain.value);
  // };

  // const handleMidChange = () => {
  //   console.log("Mid changed: ", midEQ.gain.value);
  // };

  // const handleTrebleChange = () => {
  //   console.log("Treble changed: ", trebleEQ.gain.value);
  // };

  // Getting the guitar input
  const setupGuitar = () => {
    return navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: false,
        autoGainControl: false,
        noiseSuppression: false,
        latency: 0,
      },
    });
  };

  const setupContext = async (source) => {
    const guitar = await setupGuitar();
    if (guitarContext.state === "suspended") {
      await guitarContext.resume();
    }
    // const mediaStream = guitar;
    source = guitarContext.createMediaStreamSource(guitar);

    source.connect(gainNode);
    // source.connect(bassEQ);
    // source.connect(midEQ);
    // source.connect(trebleEQ);
    setMediaStream(guitar);
    let audioTracks = guitar.getAudioTracks();
    console.log("Audio tracks: " + audioTracks[0]);
    store.dispatch(setMediaStream(audioTracks[0]));
  };

  if (onButton === 1) {
    setupContext();
    // handleBassChange();
    // handleMidChange();
    // handleTrebleChange();
  }

  return (
    <>
      <button onClick={() => setOn(1)}>Turn On Amplifer</button>
      <Container>
        <RangeInput labelFor="Volume" inputId="volume" />
        <RangeInput labelFor="Bass" inputId="bass" />
        <RangeInput labelFor="Mid" inputId="mid" />
        <RangeInput
          labelFor="Treble"
          inputId="treble"
          // setParentValue={setTreble}
        />
      </Container>
    </>
  );
}

const mapStoreStateToProps = ({ room }) => {
  return {
    ...room,
  };
};

const mapActionsToProps = (dispatch) => {
  return {
    // ...setGuitarAudio(dispatch),
    ...setMediaStream(dispatch),
  };
};

export default connect(mapStoreStateToProps, mapActionsToProps)(Amp);

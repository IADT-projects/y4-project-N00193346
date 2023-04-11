import styled from "styled-components";
import store from "../../store/store";
import RangeInput from "./RangeInput/RangeInput";
import { useState, useEffect, useContext } from "react";
import { connect } from "react-redux";
import {
  setGuitarStream,
  setLocalStream,
} from "../../store/actions/roomActions";
import ChordDetect from "../Chord/ChordDetect";

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

function Amp() {
  const [onButton, setOn] = useState(false);
  const [onChord, setChord] = useState(false);
  const [volume, setVolume] = useState(0.5);
  // const [bass, setBass] = useState(0);
  // const [mid, setMid] = useState(0);
  // const [treble, setTreble] = useState(0);

  const context = new AudioContext();
  const gainNode = new GainNode(context, { gain: volume });
  // const bassEQ = new BiquadFilterNode(context, {
  //   type: "lowshelf",
  //   frequency: 500,
  //   gain: bass,
  // });
  // const midEQ = new BiquadFilterNode(context, {
  //   type: "peaking",
  //   Q: Math.SQRT1_2,
  //   frequency: 1500,
  //   gain: mid,
  // });
  // const trebleEQ = new BiquadFilterNode(context, {
  //   type: "highshelf",
  //   frequency: 3000,
  //   gain: treble,
  // });

  useEffect(() => {
    gainNode.connect(context.destination);
    gainNode.addEventListener("gainchange", handleGainChange);
    return () => {
      gainNode.removeEventListener("gainchange", handleGainChange);
      gainNode.disconnect();
    };
  }, [gainNode]);

  // useEffect(() => {
  //   bassEQ.connect(context.destination);
  //   bassEQ.addEventListener("basschange", handleBassChange);
  //   return () => {
  //     bassEQ.removeEventListener("bassChange", handleBassChange);
  //     bassEQ.disconnect();
  //   };
  // }, [bassEQ]);

  // useEffect(() => {
  //   midEQ.connect(context.destination);
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

  const setupContext = async () => {
    const guitar = await setupGuitar();
    if (context.state === "suspended") {
      await context.resume();
    }
    const source = context.createMediaStreamSource(guitar);
    source.connect(gainNode);
    // source.connect(bassEQ);
    // source.connect(midEQ);
    // source.connect(trebleEQ);
    let guitarAudio = source;
    console.log("Guitar Audio :" + guitarAudio);
    store.dispatch(setGuitarStream(guitarAudio));
    setChord(onButton);
  };

  if (onButton) {
    setupContext();
    // handleBassChange();
    // handleMidChange();
    // handleTrebleChange();
  }

  return (
    // <AmpContext.Provider value={guitarAudio}>
    <>
      <button onClick={() => setOn(!onButton)}>
        {onButton ? "Turn Off Amplifier" : "Turn On Amplifier"}
      </button>
      <Container>
        <RangeInput
          labelFor="Volume"
          inputId="volume"
          setParentValue={setVolume}
        />
        {/* <RangeInput labelFor="Bass" inputId="bass" setParentValue={setBass} />
        <RangeInput labelFor="Mid" inputId="mid" setParentValue={setMid} />
        <RangeInput
          labelFor="Treble"
          inputId="treble"
          setParentValue={setTreble}
        /> */}
        <ChordDetect onChord={onChord} />
      </Container>
    </>
    // </AmpContext.Provider>
  );
}

// const mapStoreStateToProps = ({ room }) => {
//   return {
//     ...room,
//   };
// };

const mapActionsToProps = (dispatch) => {
  return {
    ...setGuitarStream(dispatch),
  };
};

export default connect(null, mapActionsToProps)(Amp);

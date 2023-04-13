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
import ampTexture from "../../authPages/Images/ampTexture.PNG";
import AmplifierFont from "./Font/Amplify.ttf";

export const Container = styled.div`
  display: flex;
  height: 20vh;
  grid-template-columns: auto min-content;
  justify-content: center;

  gap: 5px 10px;
  background-color: #b2a89b;
  margin-top: -15px;
`;

export const AmpContainer = styled.div`
  height: 90%;
  width: 50%;
  border-radius: 10px;
  border: 20px solid #000000;
  box-sizing: border-box;
  background-image: url(${ampTexture});
  background-repeat: repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  @font-face {
    font-family: "Amplifier";
    src: url(${AmplifierFont}) format("truetype");
    font-weight: normal;
    font-style: normal;
  }
  font-family: "Amplifier";
  color: white;
  font-size: 56px;
`;

export const AmpControls = styled.div`
  height: 30%;
  width: 100%;
  background-color: #e6c375;
  border-top: 5px solid #000000;
  position: absolute;
  bottom: 0;
  left: 0;
  display: flex;

  align-items: center;
`;

export const SwitchContainer = styled.div`
  height: 80%;
  width: 30px;
  border-top: 1px solid #000000;
  background-color: black;
  margin: 10px;
`;

export const SwitchOff = styled.div`
  height: 60%;
  margin: 5px;
  background-color: red;
  border-bottom: 3px solid #8b0000;
`;

export const SwitchOn = styled.div`
  height: 60%;
  margin: 5px;
  background-color: red;
  border-top: 3px solid #8b0000;
`;

const Amp = () => {
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
    const userAccount = store.getState().auth.userDetails?.account;
    if (userAccount === "instructor") {
      setChord(onButton);
    }
  };

  if (onButton) {
    setupContext();

    // handleBassChange();
    // handleMidChange();
    // handleTrebleChange();
  }

  const handleClick = () => {
    setOn(!onButton);
  };

  return (
    // <AmpContext.Provider value={guitarAudio}>
    <>
      <Container>
        {/* <RangeInput labelFor="Bass" inputId="bass" setParentValue={setBass} />
        <RangeInput labelFor="Mid" inputId="mid" setParentValue={setMid} />
        <RangeInput
          labelFor="Treble"
          inputId="treble"
          setParentValue={setTreble}
        /> */}

        <AmpContainer>
          Intelligent Instruments
          <AmpControls>
            <SwitchContainer onClick={handleClick}>
              {onButton ? <SwitchOn /> : <SwitchOff />}
            </SwitchContainer>
            <RangeInput
              labelFor="VOLUME"
              inputId="volume"
              setParentValue={setVolume}
            />
            <ChordDetect onChord={onChord} />
          </AmpControls>
        </AmpContainer>
      </Container>
    </>
    // </AmpContext.Provider>
  );
};

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

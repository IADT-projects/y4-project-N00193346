import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import G from "./ChordImages/G.PNG";
import A from "./ChordImages/A.PNG";
import D from "./ChordImages/D.PNG";

import store from "../../store/store";

function ChordDisplay(props) {
  const { guitarChord } = props;
  const [chordImage, setChordImage] = useState(G);

  useEffect(() => {
    if (guitarChord === "G") {
      setChordImage(G);
    } else if (guitarChord === "Am") {
      setChordImage(A);
    } else if (guitarChord === "D") {
      setChordImage(D);
    }
  }, [guitarChord]);

  return (
    <div>
      <img src={chordImage} alt="Chord" />
    </div>
  );
}

const mapStoreStateToProps = ({ room }) => {
  return {
    ...room,
  };
};

export default connect(mapStoreStateToProps)(ChordDisplay);

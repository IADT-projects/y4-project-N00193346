import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import G from "./ChordImages/G.png";
import A from "./ChordImages/A.png";
import D from "./ChordImages/D.png";
import C from "./ChordImages/C.png";
import E from "./ChordImages/E.png";
import { GlobalStyles } from "@mui/material";

function ChordDisplay(props) {
  const { guitarChord } = props;
  const [chordImage, setChordImage] = useState(GlobalStyles);

  useEffect(() => {
    if (guitarChord === "G") {
      setChordImage(G);
    } else if (guitarChord === "A") {
      setChordImage(A);
    } else if (guitarChord === "D") {
      setChordImage(D);
    } else if (guitarChord === "C") {
      setChordImage(C);
    } else if (guitarChord === "E") {
      setChordImage(E);
    } else if (guitarChord === "Negative") {
      setChordImage(null);
    }
  }, [guitarChord]);

  return (
    <div>
      {chordImage && (
        <img
          src={chordImage}
          alt="Chord"
          style={{
            width: "100%",
            maxWidth: "20vw",
            height: "auto",
            marginRight: "50px",
            marginBottom: "50px",
          }}
        />
      )}
    </div>
  );
}

const mapStoreStateToProps = ({ room }) => {
  return {
    ...room,
  };
};

export default connect(mapStoreStateToProps)(ChordDisplay);

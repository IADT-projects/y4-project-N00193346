import React, { useState } from "react";
import ChordDetect from "./ChordDetect/ChordDetect";
import GuitarToSpec from "./GuitarToSpec/GuitarToSpec";

function Chord() {
  const [screenshots, setScreenshots] = useState([]);
  return (
    <div className="app">
      <GuitarToSpec setScreenshots={setScreenshots} screenshots={screenshots} />
      <ChordDetect screenshots={screenshots} />
    </div>
  );
}

export default Chord;

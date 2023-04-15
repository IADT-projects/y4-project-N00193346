import React from "react";

// Mixer component for controlling volume with a slider
const Mixer = ({ trackId, volume, onVolumeChange }) => {
  const handleChange = (event, newValue) => {
    onVolumeChange(trackId, newValue);
  };

  return (
    <input
      type="range"
      min={0}
      max={1}
      step={0.1}
      value={volume}
      onChange={handleChange}
    />
  );
};

export default Mixer;

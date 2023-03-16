import React from "react";
import { useState, useEffect } from "react";

function RangeInput({ labelFor, inputId, setParentValue }) {
  const [value, setValue] = useState(0.5);

  const handleOnChange = (event) => {
    setValue(event.target.value);
    setParentValue(event.target.value);
  };

  return (
    <>
      <label htmlFor={labelFor}>{labelFor}</label>
      <input
        type="range"
        min="0"
        max="1"
        step=".01"
        id={inputId}
        defaultValue={value}
        onChange={handleOnChange}
      />
    </>
  );
}

export default RangeInput;

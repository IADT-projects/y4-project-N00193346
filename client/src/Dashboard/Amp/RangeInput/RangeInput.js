import React, { useState, useEffect } from "react";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: initial;
  margin-left: 20px;
  width: 45px;
`;

export const RangeLabel = styled.label`
  font-size: 14px;
  font-weight: 700;
  color: black;
`;

export const KnobContainer = styled.div`
  position: relative;
  width: 30px;
  height: 30px;
  margin-top: 2px;
  background-color: #e6c375;
  border-radius: 50%;
  border: 3px solid #000000;
`;

export const KnobMarker = styled.div`
  width: 3px;
  height: 12px;
  background-color: black;
  position: absolute;
  top: 50%;
  left: 50%;
  transform-origin: bottom center;
  transform: translate(-50%, -100%) rotate(${(props) => props.deg}deg);
  cursor: pointer;
`;

const RangeInput = ({ labelFor, setParentValue, inputId }) => {
  const [value, setValue] = useState(0.5);
  const [deg, setDeg] = useState(0);
  const startDeg = 150;
  const endDeg = 210;

  useEffect(() => {
    const newDeg = 280 - value * 280 - 140;
    setDeg(newDeg);
  }, [value]);

  const handleChange = (newValue) => {
    setValue(newValue);
    setParentValue(1 - newValue);
  };

  const handleMouseDown = (event) => {
    const initialMouseX = event.clientX;
    const initialValue = value;

    const handleMouseMove = (event) => {
      const deltaX = event.clientX - initialMouseX;
      const containerWidth = event.target.offsetWidth;
      const valueDelta = (deltaX / containerWidth) * -2;
      const newValue = Math.max(Math.min(initialValue + valueDelta, 1), 0);

      handleChange(newValue);
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleContainerClick = (event) => {
    const containerWidth = event.target.offsetWidth;
    const clickX = event.clientX - event.target.getBoundingClientRect().left;
    const newValue = clickX / containerWidth;
    handleChange(newValue);
  };

  return (
    <Container id={inputId}>
      <RangeLabel>{labelFor}</RangeLabel>
      <KnobContainer
        onMouseDown={handleMouseDown}
        onClick={handleContainerClick}
      >
        <KnobMarker deg={deg} />
      </KnobContainer>
    </Container>
  );
};

export default RangeInput;

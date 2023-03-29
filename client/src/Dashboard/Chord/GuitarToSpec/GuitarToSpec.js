import React, { useState, useEffect } from "react";
import Spectrogram from "spectrogram";
import { connect } from "react-redux";
import store from "../../../store/store";

function GuitarToSpec({ screenshots, setScreenshots }) {
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (isRunning) {
      // When the component mounts, get the canvas element and create a Spectrogram instance.
      const canvas = document.getElementById("canvas");
      const spectro = Spectrogram(canvas, {
        audio: {
          enable: false,
        },
      });

      // Create an AudioContext instance.
      const audioContext = new AudioContext();

      // Take a screenshot of the canvas every 5 seconds and store it in the screenshots state array.
      const intervalId = setInterval(() => {
        const screenshot = canvas.toDataURL();
        setScreenshots((prevScreenshots) => [...prevScreenshots, screenshot]);
      }, 10000);

      // When the component unmounts, clear the screenshot interval.
      return () => {
        clearInterval(intervalId);
      };
    }
  }, [isRunning]);

  useEffect(() => {
    if (isRunning) {
      const canvas = document.getElementById("canvas");
      const spectro = Spectrogram(canvas, {
        audio: {
          enable: false,
        },
      });

      const audioContext = new AudioContext();
      const guitar = store.getState().room.guitarStream;

      console.log("Guitar in Spec: " + guitar);
      const guitarStream = guitar.mediaStream;

      if (guitarStream) {
        const input = audioContext.createMediaStreamSource(guitarStream);
        const analyser = audioContext.createAnalyser();

        analyser.smoothingTimeConstant = 0;
        analyser.fftSize = 2048;

        input.connect(analyser);

        spectro.connectSource(analyser, audioContext);
        spectro.start();

        const intervalId = setInterval(() => {
          const screenshot = canvas.toDataURL();
          setScreenshots((prevScreenshots) => [...prevScreenshots, screenshot]);
        }, 10000);

        return () => {
          clearInterval(intervalId);
          guitarStream.getTracks().forEach((track) => track.stop());
        };
      }
    }
  }, [isRunning]);

  // Get the last screenshot from the screenshots state array and set its data URL as the source of the image.
  const lastScreenshot =
    screenshots.length > 0 ? screenshots[screenshots.length - 1] : "";

  // Render the canvas and image elements, conditionally based on the value of the isRunning state variable.
  return (
    <div>
      <button onClick={() => setIsRunning(!isRunning)}>
        {isRunning ? "Turn Off" : "Turn On"}
      </button>
      {isRunning && (
        <>
          <canvas id="canvas"></canvas>
          <img src={lastScreenshot} alt="Last Screenshot" />
        </>
      )}
    </div>
  );
}

export default GuitarToSpec;

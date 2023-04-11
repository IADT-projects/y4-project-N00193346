import React, { useState, useEffect } from "react";
import Spectrogram from "spectrogram";
import store from "../../store/store";

import { receiveChord } from "../../realtimeCommunication/socketConnection";

function ChordDetect({ onChord }) {
  const [prediction, setPrediction] = useState("");

  useEffect(() => {
    if (onChord) {
      // When the component mounts, create a Spectrogram instance.
      const canvas = document.createElement("canvas"); // Create a hidden canvas element
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
          submit(screenshot); // Pass the screenshot to submit function
        }, 4000);

        return () => {
          clearInterval(intervalId);
          guitarStream.getTracks().forEach((track) => track.stop());
        };
      }
    }
  }, [onChord]);

  async function submit(screenshot) {
    const blob = await fetch(screenshot).then((r) => r.blob());
    const file = new File([blob], "screenshot.jpg", { type: "image/jpeg" });

    const url =
      "https://uksouth.api.cognitive.microsoft.com/customvision/v3.0/Prediction/4f4b4d2f-3fc9-4a40-99c4-85bb2b75ed96/classify/iterations/Iteration1/image";
    const predictionKey = "1290d1bca24f44378c609a41bab869cb";

    const headers = {
      "Prediction-Key": predictionKey,
      "Content-Type": "application/octet-stream",
    };

    console.log("Sending request", { url, headers, file });

    fetch(url, {
      method: "POST",
      headers: headers,
      body: file,
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("Received response", result);
        setPrediction(`Prediction: ${result.predictions[0].tagName}`);
        receiveChord(`${result.predictions[0].tagName}`);
      })
      .catch((error) => setPrediction("Error: " + error.message));
  }

  return (
    <div className="app">
      <div>{prediction}</div>
    </div>
  );
}

export default ChordDetect;

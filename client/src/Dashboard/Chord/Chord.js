import React, { useState, useEffect } from "react";
import Spectrogram from "spectrogram";
import store from "../../store/store";

function Chord() {
  const [screenshots, setScreenshots] = useState([]);
  const [prediction, setPrediction] = useState("");
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

      // Take a screenshot of the canvas every 5 seconds and store it in the screenshots state array.
      const intervalId = setInterval(() => {
        const screenshot = canvas.toDataURL();
        setScreenshots((prevScreenshots) => [...prevScreenshots, screenshot]);
      }, 5000);

      // When the component unmounts, clear the screenshot interval.
      return () => {
        clearInterval(intervalId);
      };
    }
  }, [isRunning]);

  useEffect(() => {
    // do something with the updated screenshot
    submit();
  }, [screenshots]);

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

  async function submit() {
    const lastScreenshot = screenshots[screenshots.length - 1];

    const blob = await fetch(lastScreenshot).then((r) => r.blob());
    const file = new File([blob], "screenshot.jpg", { type: "image/jpeg" });

    if (!file) {
      setPrediction("Please select an image file.");
      return;
    }

    const url =
      "https://uksouth.api.cognitive.microsoft.com/customvision/v3.0/Prediction/85aa730f-3c29-4753-8bef-86aa0f585a83/classify/iterations/Iteration1/image";
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
      })
      .catch((error) => setPrediction("Error: " + error.message));
  }

  return (
    <div className="app">
      <div>
        <button onClick={() => setIsRunning(!isRunning)}>
          {isRunning ? "Turn Off" : "Turn On"}
        </button>
        {isRunning && (
          <>
            <canvas
              id="canvas"
              style={{ width: "400px", height: "200px" }}
            ></canvas>
            <img src={lastScreenshot} alt="Last Screenshot" />
          </>
        )}
      </div>
      <div>{prediction}</div>
    </div>
  );
}

export default Chord;

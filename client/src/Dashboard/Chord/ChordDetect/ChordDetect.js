import React, { useState, useEffect } from "react";

function ChordDetect({ screenshots }) {
  const [prediction, setPrediction] = useState("");
  const [screenShotChanged, setScreenShotChanged] = useState("");

  useEffect(() => {
    // do something with the updated screenshot
    submit();
  }, [screenshots]);

  async function submit() {
    setScreenShotChanged(screenshots);

    const blob = await fetch(screenshots).then((r) => r.blob());
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
      headers: {
        "Prediction-Key": predictionKey,
        "Content-Type": "application/octet-stream",
      },
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
    <div>
      <div>{prediction}</div>
    </div>
  );
}

export default ChordDetect;

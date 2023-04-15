import React from "react";
import Button from "@mui/material/Button";
import store from "../../store/store";
import { setSecondCam } from "../../store/actions/roomActions";

const ExtraCamera = () => {
  const enumerateCameras = () => {
    navigator.mediaDevices
      .enumerateDevices()
      .then((devices) => {
        const cameraDevices = devices.filter(
          (device) => device.kind === "videoinput"
        );
        console.log("Available camera devices:", cameraDevices);

        const selectedCameraId = cameraDevices[0].deviceId;
        handleCameraSelection(selectedCameraId);
      })
      .catch((error) => {
        console.error("Error enumerating camera devices:", error);
      });
  };

  const handleCameraSelection = (cameraId) => {
    store.dispatch(setSecondCam(cameraId));
  };

  const handleButtonClick = () => {
    enumerateCameras();
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleButtonClick}>
        Second Camera Setup
      </Button>
    </div>
  );
};

export default ExtraCamera;

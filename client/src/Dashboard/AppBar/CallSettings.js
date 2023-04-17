import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";

import DialogContent from "@mui/material/DialogContent";

import Typography from "@mui/material/Typography";
import store from "../../store/store";
import { setNumCameras } from "../../store/actions/roomActions";

const CallSettings = ({ isDialogOpen, closeDialogHandler }) => {
  const [numberOfCameras, setNumberOfCameras] = useState(
    store.getState().room.numCameras
  );

  const handleCloseDialog = () => {
    closeDialogHandler();
  };

  const handleCameraChange = (event) => {
    setNumberOfCameras(Number(event.target.value));
    store.dispatch(setNumCameras(event.target.value));
  };

  return (
    <div>
      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>
          <Typography>Call Settings</Typography>
        </DialogTitle>
        <DialogContent>
          <div>
            <label>
              Number of Cameras:
              <input
                type="radio"
                value="1"
                checked={numberOfCameras === 1}
                onChange={handleCameraChange}
              />
              1
            </label>
            <label>
              <input
                type="radio"
                value="2"
                checked={numberOfCameras === 2}
                onChange={handleCameraChange}
              />
              2
            </label>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CallSettings;

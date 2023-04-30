import React, { useState } from "react";
import PrimaryButton from "../../Components/PrimaryButton";
import CallSettings from "./CallSettings";

const additionalStyles = {
  marginLeft: "5px",
  width: "10rem",
  height: "2rem",
  background: "#1A71FF",
};

const CallSettingsButton = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenAddFriendDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseAddFriendDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      <PrimaryButton
        additionalStyles={additionalStyles}
        label="Call Settings"
        onClick={handleOpenAddFriendDialog}
      />
      <CallSettings
        isDialogOpen={isDialogOpen}
        closeDialogHandler={handleCloseAddFriendDialog}
      />
    </>
  );
};

export default CallSettingsButton;

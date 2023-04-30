import React from "react";
import { Typography } from "@mui/material";

const RoomTitle = ({ title }) => {
  return (
    <Typography
      sx={{
        textTransform: "uppercase",
        color: "#FFFFFF",
        fontSize: "16px",
        marginTop: "10px",
      }}
    >
      {title}
    </Typography>
  );
};

export default RoomTitle;

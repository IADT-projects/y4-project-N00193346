import axios from "../../config";
import { useState, useEffect } from "react";

import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { Box } from "@mui/system";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

const LessonIndex = (props) => {
  //   const [artists, setArtists] = useState(null);

  //   useEffect(() => {
  //     axios
  //       .get("/artists")
  //       .then((response) => {
  //         console.log(response.data);
  //         setArtists(response.data);
  //       })
  //       .catch((err) => {
  //         console.error(err);
  //         console.log(err.message);
  //       });
  //   }, []);

  return (
    <>
      <Container maxWidth="lg">
        <Container maxWidth="lg" sx={{ display: "flex", flexWrap: "wrap" }}>
          {" "}
          LEsson Index
        </Container>

        {/* </Box> */}
      </Container>
    </>
  );
};

export default LessonIndex;

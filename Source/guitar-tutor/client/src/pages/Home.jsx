import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "../config";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import styled from "styled-components";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { CardActionArea } from "@mui/material";

const Home = () => {
  const [image, setImage] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const UNSPLASH_URL = `https://api.unsplash.com/search/photos/?client_id=Tk7261DCJ0ZfLHxqhDDbrs5ky5YHBaquoBFLax6MqBA&query=guitar`;
  let profileImage = () => {
    axios
      .get(`${UNSPLASH_URL}`, {})
      .then((response) => {
        setImage(response.data.results[0].urls.regular);
        setImage2(response.data.results[1].urls.regular);
        setImage3(response.data.results[4].urls.regular);
      })
      .catch((err) => {
        console.error(err);
        console.log(err.response.data.message);
      });
  };

  profileImage();
  return (
    <>
      <div>
        <CardMedia
          component="img"
          height="194"
          image={image}
          alt="guitar"
          sx={{ my: 1 }}
        />
        <Container
          maxWidth="100%"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "row",
          }}
        >
          <Card sx={{ minWidth: 345 }}>
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Have an account?
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardMedia
              component="img"
              height="140"
              width="100%"
              image={image2}
              alt="guitart"
            />
            <CardActions>
              <Button size="large" color="primary">
                Sign In
              </Button>
            </CardActions>
          </Card>
          <Card sx={{ minWidth: 345 }}>
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Create an account
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardMedia
              component="img"
              height="140"
              width="100%"
              image={image3}
              alt="guitart"
            />
            <CardActions>
              <Button size="large" color="primary">
                Register
              </Button>
            </CardActions>
          </Card>
        </Container>
      </div>
    </>
  );
};

export default Home;

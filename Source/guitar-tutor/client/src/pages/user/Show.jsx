import { useParams, useNavigate } from "react-router-dom";
import axios from "../../config";
import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";

import { Avatar } from "@mui/material";

import CardContent from "@mui/material/CardContent";

import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

const UserShow = () => {
  const { id } = useParams();

  const [user, setUser] = useState(null);

  let token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setUser(response.data);
      })
      .catch((err) => {
        console.error(err);
        console.log(err.response.data.message);
      });
  }, [token, id]);

  if (user === null) return "Loading...";

  return (
    <>
      <Box
        sx={{
          bgcolor: "background.paper",
          pt: 8,
          pb: 6,
        }}
      >
        <Container maxWidth="sm">
          <Container
            maxWidth="sm"
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Avatar
              alt={user.name}
              src="/static/images/avatar/1.jpg"
              sx={{ height: "90px", width: "90px" }}
            />
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Hello {user.name}
            </Typography>
          </Container>
          <Stack
            sx={{ pt: 4 }}
            direction="row"
            spacing={2}
            justifyContent="center"
          >
            <Button
              component={Link}
              to={`/users/${id}/edit`}
              variant="contained"
            >
              Edit Profile
            </Button>
            <Button variant="outlined">Delete Profile</Button>
          </Stack>
        </Container>
      </Box>
      <Card>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            <b>Name: </b>
            {user.name}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            <b>Email: </b>
            {user.email}
          </Typography>
        </CardContent>
      </Card>
      <Button component={Link} to={`/lessons/create`} variant="contained">
        Create a Lesson
      </Button>
    </>
  );
};

export default UserShow;

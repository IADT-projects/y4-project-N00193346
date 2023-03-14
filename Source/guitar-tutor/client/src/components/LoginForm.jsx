import { useState } from "react";
import axios from "../config";
import { Link, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import TextField from "@mui/material/Textfield";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";

const LoginForm = (props) => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const isRequired = (fields) => {
    let error = false;

    fields.forEach((field) => {
      if (!form[field]) {
        error = true;
        setErrors((prevState) => ({
          ...prevState,
          [field]: {
            message: `${field} is required!!!!`,
          },
        }));
      }
    });

    return error;
  };

  const handleForm = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitForm = () => {
    if (!isRequired(["email", "password"])) {
      console.log("Email: ", form.email);
      console.log("Password: ", form.password);

      axios
        .post("/users/login", {
          email: form.email,
          password: form.password,
        })
        .then((response) => {
          console.log(response.data);
          setErrors("");

          props.onAuthenticated(true, response.data.token);
          navigate("/");
        })
        .catch((err) => {
          console.error(err);
          console.log(err.response.data);

          setErrors(err.response.data.message);
        });
    }
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box component="form" onSubmit={submitForm} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              fullWidth
              label="Email"
              name="email"
              value={form.email}
              onChange={handleForm}
              error={errors.email}
              helperText={errors.email?.message}
              autoFocus
            />
            <TextField
              margin="normal"
              fullWidth
              name="password"
              label="Password"
              type="password"
              onChange={handleForm}
              value={form.password}
              error={errors.password}
              helperText={errors.password?.message}
            />
            <Button
              fullWidth
              variant="contained"
              onClick={submitForm}
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>

            <Link to={`/users/register`} variant="body2">
              Don't have an account? Sign Up
            </Link>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default LoginForm;

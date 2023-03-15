import { useState } from "react";
import axios from "../config";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import FormHelperText from "@mui/material/FormHelperText";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";

import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

const Register = (props) => {
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleForm = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

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

  const submitForm = () => {
    if (!isRequired(["name", "email", "password", "role"])) {
      //   let token = localStorage.getItem("token");

      axios
        .post("/users/register", form)
        .then((response) => {
          console.log(response.data);
          props.onAuthenticated(true, response.data.token, response.data._id);
          navigate(`/users/${response.data._id}`);
        })
        .catch((err) => {
          console.error(err);
          console.log(err.response.data.message);
          setErrors(err.response.data.errors);
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
            Register
          </Typography>
          <Box component="form" onSubmit={submitForm} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              onChange={handleForm}
              error={errors.name}
              helperText={errors.name?.message}
              value={form.name}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Email"
              name="email"
              onChange={handleForm}
              error={errors.email}
              helperText={errors.email?.message}
              value={form.email}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              onChange={handleForm}
              error={errors.password}
              helperText={errors.password?.message}
              value={form.password}
            />

            <FormControl margin="normal" fullWidth error={errors.role}>
              <InputLabel id="role">Role</InputLabel>
              <Select
                labelId="role"
                name="role"
                label="Role"
                onChange={handleForm}
                value={form.role}
              >
                <MenuItem value="student">Student</MenuItem>
                <MenuItem value="instructor">Instructor</MenuItem>
              </Select>
              <FormHelperText>{errors.role?.message}</FormHelperText>
            </FormControl>

            <Button
              fullWidth
              variant="contained"
              onClick={submitForm}
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Register;

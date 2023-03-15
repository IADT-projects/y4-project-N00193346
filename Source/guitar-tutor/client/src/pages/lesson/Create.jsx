import { useState, useEffect } from "react";
import axios from "../../config";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import FormHelperText from "@mui/material/FormHelperText";

const LessonCreate = () => {
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});

  const [instructors, setInstructors] = useState([]);
  const [students, setStudents] = useState([]);

  let token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`/users/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const users = response.data;
        const instructors = [];
        const students = [];

        users.map((user) => {
          if (user.role === "instructor") {
            instructors.push(user);
          } else if (user.role === "student") {
            students.push(user);
          }
        });

        setInstructors(instructors);
        setStudents(students);
      })
      .catch((err) => {
        console.error(err);
        console.log(err.message);
      });
  }, []);

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
    if (!isRequired(["instructor", "student", "time", "date"])) {
      let token = localStorage.getItem("token");

      axios
        .post("/lessons/", form, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          navigate("/lessons");
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
      <h2>Create a Lesson</h2>
      <div className="form-group">
        <FormControl variant="filled" fullWidth error={errors.instructor}>
          <InputLabel id="instructor">Instructor</InputLabel>
          <Select
            labelId="instructor"
            name="instructor"
            label="Instructor"
            onChange={handleForm}
            value={form.instructor}
          >
            {instructors.map((instructor) => (
              <MenuItem value={instructor.name}>{instructor.name}</MenuItem>
            ))}
          </Select>
          <FormHelperText>{errors.instructor?.message}</FormHelperText>
        </FormControl>
      </div>
      <div className="form-group">
        <FormControl variant="filled" fullWidth error={errors.instructor}>
          <InputLabel id="student">Student</InputLabel>
          <Select
            labelId="student"
            name="student"
            label="student"
            onChange={handleForm}
            value={form.student}
          >
            {students.map((student) => (
              <MenuItem value={student.name}>{student.name}</MenuItem>
            ))}
          </Select>
          <FormHelperText>{errors.student?.message}</FormHelperText>
        </FormControl>
      </div>
      <div className="form-group">
        <TextField
          variant="filled"
          label="Time"
          name="time"
          onChange={handleForm}
          error={errors.time}
          helperText={errors.time?.message}
          value={form.time}
        />
      </div>
      <div className="form-group">
        <TextField
          variant="filled"
          label="Date"
          name="date"
          onChange={handleForm}
          error={errors.date}
          helperText={errors.date?.message}
          value={form.date}
        />
      </div>

      <Button onClick={submitForm} variant="contained">
        Submit
      </Button>
    </>
  );
};

export default LessonCreate;

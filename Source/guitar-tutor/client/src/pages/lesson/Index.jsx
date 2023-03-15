import axios from "../../config";
import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { Box } from "@mui/system";

import CardContent from "@mui/material/CardContent";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";

const LessonIndex = (props) => {
  const [lessons, setLessons] = useState(null);

  useEffect(() => {
    axios
      .get("/lessons")
      .then((response) => {
        console.log(response.data);
        setLessons(response.data);
      })
      .catch((err) => {
        console.error(err);
        console.log(err.message);
      });
  }, []);

  if (!lessons)
    return (
      <Box
        sx={{
          height: "1000px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );

  return (
    <>
      <Container maxWidth="lg">
        <Container
          maxWidth="lg"
          sx={{ display: "flex", flexWrap: "wrap", marginTop: 2 }}
        >
          {lessons &&
            lessons.map((lesson) => (
              <Card key={lesson.id} sx={{ margin: 2 }}>
                <CardContent>
                  <Typography variant="h5" component="h2">
                    Lesson {lesson._id}
                  </Typography>
                  <Typography color="textSecondary">
                    {lesson.date} {lesson.time}
                  </Typography>
                  <Typography variant="body2" component="p">
                    Instructor: {lesson.instructor}
                    <br />
                    Student: {lesson.student}
                  </Typography>
                </CardContent>
              </Card>
            ))}
        </Container>
      </Container>
    </>
  );
};

export default LessonIndex;

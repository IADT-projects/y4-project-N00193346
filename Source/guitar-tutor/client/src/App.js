import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

//import components
import Navbar from "./components/Navbar";
import Container from "@mui/material/Container";

//import pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserShow from "./pages/user/Show";
import LessonIndex from "./pages/lesson/Index";
import LessonCreate from "./pages/lesson/Create";

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  let protectedTabs;

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setAuthenticated(true);
    }
  }, []);

  const onAuthenticated = (auth, token, _id) => {
    setAuthenticated(auth);

    if (auth) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      console.log("Token has expired");
    }

    // if (authenticated) {
    //   protectedTabs = (
    //     <>
    //       <Route path="/users/:id" element={<UserShow />} />
    //     </>
    //   );
    // }
  };
  return (
    <Router>
      <Container maxWidth="lg">
        <Navbar
          onAuthenticated={onAuthenticated}
          authenticated={authenticated}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={
              <Login
                onAuthenticated={onAuthenticated}
                authenticated={authenticated}
              />
            }
          />
          <Route
            path="/register"
            element={
              <Register
                onAuthenticated={onAuthenticated}
                authenticated={authenticated}
              />
            }
          />
          <Route path="/users/:id" element={<UserShow />} />
          <Route path="/lessons" element={<LessonIndex />} />
          <Route path="/lessons/create" element={<LessonCreate />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;

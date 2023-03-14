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

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  let protectedTabs;

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setAuthenticated(true);
    }
  }, []);

  const onAuthenticated = (auth, token) => {
    setAuthenticated(auth);

    if (auth) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
      console.log("Token has expired");
    }

    if (authenticated) {
      protectedTabs = (
        <>
          <Route path="/users/:id" element={<UserShow />} />
        </>
      );
    }
  };
  return (
    <Router>
      <Container maxWidth="lg">
        <Navbar />
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
          {protectedTabs}
        </Routes>
      </Container>
    </Router>
  );
}

export default App;

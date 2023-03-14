import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//import components
import Navbar from "./components/Navbar";
import Container from "@mui/material/Container";

//import pages
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <Container maxWidth="lg">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;

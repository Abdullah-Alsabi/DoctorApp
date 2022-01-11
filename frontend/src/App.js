import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Doctors from "./pages/Doctors";
import Appointments from "./pages/Appointments";
import Header from "./components/header/Header";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route path="/appointments/:id" element={<Appointments />}></Route>
          <Route path="/doctors" element={<Doctors />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

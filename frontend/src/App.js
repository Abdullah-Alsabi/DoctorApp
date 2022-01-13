import "./App.css";
import { BrowserRouter as Router, Routes, Navigate, Route } from "react-router-dom";
import Home from "./pages/Home";
import Doctors from "./pages/Doctors";
import Appointments from "./pages/Appointments";
import Header from "./components/header/Header";
import Login from "./pages/Login";
import Patients from "./pages/Patients";
import Patient from './pages/Patient'

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route path="/appointments/:id" element={<Appointments />}></Route>
          <Route path="/patient/:id" element={<Patient/>}></Route>
          <Route path="/doctors" element={<Doctors />}></Route>
          <Route path="/patients" element={<Patients />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="*" element={<Navigate to={'/'}/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

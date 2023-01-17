import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./Components/Navbar";
import { Home } from "./Components/Home";

import NoteState from "./Context/notes/NoteState";
import { Login } from "./Components/Login";
import { Signup } from "./Components/Signup";
import { Alert } from "./Components/Alert";
import { useState } from "react";
import { LandingPage } from "./Components/LandingPage";
function App() {
  const [alert, setAlert] = useState(null); 

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  }
  return (
    <>
      <NoteState>
        <Router>
          <Navbar showAlert={showAlert}/>
          <Alert alert={alert}/>

          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home showAlert={showAlert}/>}/>
              <Route exact path="/home" element={<LandingPage/>} />
              <Route exact path="/login" element={<Login showAlert={showAlert}/>} />
              <Route exact path="/signup" element={<Signup showAlert={showAlert}/>}/>
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;

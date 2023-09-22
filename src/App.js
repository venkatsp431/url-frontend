// import logo from './logo.svg';
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./Components/dashboard";
import Login from "./Components/login";
import Signup from "./Components/signup";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;

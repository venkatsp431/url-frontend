// import logo from './logo.svg';
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./Components/dashboard";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;

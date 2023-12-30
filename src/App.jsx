import Navbar from "./Navbar.jsx";
import Rodape from "./Rodape.jsx";

import "./App.css";

import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <div className="App">
      <Navbar />
      <div className="container">
        <Outlet />
      </div>
      <Rodape />
    </div>
  );
};

export default App;

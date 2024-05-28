import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { ContextProvider } from "./Context";
import Registration from "./components/registation/Registration";
import Login from "./components/Login/Login";
import Main from "./components/Main/Main";

import "./App.css";

function App() {
  return (
    <ContextProvider>
      <Router>
        <Routes>
          <Route path="/registration" element={<Registration />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/" element={<Main />}></Route>
        </Routes>
      </Router>
    </ContextProvider>
  );
}

export default App;

import { Route, Routes } from "react-router-dom";
import "./App.css";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import Welcome from "./component/Welcome";
import Logout from "./component/Logout";

function App() {
  // const storage = JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) ;
  // console.log("st", storage);
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Chat />} />
      <Route path="/w" element={<Welcome />} />
      <Route path="/logout" element={<Logout />} />
      
    </Routes>
  );
}

export default App;

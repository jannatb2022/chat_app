import { Route, Routes } from "react-router-dom";
import "./App.css";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Chat from "./pages/Chat";

function App() {
  const storage =JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) ;
  console.log("st", storage);
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Chat />} />
    </Routes>
  );
}

export default App;

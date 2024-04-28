import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Signin } from "./pages/Signin";
import { SignUp } from "./pages/Signup";
import { Dashboard } from "./pages/Dashboard";
import { SendMoney } from "./pages/SendMoney";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={"HOME"}></Route>
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/send" element={<SendMoney />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import "./App.css";
import {Routes, Route} from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/common/Navbar"
import OpenRoute from "./components/core/authentication/openRoute";
import Error from "./pages/Error";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/updatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import About from "./pages/About";

function App() {
  return (
    <div className=" w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<OpenRoute><Login /></OpenRoute>} />
        <Route path="/signup" element={<OpenRoute><Signup /></OpenRoute>} />
        <Route path="/error" element={<Error />} />
        <Route path="/forgot-password" element={<OpenRoute><ForgotPassword /></OpenRoute>} />
        <Route path="/update-password/:resetPasswordToken" element={<OpenRoute><UpdatePassword /></OpenRoute> } />
        <Route path="/verification-email" element={<VerifyEmail />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;

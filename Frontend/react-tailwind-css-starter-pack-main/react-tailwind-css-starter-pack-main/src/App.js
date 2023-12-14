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
import Dashboard from "./pages/Dashboard";
import MyProfile from "./components/core/dashboard/MyProfile";
import PrivateRoute from "./components/core/authentication/PrivateRoute";
import EnrolledCourses from "./components/core/dashboard/EnrolledCourses";
import Cart from "./components/core/dashboard/Cart/index"
import { useSelector } from "react-redux";
import AddCourse from "./components/core/dashboard/AddCourse";

function App() {
  const {user} = useSelector(state => state.profile);
  console.log(user);
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
        <Route path="/dashboard" element={<div className=" text-white">Not Found</div>} />
        <Route path="/dashboard" element={<PrivateRoute> <Dashboard /></PrivateRoute>} >
          <Route path="/dashboard/my-profile" index element={<MyProfile />}/>
          <Route path="/dashboard/settings" element={<div className=" text-white">Settings</div>}/>

          {
            user?.accountType === "Instructor" && (
              <>
                <Route path="/dashboard/instructor" element={<div className=" text-white">Instructor</div>}/>
                <Route path="/dashboard/my-courses" element={<div className=" text-white">My Courses</div>}/>
                <Route path="/dashboard/add-course" element={<AddCourse />}/>
              </>
            )
          }

          {
            user?.accountType === "Student" && (
              <>
                <Route path="/dashboard/enrolled-courses" element={<EnrolledCourses />}/>
                <Route path="/dashboard/purchase-history" element={<div className=" text-white">Purchase History</div>}/>
                <Route path="/dashboard/cart" element={<Cart />}/>
              </>
            )
          }
          
        </Route>
      </Routes>
    </div>
  );
}

export default App;
